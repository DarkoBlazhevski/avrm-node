const mongoose = require('mongoose');

const User = mongoose.model(
    'user',
    {
        full_name: String,
        email: String,
        password: String
    }
);

const findByEmail = (email) => {
    return new Promise((success, fail) => {
        User.findOne({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    });
};

const saveUser = (data) => {
    return new Promise((success, fail) => {
        let user = new User(data);
        user.save((err) => {
            if (err) {
                return fail(err);
            }
            return success();
        })
    });
}

module.exports = {
    findByEmail,
    saveUser
};