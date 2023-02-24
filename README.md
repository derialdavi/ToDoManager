# ToDoManager

To Do Manager è un'applicazione web che ti consente di segnarti facilmente delle tasks da fare e, una volta finite, possono essere cancellate.

## Come funziona

Quando viene premuto il pulsante per aggiungere una task, node legge il corpo della richiesta ed estrae il titolo, la descrizione e la rilevanza della task. Questi dati verranno caricati in un file JSON e verranno letti quando l'utente tornerà nella pagina iniziale per mostrare tutte le task.

## Installazione depenecies

```
npm install
```

## Come runnare
```
node server.js
```
