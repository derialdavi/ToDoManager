const fs = require('fs');
const express = require('express');
var bodyParser = require('body-parser')

const dirPath = __dirname;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    var file = fs.readFileSync('./tasks.json');
    res.render('index', { "length": JSON.parse(file).length, "tasks": JSON.parse(file) });
});

app.post('/tasks', (req, res) => {
    res.sendFile(dirPath + '/tasks.json', err => {
        if (err) {
            next(err);
        } else {
            console.log('Sent');
        }
    });
});

app.get('/es', (req, res) => {
    res.render('es');
})

app.get('/addTask', (req, res) => {
    res.render('addTask');
});

app.post('/add', urlencodedParser, (req, res) => {
    let titolo = req.body.titolo;
    titolo = titolo.replace(/\+/g, ' ');
    let descrizione = req.body.descrizione;
    descrizione = descrizione.replace(/\+/g, ' ');
    let rilevanza = req.body.rilevanza;
    rilevanza = rilevanza.replace(/\+/g, ' ');

    var file = fs.readFileSync('./tasks.json');

    if (file.length === 2) {
        fs.writeFileSync('tasks.json', '[{"Titolo": "' + titolo + '", "Descrizione": "' + descrizione + '", "Rilevanza": "' + rilevanza + '"}]');
    }
    else {
        file = JSON.parse(file);
        file.push({ "Titolo": titolo, "Descrizione": descrizione, "Rilevanza": rilevanza });
        fs.writeFileSync('./tasks.json', JSON.stringify(file));
    }

    res.redirect('/');
});

app.post('/delete', (req, res) => {
    file = fs.readFileSync('./tasks.json');
    file = JSON.parse(file);

    req.on('data', chunk => {

        chunk = chunk.toString();
        chunk = JSON.parse(chunk);
        chunk.Titolo = chunk.Titolo.replace(/\_/g, ' ');
        console.log(typeof (chunk), chunk.Titolo);

        var obj = file.findIndex((obj) => obj.Titolo === chunk.Titolo);

        if (obj > -1) {
            file.splice(obj, 1);
        }

        fs.writeFileSync('./tasks.json', JSON.stringify(file));

    });

    res.redirect('/');
});

app.listen(8080, () => {
    console.log("Server at 8080");
});
