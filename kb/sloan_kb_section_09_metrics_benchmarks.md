# SLOAN KNOWLEDGE BASE — SEZIONE 9
# Metriche & Benchmark — Cosa Significa "Buono" (per stage e per modello)

> **Uso interno KB — LIVELLO QUANTITATIVO.** Le Sez. 1–8 dicono a Sloan *cosa* pensare e *cosa* chiedere; questa gli dà i **numeri** per riconoscere *quando* qualcosa è fuori posto. È il termometro che attiva l'intervento proattivo: quando una metrica esce dalla banda sana, Sloan riconosce il pattern (Sez. 5) e fa la domanda giusta (Sez. 8) — non recita la tabella.
>
> **Struttura.** Ogni metrica ha bande interpretative **🔴 critico / 🟡 accettabile / 🟢 buono / 🔵 world-class**. Ogni blocco è chunkabile e richiamabile singolarmente. I benchmark per modello (Blocco F) e di fundraising (Blocco G) sono raccolti in tabelle.
>
> **⚠️ NOTA SULLE FONTI — VINCOLANTE PER SLOAN.** Due tipi di numeri qui dentro:
> 1. **Soglie concettuali stabili** (Rule of 40, magic number, banda PMF 40%, interpretazione del burn multiple, ecc.): valide negli anni, Sloan può citarle con sicurezza.
> 2. **Dati di mercato datati 2025/2026** (dimensioni dei round, valutazioni, mediane di crescita/NRR, churn per categoria): **sensibili al tempo**. Sono marcati `[MERCATO 2025/26]`. Sloan li presenta come fotografia di quel momento, non come legge eterna, e Lumina/il team devono **ri-verificarli** prima di trattarli come precisi in produzione. Fonti principali dei dati di mercato: report SaaS 2025/26 (Benchmarkit, Maxio, High Alpha, Growth Unhinged), State of European Tech, Carta/PitchBook (round e valutazioni), a16z e Reach Capital (marketplace).

---

## 9.0 PRINCIPIO ZERO — Il benchmark è un termometro, non un obiettivo

Tre regole che governano *tutta* questa sezione e che Sloan non deve mai dimenticare:

1. **Il contesto viene prima del numero.** Lo stesso valore è ottimo o pessimo a seconda di modello, ACV, geografia e stage. Un CAC payback di 18 mesi è disastroso per un tool self-serve da €49/mese e perfettamente normale per un contratto enterprise da €100K/anno. Sloan non confronta mai una metrica senza prima inquadrare il contesto del founder.
2. **Il trend del founder batte la mediana di settore.** Una retention al 30% che migliora coorte dopo coorte è più sana di una al 40% in calo. La direzione del movimento è più predittiva del valore assoluto. Sloan guarda la curva, non solo il punto.
3. **Ottimizzare *al* benchmark è una trappola.** I benchmark diagnosticano, non sono target da inseguire. Un founder che "deve arrivare al 40% di Rule of 40" tagliando crescita sana sta servendo la metrica invece del business. Il numero è un sintomo da capire, non un voto da massimizzare. `→ collegamento a vanity metrics, Sez. 5 (pattern 8)`

---

## 9.1 LA MAPPA — Quali metriche contano per quale modello

Prima di ogni benchmark, Sloan identifica il modello, perché ogni modello ha una metrica-regina diversa. Far guardare al founder la metrica sbagliata per il suo modello è già un errore.

| Modello | Metrica-regina (la prima da guardare) | Trappola tipica |
|---|---|---|
| **SaaS B2B (sales-led)** | NRR + CAC payback (i due predittori più forti) | Inseguire nuovi loghi ignorando l'espansione |
| **SaaS PLG / self-serve** | Activation → conversione free→paid, poi NRR | Confondere iscritti con utenti attivati |
| **Marketplace** | Liquidità (match rate) + GMV retention | Misurare GMV totale (vanity) senza retention |
| **Consumer subscription** | Churn mensile + retention a 12 mesi | Spingere acquisizione su un secchio bucato |
| **Transactional / e-commerce** | Margine di contribuzione + frequenza di riacquisto | LTV gonfiato su una sola transazione |
| **Hardware / deep tech** | Cassa per milestone tecnica + payback unità | Trattare il rischio tecnico come rischio di mercato |

> **Meta-istruzione Sloan:** se non sai quale modello è, **chiedi** prima di citare qualunque benchmark. Una metrica nel modello sbagliato è rumore travestito da diagnosi.

---

# BLOCCO A — CRESCITA

## 9.2 Tasso di crescita (ARR/MRR year-over-year)
La crescita va sempre letta in funzione dello **stage e della base**: crescere del 200% su €100K è facile, su €10M è eccezionale.

- **Bande indicative `[MERCATO 2025/26]`** (SaaS B2B, base $5–20M ARR): la mediana di settore si è assestata intorno al **~26%**, i top performer sono scesi dal ~60% al **~50%**. Il mercato ha smesso di premiare la "crescita a ogni costo" e valuta la crescita *efficiente* (vedi Rule of 40, 9.13).
  - 🔴 Sotto la mediana e in decelerazione senza spiegazione · 🟡 In linea con la mediana · 🟢 Top quartile · 🔵 Top decile mantenendo efficienza (NRR alta + CAC payback corto).
- **Per le fasi early (sotto $1M ARR)** la crescita mese-su-mese conta più dell'annuale: un **5–7% MoM** è solido, **>10% MoM** è eccellente (≈ il ritmo "buono" di YC). `→ Sez. 7.2`
- **Cosa attiva Sloan:** crescita che rallenta *mentre* il CAC sale → il motore di acquisizione si sta inceppando; girare lo sguardo su retention ed espansione prima di spingere altro budget.

## 9.3 T2D3 — il sentiero classico dell'iper-crescita
**Triple, Triple, Double, Double, Double**: triplicare l'ARR per due anni, poi raddoppiarlo per tre. È il percorso archetipico da ~$1M a ~$100M ARR.
- **Uso per Sloan:** è un *riferimento di ambizione*, non uno standard minimo. `[MERCATO 2025/26]` oggi è un sentiero raro e quasi esclusivo del top decile; presentarlo a un first-time founder come "lo standard" genera solo senso di inadeguatezza (Sez. 6.C). Utile come orizzonte, dannoso come metro di giudizio quotidiano.

---

# BLOCCO B — RETENTION & CHURN
*(il blocco più importante: senza retention, ogni altra metrica è una bugia che scala)*

## 9.4 Churn (tasso di abbandono)
Distinguere sempre **logo churn** (clienti che se ne vanno) da **revenue churn** (ricavi persi). In modelli con grandi clienti, perdere un logo grosso pesa più di dieci piccoli.

- **Churn mensile — bande generali:**
  - 🔵 **<1%/mese** (≈ <12%/anno): world-class. A 1%/mese trattieni ~90% della base dopo 12 mesi.
  - 🟢 **1–2%/mese**: sano per la maggior parte dei SaaS B2B.
  - 🟡 **2–4%/mese**: tollerabile early, da sistemare prima di scalare l'acquisizione.
  - 🔴 **>5%/mese**: secchio bucato. A 8%/mese trattieni **meno del 40%** della base dopo 12 mesi — l'acquisizione non colmerà mai la perdita. `[dato dimostrativo, stabile]`
- **B2B vs SMB:** il churn cresce scendendo di segmento. Enterprise <1%/mese è normale; SMB/self-serve 3–5%/mese può essere fisiologico (e va compensato da espansione o volume).
- **Churn involontario** (carte scadute, pagamenti falliti): `[MERCATO 2025/26]` rappresenta tipicamente il **18–32%** delle cancellazioni. È churn recuperabile con dunning/retry — spesso il primo "quick win" di retention che Sloan può suggerire.
- **Cosa attiva Sloan:** churn alto *concentrato nei primi 30–60 giorni* → problema di **onboarding/activation**, non di prodotto in sé. `→ Sez. 3.6`

## 9.5 NRR / NDR — Net Revenue (Dollar) Retention
**La metrica più predittiva del successo di lungo periodo** insieme al CAC payback. Misura quanto cresce (o cala) il ricavo di una coorte esistente in 12 mesi, includendo upgrade, downgrade e churn. NRR >100% = il business cresce *anche senza un solo cliente nuovo*.
- **Bande `[MERCATO 2025/26]`** (SaaS B2B): la mediana si è **compressa intorno al 101%**; i top performer mantengono **111%+**.
  - 🔴 **<95%**: stai perdendo ricavo netto sulla base esistente — segnale di scarso fit o churn alto.
  - 🟡 **~100%**: stabile, ma la crescita dipende tutta da clienti nuovi.
  - 🟢 **105–115%**: l'espansione è un motore reale.
  - 🔵 **>120%**: eccezionale; il prodotto cresce dentro il cliente (il regime delle migliori infra/usage-based).
- **Segnale di scala:** oltre i ~$20M ARR l'**espansione diventa il motore di crescita dominante**; `[MERCATO 2025/26]` i clienti esistenti generano già ~40% del nuovo ARR (oltre il 50% sopra $50M). `→ 9.20 per l'equivalente marketplace (GMV retention)`

## 9.6 GRR — Gross Revenue Retention
Come la NRR ma **senza espansione** (solo churn + contrazione). Misura la "tenuta" pura. Tetto teorico 100%.
- 🟢 **>90%** B2B sano · 🟡 80–90% · 🔴 <80% (il prodotto perde acqua a prescindere dagli upsell).
- **Uso diagnostico:** NRR alta ma GRR bassa = stai mascherando un churn serio con upsell aggressivi su pochi clienti. Sloan guarda *entrambe*: la NRR può abbagliare, la GRR dice la verità sulla salute di base.

## 9.7 Curva di retention (lo "smile" / flattening)
Non un singolo numero ma la **forma della curva** di una coorte nel tempo.
- 🔵 Curva che **si appiattisce** su un plateau (o risale, "smiling retention") = PMF reale, un nucleo di utenti che resta. Forse il segnale più onesto di PMF dopo il test dei "molto delusi" (Sez. 8.13).
- 🔴 Curva che **tende a zero** = nessun fit, per quanti iscritti entrino dalla cima.
- **Confronto coorte-su-coorte:** coorti più recenti che si appiattiscono più in alto delle vecchie = il prodotto sta migliorando. È il modo di Sloan per validare che le iterazioni funzionano. `→ Sez. 3.6, 4.4`

---

# BLOCCO C — UNIT ECONOMICS

## 9.8 CAC Payback Period
**Il co-re, insieme alla NRR, dei due predittori più forti di crescita profittevole.** In quanti mesi recuperi il costo di acquisire un cliente (idealmente calcolato sul **margine lordo**, non sul ricavo, per riflettere il vero cash-on-cash).
- **Varia enormemente con l'ACV** — questo è il punto che Sloan deve far capire prima di giudicare. `[MERCATO 2025/26]`: ACV ≤ ~$5K → mediana **~9 mesi**; ACV ≥ ~$100K → mediana **~24 mesi**. Entrambi possono essere sani nel proprio segmento.
- **Bande generali:**
  - 🔵 **<6 mesi**: capitale-efficiente; spesso *segnale di under-spending* — potresti accelerare investendo di più.
  - 🟢 **6–12 mesi**: sano per la maggior parte dei SaaS.
  - 🟡 **12–18 mesi**: accettabile per ACV alti/enterprise.
  - 🔴 **>18–24 mesi** (fuori dal contesto enterprise): il prodotto o il go-to-market non recuperano l'investimento in tempo utile.
- **Trappola di calcolo (Sloan la segnala sempre):** moltissimi sottostimano il CAC escludendo il tempo del founder o i costi di customer success. Un payback "sano" basato su costi incompleti è una decisione su dati falsi.

## 9.9 LTV:CAC
Il classico target è **3:1** (sotto 1:1 perdi su ogni cliente; sopra ~5:1 forse stai *sotto*-investendo in crescita).
- **⚠️ Caveat forte per Sloan `[stabile / consenso analisti]`:** l'LTV predittivo è **notoriamente inaffidabile** per startup early, perché l'LTV calcolato come "margine mensile / churn" assume churn costante e un futuro che non conosci. Diversi analisti di riferimento (incluso il dataset su ~5.000 software company) sostengono apertamente: *guarda NRR + CAC payback prima di LTV:CAC*. Sloan tratta l'LTV:CAC come **indicatore secondario**, utile a coorti mature con dati storici reali, non come north star early.

## 9.10 Margine lordo
Determina quanta della tua crescita è "vera" cassa.
- **SaaS puro:** 🟢 >70% · 🔵 >80%. Sotto il 60% non ti comporti da SaaS (probabile peso di servizi o infra).
- **Marketplace:** il margine va letto **sul take rate**, non sul GMV (vedi 9.20).
- **Hardware/e-commerce:** margini strutturalmente più bassi; qui conta il **margine di contribuzione** dopo costi variabili.
- **Diagnosi:** un margine lordo che scende mentre cresci = stai vendendo servizi mascherati da software, o l'infrastruttura non scala. Sloan lo segnala perché erode silenziosamente ogni altra metrica.

---

# BLOCCO D — EFFICIENZA DEL CAPITALE

## 9.11 Burn Multiple
**Net burn / Net new ARR.** Quanti euro bruci per ogni euro di nuovo ARR. La metrica più onesta di efficienza in un mondo post-"crescita a ogni costo".
- 🔵 **<1**: eccezionale · 🟢 **1–1,5**: ottimo · 🟡 **1,5–2**: buono · 🟠 **2–3**: sospetto · 🔴 **>3**: stai bruciando capitale senza costruire valore proporzionale. `[scala stabile, framework Sacks/Bessemer]`
- **Uso per Sloan:** è l'antidoto quantitativo all'overfunding (Sez. 5.A.1, 8.28). Un burn multiple alto con tanta cassa in banca è la ricetta classica del fallimento per inefficienza mascherata da "abbiamo runway".

## 9.12 Magic Number
**Crescita ARR del trimestre / spesa S&M del trimestre precedente.** Misura il ritorno del go-to-market.
- 🔴 **<0,5**: il GTM non funziona, non scalare la spesa · 🟡 **0,5–0,75** · 🟢 **>0,75**: efficiente, puoi investire di più · 🔵 **>1**: ogni euro in vendite ne rende più di uno in ARR. `[stabile]`

## 9.13 Rule of 40
**Tasso di crescita % + margine di profitto % ≥ 40.** Il bilanciamento sintetico crescita/redditività. `[MERCATO 2025/26]`: è diventato *il* metro di valutazione premium del mercato, che ora valuta la crescita sostenibile più dell'iper-crescita.
- 🟢 **≥40** sano · 🔵 **>50–60** eccellente · 🔴 **<40** uno dei due lati va sistemato.
- **Insight chiave dai dati `[MERCATO 2025/26]`:** chi unisce **NRR alta + CAC payback corto** quasi raddoppia crescita *e* Rule of 40 rispetto ai pari con retention debole o payback lungo. Anche piccoli aumenti di NRR compensano un CAC più alto — ma **l'inverso quasi mai**. → traduzione operativa per Sloan: *prima sigilla la retention, poi spingi l'acquisizione* (Sez. 8.23).

## 9.14 Runway & "Default Alive"
Non un benchmark di settore ma la matematica esistenziale (Sez. 1.1, 8.27).
- **Runway sano da tenere:** 🟢 **18+ mesi** post-raccolta · 🟡 12–18 · 🔴 **<6 mesi** = zona di panico, le decisioni peggiorano.
- **Default alive:** dati burn e crescita attuali, raggiungi il break-even prima di finire la cassa? Sloan fa calcolare questo **prima** di qualsiasi discorso di crescita: cambia ogni priorità.

---

# BLOCCO E — ENGAGEMENT & FUNNEL

## 9.15 Stickiness DAU/MAU
Quota di utenti mensili attivi anche giornalmente. Rilevante per prodotti a uso frequente (social, produttività, consumer).
- 🟡 **~10–20%** · 🟢 **>20%** buona abitudine · 🔵 **>50%** eccezionale (regime dei grandi social). Per prodotti a uso *intrinsecamente* poco frequente (es. fisco, viaggi) il DAU/MAU è la metrica sbagliata — Sloan non la impone.

## 9.16 Activation Rate
Quota di nuovi utenti che raggiungono il **momento "aha"** (la prima esperienza di valore reale). Il singolo punto del funnel con più leva early, e spesso il più trascurato.
- Non c'è una banda universale (dipende dalla definizione di "attivato"), ma il principio è: 🔴 attivazione bassa rende inutile ogni euro di acquisizione. Sloan spinge a **definire e misurare l'evento di attivazione** prima di ottimizzare qualsiasi cosa a monte. `→ Sez. 3.6 (AARRR)`

## 9.17 Conversione del funnel
Bande grezze, da calibrare per settore `[stabile, ordini di grandezza]`:
- **Visitatore → signup:** 2–5% tipico per landing decenti.
- **Freemium → paid:** 🟡 2–5% è la norma; **>5%** è forte. (Aspettarsi il 20% da un freemium è un errore di modello.)
- **Free trial → paid:** **15–25%** sano; con carta richiesta a monte sale molto.
- **Diagnosi:** conversione free→paid bassissima con tanti iscritti = il free dà *troppo* valore o il paywall è sul beneficio sbagliato. Problema di packaging/pricing (Sez. 3.7), non di traffico.

## 9.18 Quick Ratio (SaaS)
**(MRR nuovo + espansione) / (MRR churned + contrazione).** Quanto cresci rispetto a quanto perdi.
- 🟢 **>4** sano per startup early (cresci 4€ per ogni 1€ perso) · 🔴 **<1** = stai contraendo. `[stabile]`

---

# BLOCCO F — BENCHMARK PER MODELLO (vertical)

## 9.19 SaaS B2B — quadro sintetico `[MERCATO 2025/26]`
| Metrica | 🔴 Critico | 🟢 Buono | 🔵 World-class |
|---|---|---|---|
| Crescita ARR (base $5–20M) | < mediana, in calo | top quartile | top decile + efficiente |
| NRR | <95% | 105–115% | >120% |
| GRR | <80% | >90% | >95% |
| CAC payback (ACV medio) | >18 mesi | 6–12 mesi | <6 mesi |
| Margine lordo | <60% | >70% | >80% |
| Burn multiple | >3 | 1–1,5 | <1 |
| Rule of 40 | <40 | ≥40 | >55 |
> I due numeri che predicono tutto il resto: **NRR + CAC payback**. Se Sloan può guardarne solo due, guarda questi.

## 9.20 Marketplace
La logica è diversa: la salute sta nella **liquidità** e nella **GMV retention**, non nel GMV assoluto (che è la vanity metric classica del settore).
- **Liquidità / Match rate** (quota di domande o annunci che si chiudono in transazione): 🔵 **>70%** è la soglia di salute di un marketplace a due lati. Sotto, i compratori non trovano o i venditori non vendono → churn immediato. `[soglia di riferimento settore]`
- **GMV retention** (analoga alla NRR): la metrica più predittiva tra "marketplace ok" e "marketplace eccezionale". Due marketplace con lo stesso 25% di seller che tornano possono divergere a ~2x di scala in un anno se uno *espande* il GMV per seller e l'altro no (caso a16z). Sloan la usa come l'NRR del mondo marketplace.
- **Retention mensile (utenti)** `[riferimento settore]`: 🟡 **~20%** media · 🟢 **35–40%** buona · 🔵 **50%+** best-in-class.
- **Take rate:** (commissioni + fee / GMV). Non c'è un "giusto" universale — varia per verticale e valore aggiunto. Il test è: il take rate genera un **margine di contribuzione ben sopra** i costi diretti (acquisizione + supporto)? Se no, la crescita brucia solo cassa più in fretta.
- **Trappola CAC marketplace:** acquisire il lato dell'offerta (seller) costa spesso ~5x il lato della domanda → serve una **retention dei seller** che giustifichi il gap. Sloan lo segnala quando un founder marketplace parla solo di acquisizione buyer.

## 9.21 Consumer Subscription
La retention domina tutto; piccole differenze di churn mensile esplodono nel tempo.
- **Churn mensile per categoria `[MERCATO 2025/26]`** (su dataset multi-settore): meal kit i più alti (**~12,7%**), fitness migliorato a **~7,2%** (grazie ai modelli ibridi), B2B SaaS e servizi professionali i più tenaci (**<4%**). Forte stagionalità (e-learning estate, meal kit Q1/Q4).
- **Regola dimostrativa `[stabile]`:** 1%/mese → ~90% a 12 mesi; 8%/mese → <40% a 12 mesi; nel lungo periodo l'1% accumula 3x+ la base dell'8%.
- **Conversione free→paid:** vedi 9.17 (freemium 2–5%; trial 15–25%).
- **Uso per Sloan:** per un consumer sub, prima di parlare di acquisizione, **misura churn e curva di retention a 12 mesi**. Spingere il rubinetto su un secchio bucato è l'errore-base del settore (Sez. 5.A.7, 8.23).

## 9.22 Transactional / E-commerce / Hardware (note brevi)
- **Transactional/e-commerce:** la metrica vera è il **margine di contribuzione per ordine** e la **frequenza di riacquisto**; diffidare dell'LTV costruito su una singola transazione. La retention si misura come quota di clienti che riordinano entro N mesi.
- **Hardware / deep tech:** il rischio dominante è **tecnico e di cassa per milestone**, non di mercato early. I benchmark SaaS non si applicano; conta che ogni round finanzi una milestone tecnica de-rischiante e che, a regime, il payback per unità venduta regga.

---

# BLOCCO G — BENCHMARK DI FUNDRAISING (per stage, con realtà europea)

> ⚠️ Tutto questo blocco è `[MERCATO 2025/26]` e fortemente sensibile al tempo/geografia. Sloan lo usa per dare un *ordine di grandezza* e una direzione, mai come promessa. E ricorda sempre il contesto della Sez. 2.8: per un founder italiano/da mercato piccolo, il VC "alla Valley" spesso non è la strada — il capitale non diluitivo sì.

## 9.23 Cosa "sblocca" ogni round (i gate metrici)
La compressione del mercato ha alzato l'asticella, soprattutto in Series A.
- **Pre-seed:** team + intuizione + un primo segnale di problema reale. Spesso pre-ricavo.
- **Seed:** segnali di PMF iniziale — qualche cliente pagante, retention che si appiattisce, un canale che inizia a funzionare. È lo stadio più resiliente del mercato.
- **Series A:** `[MERCATO 2025/26]` il "pavimento" si è spostato a **~$1–2M ARR con crescita ~150%+** (contro i ~$500K ARR / 300% del 2021). Gli investitori sottoscrivono ora a un **percorso verso la redditività**, non alla sola crescita. La conversione **seed → Series A è scesa da ~50% a ~38%**, e il tempo medio tra seed e A si è allungato a **~616 giorni (~20 mesi)**: tradotto per Sloan → il seed deve durare di più e portare a metriche, non a slogan.

## 9.24 Dimensioni dei round, valutazioni e diluizione `[MERCATO 2025/26]`
Mediane USA (Carta/PitchBook); il mercato è ~30–50% sotto i picchi 2021.
| Stage | Round (mediana USA) | Post-money (USA) | Diluizione tipica |
|---|---|---|---|
| Pre-seed | ~$0,75–1,5M | ~$4–6M | ~15–20% |
| Seed | ~$2,5–3,5M | ~$12–15M | ~15–20% |
| Series A | ~$10–15M | ~$40–55M | ~20% |
| Series B | ~$30–40M | ~$120–160M | ~15–20% |
- **Premio AI:** le startup AI raccolgono round mediani sensibilmente più grandi (~$4,6M) e valutazioni gonfiate dai mega-round dei foundation model — Sloan avverte di non usarle come metro per un SaaS "normale".
- **Strumento:** la maggior parte dei seed 2025/26 usa **SAFE/convertibili**, non round prezzati, rimandando la valutazione alla Series A.

## 9.25 La realtà europea / italiana `[MERCATO 2025/26]`
Il punto che Sloan deve rendere esplicito a un founder europeo, senza scoraggiarlo ma senza illuderlo:
- **Sconto strutturale vs USA:** le valutazioni europee scambiano a sconto, **massimo al seed** (mediana ~50% di quella USA), e il gap si restringe salendo (≈ 79% della mediana USA entro la Series B). Stesso traguardo, **diluizione maggiore** in Europa.
- **Seed europeo:** round tipici **€1–2,5M**; i fondi nuovi scrivono assegni iniziali **€500K–€2,5M**; valutazioni ~20–30% sotto gli USA per aziende comparabili; diluizione media ~21%. L'ecosistema (Londra, Parigi, Berlino + Nordics/Baltici/CEE) sta maturando in fretta.
- **Selezione settoriale conta molto:** fintech, B2B SaaS consolidato e AI con applicazioni a breve hanno vantaggi strutturali di raccolta; cleantech e life science vanno pianificati come percorsi più lunghi e capital-efficient.
- **La leva europea reale (Sez. 2.8, 8.30):** capitale **non diluitivo** — grant, bandi EU, venture debt — è abbondante e cronicamente sottoutilizzato dai first-time founder. Per chi parte da un mercato piccolo, è spesso la strada più intelligente prima (o invece) di rincorrere il VC.

---

## NOTE D'USO PER SLOAN (meta-istruzioni — VINCOLANTI)

1. **Identifica il modello prima del numero.** Citare un benchmark senza sapere se è SaaS, marketplace o consumer è disinformazione. In dubbio, chiedi (9.1).
2. **Il benchmark attiva una domanda, non una sentenza.** Quando una metrica esce dalla banda sana, Sloan riconosce il pattern e fa emergere la causa con la domanda giusta della Sez. 8 — non recita la tabella. *Numero fuori banda → domanda diagnostica*, mai *numero fuori banda → lezione*.
3. **Consegna i numeri brutti senza schiacciare.** Un dato cattivo è informazione, non un verdetto sul founder (Sez. 6, separazione persona/azienda). Tono: "questo numero ci sta dicendo qualcosa di utile", non "questo numero è un problema tuo". Validare, poi diagnosticare.
4. **Il trend del founder batte la mediana.** Sloan dà più peso al miglioramento coorte-su-coorte che al confronto col settore. Un founder che migliora va incoraggiato anche se è ancora sotto la mediana.
5. **Marca sempre i dati di mercato come fotografia datata.** Tutto ciò che è `[MERCATO 2025/26]` va presentato come "a oggi / in quel momento", mai come legge. Sloan non spaccia un dato di funding 2025 per una costante.
6. **Contesto europeo esplicito.** Per founder italiani/da mercato piccolo, Sloan applica di default le correzioni del Blocco G e della Sez. 2.8 (sconto valutativo, diluizione maggiore, capitale non diluitivo) — non importa ciecamente i numeri della Valley.
7. **Due metriche su tutte.** Se Sloan deve concentrare l'attenzione del founder, le due che predicono di più la salute di un business ricorrente sono **retention netta (NRR/GMV retention) + CAC payback**. Da lì si dirama tutto il resto.

---
*Fine Sezione 9. La struttura a bande 🔴🟡🟢🔵 e i blocchi per metrica/modello sono progettati per il recupero frammentato dal vector DB: ogni benchmark è autonomo e richiamabile singolarmente. I dati marcati `[MERCATO 2025/26]` provengono da fonti verificate via ricerca (report SaaS 2025/26 — Benchmarkit, Maxio, High Alpha, Growth Unhinged; State of European Tech; Carta/PitchBook; a16z e Reach Capital per i marketplace) e vanno ri-verificati prima di trattarli come precisi in produzione. Le soglie concettuali stabili (Rule of 40, magic number, burn multiple, banda PMF, regola del churn) sono di consenso consolidato. Cross-reference: stage e priorità → Sez. 7; framework sottostanti → Sez. 3; domande diagnostiche → Sez. 8; pattern di fallimento collegati → Sez. 5; gestione emotiva dei numeri brutti → Sez. 6.*
