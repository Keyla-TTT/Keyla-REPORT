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

In questo capitolo viene descritto come è stata implementata l'interfaccia CLI di Keyla, che rappresenta il punto di accesso principale per gli utenti.

### Gestione degli Stati

L'implementazione è basata sul concetto di automa a stati finiti, dove ogni schermata rappresenta uno stato specifico del sistema.
Ogni stato/schermata presenta all'utente un set di opzioni correlate agli endpoint del backend disponibili per quel contesto:

- **Menu Principale**: Stato iniziale che presenta le opzioni principali (profili, test, statistiche)
- **Profile Management**: Gestisce la creazione, modifica e selezione dei profili utente
- **Test Execution**: Coordina l'esecuzione dei test di digitazione
- **Analytics View**: Visualizza le statistiche e i dati analitici
- **Settings Configuration**: Permette la configurazione delle impostazioni CLI e backend

### Mapping Stati-Endpoint

Ogni stato della CLI è associato a specifici endpoint del backend:

```kotlin
// Esempio di mapping per il ProfileState
ProfileState --> {
    GET /users          // Lista profili
    POST /users         // Crea profilo
    PUT /users/{id}     // Modifica profilo
    DELETE /users/{id}  // Elimina profilo
}
```

La transizione tra gli stati avviene in base alle scelte dell'utente, mantenendo la coerenza del flusso applicativo e garantendo che ogni schermata presenti solo le opzioni associate a quel constesto.


### Comandi Principali

- **`keyla start`**: Avvia l'interfaccia interattiva partendo dal menu principale
- **`keyla profile`**: Accesso diretto alla gestione dei profili utente
- **`keyla test`**: Gestione dei test di digitazione
- **`keyla stats`**: Visualizzazione delle statistiche
- **`keyla config`**: Configurazione del sistema
- **`keyla version`**: Mostra la versione dell'applicazione
- **`keyla help`**: Visualizza la guida completa dei comandi

### Modalità Interattiva vs Modalità Comando

La CLI supporta sia l'esecuzione di comandi singoli che la modalità interattiva:
- I comandi diretti permettono l'automazione e l'integrazione in script
- La modalità interattiva invece permette la navigazione muovendosi tra le schermate usando le opzioni presentate a schermo.

## Gestione delle Configurazioni

La CLI mantiene due tipi distinti di configurazioni per garantire la flessibilità d'uso:

### Configurazioni Backend
Serve a gestire i parametri del backend:
- Impostazioni per la generazione dei test (lunghezza, difficoltà, modificatori)
- Parametri di calcolo delle statistiche
- Configurazioni del DB

### Configurazioni CLI Locali
Mantiene impostazioni specifiche per l'interfaccia:
- **Profilo Attivo**: ID del profilo utente selezionato
- **URL API**: Endpoint del backend a cui connettersi (locale o remoto)
- **Preferenze di Visualizzazione**: Formattazione dell'output, lingua
- **Cache Locale**: Dati temporanei per migliorare le performance

## Multipiattaforma con Kotlin Multiplatform

L'implementazione sfrutta Kotlin Multiplatform per garantire la compatibilità cross-platform.
L'idea è permettere l'esecuzione nativa su tutti i principali sistemi operativi, senza dover scrivere codice specifico per ogni piattaforma.

### Vantaggi della Soluzione Multipiattaforma

1. **Codice Condiviso**: La logica principale è implementata una sola volta e condivisa tra tutte le piattaforme
2. **Performance Native**: Compilazione nativa per ogni target specifico (windows, Linux, macOS)
3. **API Platform-Specific**: Accesso alle API native del sistema operativo 
4. **Distribuzione Semplificata**: Binari specifici per ogni piattaforma senza dipendenze esterne

### Supporto Sistemi Operativi
Per Keyla sono state configurate le seguenti piattaforme:
- **Windows**: che genera un file Binario `.exe` 
- **Linux**: che genera un file Binario nativo compatibile con le principali distribuzioni
- **macOS**: che genera un file Binario nativo per macOS

La CLI così implementata permette a tutti di navigare con semplicità all'interno dell'applicazione e con qualsiasi sistema operativo.