const mongoose = require('mongoose');

const Movie = mongoose.model(
    'movie',
    {
        name: String,
        director: String,
        release_date: Date,
        genre: [String],
        actors: [String],
        plot: String
    }
);

const listAll = () => {
    return new Promise((success, fail) => {
        Movie.find({}, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

const listOne = (id) => {
    return new Promise((success, fail) => {
        Movie.findOne({ _id: id }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

const addOne = (id) => {
    return new Promise((success, fail) => {
        let u = new Movie(data);
        /////////////////////////
        u.save()
/////////////////////////////
    });
};

const updateOne = (id) => {
    return new Promise((success, fail) => {
        Movie.updateOne({ _id: id }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const deleteOne = (id) => {
    return new Promise((success, fail) => {
        Movie.deleteOne({ _id: id }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};



module.exports = {
    listAll,
    listOne,
    addOne,
    updateOne,
    deleteOne
}