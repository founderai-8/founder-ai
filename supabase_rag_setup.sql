-- ============================================================
-- FounderAI — Setup RAG su Supabase (pgvector)
-- Esegui nel SQL Editor di Supabase, oppure via Supabase CLI.
--
-- ⚠️ DIMENSIONE DEL VETTORE: deve combaciare col modello di embedding.
--    voyage-3-large           -> 1024   (default qui)
--    OpenAI text-embedding-3-small -> 1536
--    Se cambi modello: aggiorna vector(1024) E la firma della funzione,
--    poi ri-ingerisci tutta la KB.
-- ============================================================

-- 1) Estensione pgvector
create extension if not exists vector;

-- 2) Tabella dei chunk della knowledge base
create table if not exists sloan_kb_chunks (
  id             bigint generated always as identity primary key,
  section        text not null,                 -- es. "09"
  section_title  text,                          -- es. "Metriche & Benchmark"
  category       text,                           -- es. "BLOCCO C — Unit economics" (header # facoltativo)
  block_id       text,                           -- es. "9.8"
  block_title    text,                           -- es. "CAC Payback Period"
  content        text not null,                 -- testo del chunk (con prefisso di contesto)
  token_count    int,
  embedding      vector(1024) not null,         -- ⚠️ allinea alla dimensione del modello
  metadata       jsonb default '{}'::jsonb,
  created_at     timestamptz default now()
);

-- 3) Indice per ricerca di similarità (coseno). HNSW = buon default qualità/velocità.
--    (Richiede pgvector >= 0.5, supportato su Supabase.)
create index if not exists sloan_kb_chunks_embedding_idx
  on sloan_kb_chunks
  using hnsw (embedding vector_cosine_ops);

-- 4) Indice per filtro metadati per sezione (retrieval stage-aware, fase 2)
create index if not exists sloan_kb_chunks_section_idx
  on sloan_kb_chunks (section);

-- 5) Funzione RPC di match per similarità coseno.
--    Ritorna i top-k chunk; filter_section opzionale per limitare a una sezione.
create or replace function match_sloan_kb (
  query_embedding vector(1024),                 -- ⚠️ stessa dimensione della tabella
  match_count int default 6,
  filter_section text default null
)
returns table (
  id            bigint,
  section       text,
  section_title text,
  category      text,
  block_id      text,
  block_title   text,
  content       text,
  similarity    float
)
language sql stable
as $$
  select
    c.id,
    c.section,
    c.section_title,
    c.category,
    c.block_id,
    c.block_title,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity   -- <=> = distanza coseno
  from sloan_kb_chunks c
  where filter_section is null or c.section = filter_section
  order by c.embedding <=> query_embedding                -- più vicino = più simile
  limit match_count;
$$;

-- 6) (Opzionale) RLS: il retrieval avviene server-side con la service role key,
--    che bypassa RLS. Se vuoi esporre la lettura anche al client con anon key,
--    abilita RLS e una policy di sola lettura:
-- alter table sloan_kb_chunks enable row level security;
-- create policy "kb read" on sloan_kb_chunks for select using (true);
