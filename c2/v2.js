const fs = require('fs');

const getData = (fname) => {
    return new Promise((success, fail) => {
        fs.readFile(fname, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            let json = JSON.parse(data);
            return success(json);
        });
    });
};

getData('studenti.json')
    .then(students => {
        // sortiranje po dolzina na ime
        let ssbn = students.sort((a, b) => {
            if (a.ime.length > b.ime.length) {
                return -1;
            } else if (a.ime.length < b.ime.length) {
                return 1;
            } else {
                return 0;
            }
        });

        let ssbln = students.sort((a, b) => {
            if (a.prezime.length > b.prezime.length) {
                return -1;
            } else if (a.prezime.length < b.prezime.length) {
                return 1;
            } else {
                return 0;
            }
        });

        let ssbp = students.sort((a, b) => {
            if (a.prosek > b.prosek) {
                return -1;
            } else if (a.prosek < b.prosek) {
                return 1;
            } else {
                return 0;
            }
        });

        let fbl = students.filter((s) => {
            return s.prezime.endsWith('ski')
        });

        let rbp = students.reduce((acc, s) => {
            if (acc.prosek != undefined) {
                return acc.prosek;
            }
            let o = Number(acc) + Number(s.prosek);
            return o;
        });

        let msbp = students.map((s, i) => {
            return s.prosek / 2;
        });

        console.log('Student so naj kratko ime e studentot:', ssbn[ssbn.length - 1].ime);
        console.log('Student so naj dolgo prezime e studentot:', ssbln[0].prezime);
        console.log('Student so naj visok prosek e studentot so prosek:', ssbp[0].prosek);
        console.log('Student so naj nizok prosek e studentot so prosek:', ssbp[ssbln.length - 1].prosek);

        fbl.forEach((s, i) => {
            console.log(s.ime, s.prezime);
        });

        console.log(rbp / students.length);

        msbp.forEach((s, i) => {
            console.log(s);
        });
    })
    .catch(err => {
        console.error(err);
    });