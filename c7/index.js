const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const db = require('./db');
const auth = require('./handlers/auth');

db.init();

const api = express();
api.use(bodyParser.json());
api.use(cors());
api.use(
    jwt({ secret: 'tajna123' })
        .unless({ path: ['/register', '/login', '/public'] })
);

api.post('/register', auth.register);
api.post('/login', auth.login);
api.get('/private', auth.privateTest);
api.get('/public', auth.publicTest);

api.listen(9090, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('API started successfully');
});
