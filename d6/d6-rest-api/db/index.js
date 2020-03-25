const mongoose = require('mongoose');

const username = 'dev';
const password = 'dev';
const host = 'cluster0-ioncs.mongodb.net';
const db = 'ecommerce';

const dbcstring = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;

const init = () => {
    mongoose.connect(
        dbcstring,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('DB connected!');
        }
    )
};

module.exports = {
    init
};