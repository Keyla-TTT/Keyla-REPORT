# Implementazione
In questo capitolo viene descritto come sono state impplementate le varie funzionalità del progetto.
Keyla è stata sviluppata su 2 fronti: il backend che si occupa della logica e l'interfaccia CLI che guida l'utende nell'utilizzo del software e
gestisce il flusso di esecuzione del sistema.

## Backend
La parte di Backend è stata a sua volta suddivisa in più moduli (o package) per facilitare la manutenzione, mantenendo il concetto di singola responsabilità.
-**UserManagement**: Si occupa della gestone degli utenti.
-**TypingTest**: Si occupa di creare e gestire i test di digitazione.
-**Analytics**: Si occupa di calcolare e mostrare le statistiche sui test.
-**Api**: Si occupa della definizione dell'API e la gestione degli Endpoints.

### UserManagement
Il modulo `UserManagement` si occupa della gestione degli utenti.
Gli utenti sono rappresentati dalla classe Profile contenente le seguenti info:
- `id`: identificativo univoco dell'utente,
- `name`: nome dell'utente,
- `email`: email dell'utente,
- `settings`: impostazioni relative al profilo utente (a livello di codice si tratta di un set di stringhe in modo da avere totale flessibilità).

La logica dietro alla creazione, modifica, e gestione dei profili (incluso il salvataggio su DB) è gestita dal subpackage repository.
In quanto le operazioni richiedono un'interazione diretta con il DB (interno o esterno) è stato deciso di utilizzare il pattern Repository per astrarre la logica dal resto dell'applicazione.
Qui vengono definite le seguenti operazioni:
- `toDocument`: converte un oggetto Profile in un documento BSON per l'inserimento nel DB.
- `fromDocument`: converte un documento BSON in un oggetto Profile.
- `get`: recupera un profilo dal DB dato il suo id.
- `create`: crea un nuovo profilo e lo salva nel DB.
- `update`: aggiorna un profilo esistente nel DB.
- `delete`: elimina un profilo dal DB dato il suo id.
- `deleteAll`: elimina tutti i profili dal DB (utile per testing).
- `list`: recupera tutti i profili dal DB.

In questo modo il resto dell'applicazione può interagire con i profili senza preoccuparsi dei dettagli di implementazione del DB.
### TypingTest
Il modulo `TypingTest` si occupa della creazione e gestione dei test di digitazione.
Un test di digitazione completato è rappresentato dalla classe `PersistedTypingTest` che contiene le informazioni salienti della sessione:
- `id`: identificativo univoco del test.
- `userId`: identificativo dell'utente che ha svolto il test.
- `wpm`: parole al minuto (Words Per Minute).
- `accuracy`: precisione della digitazione.
- `rawWpm`: WPM grezzo, senza la correzione degli errori.
- `consistency`: consistenza nel tempo di battitura.
- `words`: la lista di parole che componeva il test.
- `date`: data di esecuzione.
- `modifiers`: modificatori applicati al test (es. punteggiatura, numeri).

La creazione dei test è gestita dalla `TypingTestFactory`, che si occupa di generare la sequenza di parole utilizzando un `Dictionary` e di applicare i modificatori richiesti tramite la `ModifiersFacade`.

Analogamente a `UserManagement`, la persistenza dei test è gestita dal subpackage `repository` tramite il pattern Repository. Questo astrae la logica di salvataggio e recupero dei dati, permettendo di interagire con i test senza conoscere i dettagli del database sottostante. 
Il `TypingTestRepository` definisce le operazioni principali:
- `get`: recupera un test dal DB dato il suo id.
- `create`: salva un nuovo test nel DB.
- `getAll`: recupera tutti i test di un dato utente.
- `getLast`: recupera l'ultimo test di un dato utente.
- `delete`: elimina un test dal DB dato il suo id.
- `deleteAll`: elimina tutti i test dal DB.

### Analytics
Il modulo `Analytics` si occupa di calcolare e mostrare le statistiche sui test di digitazione.

Le statistiche individuali vengono rappresentate dalla classe `Statistics` (implementata da `TestStatistics`) che contiene i dati di un singolo test:
- `testId`: identificatore univoco del test
- `userId`: identificatore dell'utente che ha sostenuto il test
- `wpm`: parole per minuto raggiunte nel test
- `accuracy`: percentuale di precisione del test
- `errors`: lista delle posizioni degli errori commessi
- `timestamp`: momento in cui è stato completato il test

La logica di aggregazione e calcolo delle metriche complessive è gestita dal modulo `Analytics`, che utilizza le singole `Statistics` per generare dati aggregati.
Il componente principale è l'`AnalyticsCalculator`, che si occupa di:
- Aggregare i dati delle singole statistiche per calcolare metriche globali
- Calcolare medie di WPM e accuratezza su tutti i test
- Identificare i migliori risultati ottenuti
- Analizzare le tendenze di miglioramento nel tempo
- Generare il conteggio totale dei test effettuati

Il modulo `Analytics` si occupa di:
- Recuperare tutte le `Statistics` di un utente tramite il repository
- Utilizzare l'`AnalyticsCalculator` per elaborare i dati aggregati
- Fornire viste consolidate delle performance dell'utente nel tempo

La classe `Statistics` funge quindi da unità base di informazione per ogni test individuale, mentre il modulo `Analytics` la utilizza tramite l'`AnalyticsCalculator` per costruire una vista d'insieme delle performance dell'utente, permettendo di visualizzare progressi e identificare aree di miglioramento attraverso l'analisi dei dati storici.

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
- Applicare le politiche di autenticazione e autorizzazione

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