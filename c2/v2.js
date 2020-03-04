const fs = require('fs');

const getData = (fname) => {
    return new Promise((success, fail)=> {
        fs.readFile(fname, 'utf8', ((err, data) => {
            if (err) {
                return fail(err);
            }
            let json = JSON.parse(data);
            return success(json);
        }));
    });
};
getData('studenti.json')
    .then(students => {
        console.log(students);

        students.sort((a, b) => {
            if(a.ime.length > b.ime.length){
                return -1;
            } else if (a.ime.length < b.ime.length){
                return 1;
            } else {
                return 0;
            }
        });
        console.log(ssbn);
        console.log('Student so najdolgo ime ')
    })
    .catch(err => {
        console.error(err);
    });