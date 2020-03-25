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
                userModel.findByEmail(req.body.email)
                    .then(data => {
                        if (!data) {
                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(req.body.password, salt, function (err, hash) {
                                    let u = {
                                        full_name: req.body.full_name,
                                        email: req.body.email,
                                        password: hash,
                                    };
                                    return userModel.saveUser(u);
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
                throw 'validation failed';
            }
            return userModel.findByEmail(req.body.email);
        })
        .then(data => {
            if (!data) {
                throw 'user not found';
            }
            if (!bcrypt.compareSync(req.body.password, data.password)) {
                throw 'username or password not valid'
            }
            let tokenData = {
                uid: data._id,
                full_name: data.full_name
            };
            let token = jwt.sign(tokenData, 'secret');
            res.status(201).send({ jwt: token });
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

module.exports = {
    register,
    login
}