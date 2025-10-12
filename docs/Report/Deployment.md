# Deployment

Una **metarepo** (meta-repository) è un repository che aggrega e orchestra componenti da altri repository correlati. Non contiene il codice sorgente principale, ma funge da punto centrale per combinare, rilasciare e distribuire artefatti provenienti da più progetti separati.

## Keyla-RELEASE MetaRepo

La metarepo `Keyla-RELEASE` ha lo scopo di:

- **Aggregare** i rilasci dai repository `Keyla-API` e `Keyla-CLI`
- **Creare immagini Docker unificate** che includono entrambi i componenti
- **Pubblicare** automaticamente su Docker Hub
- **Centralizzare** la distribuzione del sistema Keyla completo

## Funzionamento del Workflow

Keyla-RELEASE lavora in modo automatico attraverso un workflow che automatizza il processo di rilascio:

### 1. **Trigger Events**
- `repository_dispatch`: Attivato automaticamente quando Keyla-API o Keyla-CLI rilasciano una nuova versione
- `workflow_dispatch`: Esecuzione manuale con possibilità di specificare tag specifici

### 2. **Risoluzione dei Tag**
- Determina automaticamente le versioni più recenti di API e CLI
- Supporta override manuali per versioni specifiche
- Valida che entrambi i tag siano disponibili

### 3. **Download degli Artefatti**
- Scarica il file ZIP da Keyla-API
- Scarica tutti gli eseguibili da Keyla-CLI (`keyla-*`)
- Organizza gli asset nella directory `./release-assets`

### 4. **Creazione del Tag di Rilascio**
- Combina le versioni in modo da avere un versioning specifico per Keyla-TTT che includa sia la versione di API che di CLI: `v<api_version>.<cli_version>`
  (Esempio: API `v1.6.0` + CLI `v1.2.0` = Release `v1.6.0.1.2.0`)

### 5. **Build e Push Docker**
- Costruisce un'immagine Docker unificata
- Publica su Docker Hub in 2 modi, sia la versione specifica che aggiornarndo ogni volta la versione latest, dando la possibilità all'utende di scegliere la versione desiderata:
    - Tag versioned: `keylattt/keyla:v1.6.0.1.2.0`
    - Tag latest: `keylattt/keyla:latest`

### 6. **Rilascio GitHub**
- Crea un release GitHub con:
    - Descrizione delle versioni componenti
    - Link all'immagine Docker Hub
    - Documentazione per l'utilizzo
