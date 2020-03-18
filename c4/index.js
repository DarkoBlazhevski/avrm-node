const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    // res.send('OK');
    res.render('main');
});

app.get('/ime/:ime', (req, res) => {
    let data = {
        ime: req.params.ime,
        prezime: 'Studentovski',
        denovi: ['pon', 'vto', 'sre', 'cet', 'pet', 'sab', 'ned']
    };
    res.render('ime', data);
});

app.get('/students', (req, res) => {
    fs.readFile('./studenti.json', 'utf8', (err, data) => {
        if(err){
            res.status(400).send('bad request');
            return;
        }
        let out = {
            students: JSON.parse(data)
        };
        res.render('students', out);
    });
});

app.post('/students', (req, res) => {
    fs.readFile('./studenti.json', 'utf8', (err, data) => {
        if(err){
            res.status(400).send('bad request');
            return;
        }
        data = JSON.parse(data);
        data.push({
            ime: req.body.ime,
            prezime: req.body.prezime,
            prosek: req.body.prosek,
        });
        data = JSON.stringify(data);
        fs.writeFile('./studenti.json', data, (err) => {
            if(err){
                res.status(400).send('bad request');
                return;
            }
            res.redirect('/students');
        });
    });
});

app.get('/students/delete/:id', (req, res) => {
    fs.readFile('./studenti.json', 'utf8', (err, data) => {
        if(err){
            res.status(400).send('bad request');
            return;
        }
        data = JSON.parse(data);
        data = data.filter((v, i) => {
            if(i != req.params.id){
                return v;
            }
        });
        data = JSON.stringify(data);
        fs.writeFile('./studenti.json', data, (err) => {
            if(err){
                res.status(400).send('bad request');
                return;
            }
            res.redirect('/students');
        });
    });
});

app.listen(8080, (err) => {
    if(err){
        console.log('Could not start server', err);
        return;
    }
    console.log('Server started successfully');
});