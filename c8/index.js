const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./db');
const jwt = require('express-jwt');
const auth = require('./handlers/auth');
const movies = require('./handlers/movies');
db.init();

const api = express();
api.use(bodyParser.json());
api.use(cors());
api.use(
    jwt({ secret: 'secret' })
        .unless({
            path: [
                { url: '/register', method: ['post'] },
                { url: '/login', method: ['post'] },
                { url: '/movies', method: ['get'] },
                { url: '^\/movies\/.*/', method: ['get'] }
            ]
        })
);

api.post('/register', auth.register);
api.post('/login', auth.login);
api.get('/movies', movies.listAll); //get all movies
api.get('/movies/:id', movies.listOne); //get one movie
api.post('/movies', movies.addOne); //add a movie
api.put('/updatemovie/:id', movies.updateOne) //update movie
api.delete('/deletemovie/:id', movies.deleteOne)

api.listen(8080, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('API connected');
});