# FounderAI — RAG Implementation Plan (Livello 3 di Sloan)

Obiettivo: dare a Sloan **memoria semantica sulla knowledge base** (Sez. 1–11). Quando un founder scrive, Sloan recupera i chunk più rilevanti dalla KB e li inietta nel system prompt come riferimento autorevole — invece di affidarsi solo a ciò che è "hardcoded" nel prompt. È il **Livello 3** dell'architettura di intelligenza di Sloan (statico → memoria contestuale utente → **conoscenza recuperata via RAG**).

---

## 1. Decisioni di architettura (e perché)

| Componente | Scelta | Perché |
|---|---|---|
| **Vector DB** | **Supabase pgvector** | Sei già su Supabase (auth + dati). Zero nuova infrastruttura, zero nuovo fornitore, costo marginale ~0 a questa scala. Postgres + `pgvector` regge ampiamente decine di migliaia di chunk con indice HNSW. |
| **Embedding** | **Voyage AI** (default `voyage-3-large`, 1024 dim) | Anthropic **non offre embedding nativi** e raccomanda Voyage come provider preferito → coerente con il tuo stack Claude. Voyage è ottimizzato per il retrieval ed è **multilingue** (importante: KB e query sono in italiano + inglese). Alternativa rodata: OpenAI `text-embedding-3-small` (1536 dim). |
| **Reranking** | opzionale, fase 2 | `voyage rerank` o Cohere rerank migliorano la precisione. Non necessario per l'MVP: parti con cosine top-k. |
| **Generazione** | Anthropic API (già in uso) | Nessun cambiamento. Iniettiamo i chunk recuperati nel system prompt di Sloan. |

> ⚠️ **La dimensione del vettore nel SQL DEVE combaciare col modello scelto.** `voyage-3-large` = **1024**; OpenAI `text-embedding-3-small` = **1536**. Se cambi modello, cambi `vector(N)` nella tabella e ri-ingerisci tutto. Il modello migliore disponibile potrebbe essere aggiornato (famiglia `voyage-4` lanciata a inizio 2026): controlla i modelli e le dimensioni correnti su Voyage e tieni `VOYAGE_DIM` allineato al SQL.

---

## 2. Pipeline (end-to-end)

```
  File KB (.md, Sez. 1–11)
        │  ingest_kb.ts  (una tantum / a ogni aggiornamento KB)
        ▼
  Chunking per blocco "##"  ──►  Embedding (Voyage, input_type="document")
        │
        ▼
  Supabase: tabella sloan_kb_chunks  (testo + vettore + metadati)
        ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
  Runtime (a ogni messaggio dell'utente):
        │  sloan-retrieval.ts
        ▼
  Embedding della query (Voyage, input_type="query")
        │
        ▼
  RPC match_sloan_kb  ──►  top-k chunk per similarità coseno
        │
        ▼
  Inietta i chunk nel system prompt di Sloan  ──►  Anthropic Messages API
```

---

## 3. Strategia di chunking (specifica per QUESTI file)

I file della KB sono stati scritti *apposta* per essere chunkati: ogni blocco numerato (`## 9.8 CAC Payback Period`, `## 8.1 La verità nascosta`, ecc.) è autonomo e auto-contenuto. La strategia:

1. **Split primario per header `##`** → un chunk per blocco numerato. È l'unità semantica naturale.
2. **Cattura il contesto gerarchico** come metadati su ogni chunk: `section` (es. "09"), `section_title` (es. "Metriche & Benchmark"), `block_id` (es. "9.8"), `block_title` (es. "CAC Payback Period"), e l'eventuale categoria/blocco `#` che precede (es. "BLOCCO C — Unit economics").
3. **Prefisso di contesto nel testo embeddato:** ogni chunk viene embeddato con un'intestazione tipo `[Sez. 9 · Metriche & Benchmark · 9.8 CAC Payback Period]\n<contenuto>`. Questo migliora il retrieval perché il vettore "sa" da dove viene il chunk.
4. **Sub-split dei blocchi lunghi:** se un blocco supera ~500 token, si spezza su confini di paragrafo (`\n\n`) con piccolo overlap, **senza** spezzare le tabelle a metà.
5. **Cosa si esclude:** il preambolo "Uso interno KB" in cima a ogni file (meta-istruzioni di servizio) viene saltato di default per non inquinare il retrieval. **Le "NOTE D'USO PER SLOAN"** (blocco `##` in fondo) vengono invece incluse: sono comportamento prezioso, recuperabile quando pertinente.

Risultato atteso: ~150–250 chunk totali sulle 11 sezioni, densi e mirati.

---

## 4. Strategia di retrieval

- **MVP:** embed query (`input_type="query"`) → `match_sloan_kb(query_embedding, match_count=6)` → cosine top-k → inietta i 6 chunk nel system prompt.
- **Stage-aware (fase 2, coerente con la natura di Sloan):** poiché Sloan è stage-aware, puoi **filtrare/boostare** per stage — es. recuperare sempre 2 chunk dalla Sez. 7 (playbook dello stage corrente del founder) + i top-k semantici dalle altre sezioni. Il parametro `filter_section` nell'RPC abilita il filtro per sezione.
- **Reranking (fase 2):** passa i top-20 a un reranker (Voyage/Cohere) e tieni i migliori 5 → meno rumore, risposte più pertinenti.
- **Iniezione:** i chunk vanno nel **system prompt**, in un blocco delimitato `<knowledge_base>...</knowledge_base>`, con l'istruzione esplicita che è materiale di riferimento autorevole (non output da copiare verbatim).

---

## 5. Setup — passi (da eseguire via Claude Code nel repo)

1. **Abilita pgvector e crea schema:** esegui `supabase_rag_setup.sql` (SQL Editor di Supabase, oppure `supabase db` via CLI). Verifica che `vector(1024)` combaci col modello scelto.
2. **Variabili d'ambiente** (`.env.local`):
   ```
   SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...        # serve scrittura per l'ingestion (server-side)
   VOYAGE_API_KEY=...                   # oppure OPENAI_API_KEY se usi OpenAI
   VOYAGE_MODEL=voyage-3-large          # tieni allineato a VOYAGE_DIM e al SQL
   VOYAGE_DIM=1024
   ANTHROPIC_API_KEY=...                # già presente
   ```
3. **Dipendenze:** `npm i @supabase/supabase-js` (+ `tsx` per lanciare lo script TS: `npm i -D tsx`).
4. **Ingestion:** metti i file `sloan_kb_section_*.md` in `./kb/` e lancia
   `npx tsx scripts/ingest_kb.ts ./kb`
   Lo script svuota e re-ingerisce per sezione (idempotente): puoi rilanciarlo a ogni aggiornamento della KB.
5. **Retrieval nella chat:** importa `retrieveSloanContext` da `lib/sloan-retrieval.ts` nella tua route di chat e inietta il risultato nel system prompt di Sloan (snippet in fondo a quel file).
6. **Verifica:** fai una domanda da founder (es. "il mio CAC payback è 20 mesi, è grave?") e controlla nei log che vengano recuperati i chunk attesi (9.8, 9.13, ecc.).

---

## 6. Costi (ordine di grandezza)

- **Ingestion (una tantum):** ~150–250 chunk × ~400 token = ~100K token. A prezzi embedding tipici (~$0,02–0,13 / 1M token a seconda del modello) → **frazioni di centesimo**. Trascurabile.
- **Runtime:** 1 embedding di query per messaggio (~poche centinaia di token) → costo embedding **trascurabile**. Il costo dominante resta la generazione Claude, invariata.
- **Storage:** pgvector su Supabase, qualche MB. Incluso nel piano esistente.

---

## 7. Roadmap di miglioramento (dopo l'MVP)

1. **Reranking** (Voyage/Cohere) per precisione.
2. **Retrieval stage-aware**: boost dei chunk della Sez. 7 sullo stage corrente del founder (dal profilo).
3. **Hybrid search**: combinare similarità vettoriale + full-text (`tsvector`) per query con termini esatti (nomi di framework, metriche).
4. **Valutazione**: un piccolo set di domande→chunk-attesi per misurare il recall quando cambi modello/parametri (evita regressioni quando passi a `voyage-4`).
5. **Citazioni interne**: loggare quali chunk hanno informato ogni risposta di Sloan (debug + fiducia).

> Nota: i numeri di mercato nella KB (marcati `[MERCATO 2025/26]`) vanno ri-verificati periodicamente e ri-ingeriti. Lo script di ingestion idempotente rende questo banale.
