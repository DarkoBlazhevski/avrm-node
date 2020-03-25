// REST

// REpresentational
// State
// Transfer

// базиран на HTTP

// HTTP (GET, POST) методи
// REST (GET, POST, PUT, PATCH, DELETE) методи

// REST API

// API - Application Programming Interface

// Интерфејс за програмска комуникација

// HTTP -> HTML
// REST -> JSON (сурови податоци)

// (React) <-> (REST API)

const express = require('express');
const bodyParser = require('body-parser');
const students = require('./handlers/students');
const db = require('./db');
const cors = require('cors');

db.init();

const api = express();
api.use(bodyParser.json());
api.use(cors());
// RESOURCE: students
api.get('/api/v1/students', students.getAll); // get all students
api.get('/api/v1/students/:id', students.getOne); // get single student by id
api.post('/api/v1/students', students.addOne); // save one (create) student
api.put('/api/v1/students/:id', students.updateOne); // update single student
api.delete('/api/v1/students/:id', students.deleteOne); // delete student from db

api.listen(9090, (err) => {
    if(err){
        return console.error(err);
    }
    console.log('API started on port 9090');
});











