const mongoose = require('mongoose');

// mongodb+srv://dev:<password>@cluster0-ioncs.mongodb.net/test?retryWrites=true&w=majority
///////////<moj password od konekcijata>///////////////////ime na bazata kaj test///

mongoose.connect(
    'mongodb+srv://dev:dev@cluster0-ioncs.mongodb.net/ecommerce?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log('Could not connect to database');
            console.log(err);
        }
        return;
    }
);

const Users = mongoose.model(
    'users',
    {
        name: String,
        email: String,
        location: {
            city: String,
            address: String,
            number: String,
            country: String
        },
        password: String
    },
    'users'
);

// read
Users.find({}, (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});

//create

let u = new Users({
    name: "Bube Perovski",
    email: "bube@perovski.com",
    location: {
        city: "Skopje",
        address: "Buuuuube",
        number: "bb",
        country: "Macedonia"
    },
    password: "ebub123!"
});

u.save((err) => {
    if (err) {
        return console.log(err);
    }
});

//update

Users.updateOne(
    { _id: '5e722126fe8187837e4f3c83' },
    {
        email: 'stanko@stankovski.mk',
        password: 'test100'
    },
    (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('User update successfull');
    }
);

//delete

Users.deleteOne(
    { _id: '5e7220e8fe8187837e4f299a' }, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('User deleted successfully');
    });

////////////////////


    const Products = mongoose.model(
        'products',
        {
            name: String,
            ammount: Number,
        },
        'products'
    );

    let p = new Products({
        name: "water bottles",
        ammount: 6
    });

//create
    p.save((err) => {
        if (err) {
            return console.log(err);
        }
    });

    //update
    Products.updateOne(
        { _id: '5e7240fffe8187837e5e34f9' },
        {
            name: 'liquid soap',
            ammount: 10
        },
        (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('User update successfull');
        }
    );

 //read  
    Products.find({}, (err, data) => {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
//del
    Products.deleteOne(
        { _id: '5e7241fcc2bb5a0414b5ec56' }, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('User deleted successfully');
        });