const movies = require('../models/movies');

const listAll = (req, res) => {
    movies.listAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

const listOne = (req, res) => {
    movies.listOne(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(200).send(data);
        });
};

const addOne = (req, res) => {
    movies.addOne(req.body)
    .then(() => {
        res.status(201).send('ok');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
};

const updateOne = (req, res) => {
    movies.updateOne(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(200).send(data);
        });
};

const deleteOne = (req, res) => {
    movies.deleteOne(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(200).send(data);
        });
};

module.exports = {
    listAll,
    listOne,
    addOne,
    updateOne,
    deleteOne
}