var fs = require('fs');

const filename = 'data.txt';
const filename2 = 'data2.txt';

fs.writeFile(filename, 'bla blal alfa', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Successful write');
    fs.appendFile(filename, 'appendappe ndappend appe ndap pend', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('success')
    });
    fs.readFile(filename, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data.toString());
    });
});
const write = (fname, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(fname, data, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
}
const append = (fname, data) => {
    return new Promise((success, fail) => {
        fs.appendFile(fname, data, (err) => {
            if (err) {
                return fail(err);

            }
            return success();
        });
    })
}
const read = (fname) => {
    return new Promise((success, fail) => {
        fs.readFile(fname, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    })
}
let file2 = 'data2.txt';

write(file2, 'test test test')
    .then(() => {
        return append(file2, 'TEST TEST TEST');
    })
    .then(() => {
        return read(file2);
    })
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });




