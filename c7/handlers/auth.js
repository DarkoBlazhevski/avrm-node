const authValidator = require('../validators/auth');
const validator = require('node-input-validator');
const bcrypt = require('bcryptjs');
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    let v = new validator.Validator(req.body, authValidator.register);
    v.check()
        .then(match => {
            if (match) {
                if (req.body.password !== req.body.password2) {
                    throw "Passwords don't match";
                }
                userModel.getByEmailAddress(req.body.email)
                    .then(data => {
                        if (!data) {
                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(req.body.password, salt, function (err, hash) {
                                    let u = {
                                        full_name: req.body.full_name,
                                        email: req.body.email,
                                        password: hash,
                                    };
                                    return userModel.save(u);
                                });
                            });
                        } else {
                            throw "Duplicate user";
                        }
                    })
                    .then(() => {
                        res.status(201).send('created');
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send('bad request');
                    });
            } else {
                throw "Validation failed";
            }
        })
        .catch(err => {
            console.log(err);
            res.send(v.errors);
        });
};

const login = (req, res) => {
    let v = new validator.Validator(req.body, authValidator.login);
    v.check()
        .then(match => {
            if (!match) {
                throw "validation failed";
            }
            return userModel.getByEmailAddress(req.body.email);
        })
        .then(data => {
            if (!data) {
                throw "user not found";
            }
            if (!bcrypt.compareSync(req.body.password, data.password)) {
                throw "bad username or password";
            }
            // create token
            let tokenData = {
                uid: data._id,
                full_name: data.full_name
            };
            let token = jwt.sign(tokenData, 'tajna123');
            res.status(200).send({ jwt: token });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

const privateTest = (req, res) => {
    res.send(req.user); // print jwt data
};

const publicTest = (req, res) => {
    res.send('hello from public');
};

module.exports = {
    register,
    login,
    privateTest,
    publicTest
};


// peropero

// IUTDFOG#*HDPEWUBCOPXJOEUcp9e8whjcibqpw8ygrcp8w3hciheblvuhsdcjhdsi

// do8136gdo8h12o8dyxg130p89hxpy831pq98xhpy134go8p7xhp49137box8731x8


// Хешување (hashing)
// Енкриприрање (encrypting)
// Енкодирање (encoding)