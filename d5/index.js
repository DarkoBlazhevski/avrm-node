const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

let app = express();

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

const dburl = 'mongodb+srv://dev:dev@cluster0-ioncs.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.connect(
    dburl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log('Cannot connec to db');
        }
        return;
    }
);

const Students = mongoose.model(
    'students',
    {
        ime: String,
        prezime: String,
        prosek: Number
    },
    'students'
);

app.get('/', (req, res) => {
    Students.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.render('index', { 'students': data });
        console.log(data);
    });
});

app.post('/newstudent', (req, res) => {
    let u = new Students({
        ime: req.body.ime,
        prezime: req.body.prezime,
        prosek: req.body.prosek
    });
    u.save((err) => {
        if (err) {
            return console.log(err);
        }
    });
    res.redirect('/');
});

app.post('/updatestudent', (req, res) => {
    Students.updateOne(
        { _id: req.params.id },
        {
            ime: req.body.ime,
            prezime: req.body.prezime,
            prosek: req.body.prosek
        },
        (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('Student updated');
        }
    );
    res.redirect('/');
});

app.post('/deletestudent/:id', (req, res) => {
    Students.deleteOne(
        { _id: req.params.id }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
            console.log('Student deleted');
        });
});

app.listen(8080, (err) => {
    if (err) {
        console.log('Error starting server');
    }
    console.log("Server started on port 8080...")
});