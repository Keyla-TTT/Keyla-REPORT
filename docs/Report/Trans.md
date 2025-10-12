# Implementazione
In questo capitolo viene descritto come sono state impplementate le varie funzionalità del progetto.
Keyla è stata sviluppata su 2 fronti: il backend che si occupa della logica e l'interfaccia CLI che guida l'utende nell'utilizzo del software e
gestisce il flusso di esecuzione del sistema.

## Backend
La parte di Backend è stata a sua volta suddivisa in più moduli (o package) per facilitare la manutenzione, mantenendo il concetto di singola responsabilità.
- **UserManagement**: Si occupa della gestone degli utenti.
- **TypingTest**: Si occupa di creare e gestire i test di digitazione.
- **Analytics**: Si occupa di calcolare e mostrare le statistiche sui test.
- **Api**: Si occupa della definizione dell'API e la gestione degli Endpoints.

<!-- Aggiungere una piccola parte descrittiva che introduce la parte di API -->

### API
Il modulo `API` definisce l'interfaccia di comunicazione tra il frontend e il backend, fornendo un insieme strutturato di endpoints per accedere alle funzionalità del sistema.

L'architettura API segue il pattern REST, organizzando le operazioni in risorse logiche corrispondenti ai moduli principali del backend. Gli endpoints sono raggruppati nelle seguenti categorie:

**User Management Endpoints:**
- `GET /users/{id}`: recupera le informazioni di un profilo utente specifico
- `POST /users`: crea un nuovo profilo utente
- `PUT /users/{id}`: aggiorna un profilo utente esistente
- `DELETE /users/{id}`: elimina un profilo utente
- `GET /users`: recupera la lista di tutti i profili utente

**Typing Test Endpoints:**
- `POST /tests`: crea e avvia un nuovo test di digitazione
- `GET /tests/{id}`: recupera i dettagli di un test specifico
- `GET /users/{userId}/tests`: recupera tutti i test di un utente
- `GET /users/{userId}/tests/last`: recupera l'ultimo test completato da un utente
- `DELETE /tests/{id}`: elimina un test specifico

**Analytics Endpoints:**
- `GET /users/{userId}/analytics`: recupera le statistiche aggregate di un utente
- `GET /users/{userId}/analytics/period`: recupera le statistiche per un periodo specifico
- `GET /users/{userId}/statistics`: recupera le statistiche individuali dei test

La gestione delle richieste HTTP e delle risposte è affidata a un layer di routing che si occupa di:
- Validare i parametri di input
- Instradare le richieste ai servizi appropriati
- Gestire gli errori e le eccezioni
- Serializzare e deserializzare i dati JSON

**Implementazione del Pattern Controller:**

Il modulo API implementa il pattern Controller attraverso una struttura a tre livelli che garantisce la separazione delle responsabilità:

1. **Controller Layer**: Ogni risorsa REST è gestita da un controller dedicato (`UserController`, `TypingTestController`, `AnalyticsController`) che si occupa esclusivamente di:
    - Ricevere le richieste HTTP in ingresso
    - Estrarre e validare i parametri dalla richiesta
    - Delegare l'elaborazione ai servizi del business layer
    - Formattare le risposte HTTP con i codici di stato appropriati
    - Gestire le eccezioni specifiche del layer di presentazione

2. **Service Layer**: I controller si interfacciano con i servizi dei rispettivi moduli backend (`UserManagement`, `TypingTest`, `Analytics`) che contengono la logica di business. Questa separazione permette di:
    - Mantenere i controller snelli e focalizzati sulla gestione HTTP
    - Riutilizzare la logica di business in contesti diversi dall'API REST
    - Testare separatamente la logica di business e quella di presentazione

3. **Repository Layer**: I servizi a loro volta utilizzano i repository per l'accesso ai dati, completando l'architettura a layers.

Questa implementazione garantisce che ogni controller abbia una responsabilità specifica e limitata, rendendo il codice più maintibile e testabile.
I controller agiscono come intermediari tra il protocollo HTTP e la logica di business, traducendo le richieste in chiamate ai servizi appropriati e trasformando i risultati in risposte HTTP strutturate.

## CLI

Si comporta come automa a stati finiti sfruttando gli endpoint:
 partende da una schermata (che può essere il menu), mostra come opzioni tutti i vari edpoint relativi a quella schermata....APPROFONDIRE E MIGLIORARE

Ci sono tutti i vari entry point:
- 'keyla start'
- 'keyla profile'
- 'keyla test'
- ...
- FINIRE con tutti gli entry point

La cli oltre a configurare i config (del backend) si occupa di gestire alcuni settings suoi, come profilo da utilizzare, url dell'api ecc..

