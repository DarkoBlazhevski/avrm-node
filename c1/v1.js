const fs = require('fs');


const tconvert = (t, flag) => {
    switch (flag) {
        case 'c2f':
            return (t * 1.8 + 32);
        case 'f2c':
            return ((t - 32) / 1.8);
        default:
            return null;
    }
};

const tconvert2 = function (t, flag) {
    switch (flag) {
        case 'c2f':
            return (t * 1.8 + 32);
        case 'f2c':
            return ((t - 32) / 1.8);
        default:
            return null;
    }
};

function tconvert3(t, flag) {
    switch (flag) {
        case 'c2f':
            return (t * 1.8 + 32);
        case 'f2c':
            return ((t - 32) / 1.8);
        default:
            return null;
    }
}

console.log(tconvert(32, 'f2c'));
console.log(tconvert2(32, 'f2c'));

console.log(tconvert(100, 'c2f'));
console.log(tconvert2(100, 'c2f'));

console.log(tconvert(100, 'f2c'));
console.log(tconvert2(100, 'f2c'));

console.log(tconvert(56, 'c2f'));
console.log(tconvert2(56, 'c2f'));

console.log(tconvert(56, 'abc'));
console.log(tconvert2(56, 'abc'));


let cond = true;
let cond2 = false;

const f1 = () => {
    return new Promise((success, fail) => {
        if (!cond) {
            return success('SUCCESS!');
        }
        return fail('FAIL');
    });
}

const f2 = () => {
    return new Promise((success, fail) => {
        if (cond2) {
            return success('SUCCESS!');
        }
        return fail('FAIL');
    });
}

f1()
    .then((data) => {
        console.log(data);
        return f2();
    })
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.log('err', err);
    });


setInterval(() => {
    console.log('interval!');
}, 1000);


var cb = () => {
    console.log('interval!');
};

setInterval(cb, 1000);



const sobiranje = (a, b) => {
    return a + b;
}

const odzemanje = (a, b) => {
    return a - b;
}

const matematikia = (x, y, fn) => {
    let res = fn(x, y);
    console.log('Rezultat: ', res);
}

matematikia(2, 5, odzemanje);
matematikia(2, 5, sobiranje);

matematikia(5, 10, (g, h) => {
    return g * 2 + h;
});










// el.addEventListener('click', () => {

// })

var ime = 'pero';

const fun1 = () => {
    return new Promise((success, fail) => {
        if (ime == 'pero') {
            return success('WIN!');
        }
        return fail(':(');
    });
};

const fun2 = () => {
    return new Promise((success, fail) => {
        if (ime == 'janko') {
            return success('WIN2!');
        }
        return fail(':( 2');
    });
};

fun1()
    .then(() => {
        console.log('Success');
        return fun2();
    })
    .then(() => {
        console.log('Success 2');
    })
    .catch(() => {
        console.log('Fail');
    });


// Promises

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('ERR: ', err);
        return;
    }
    let d = data + ' impsum dolor sit amet...';
    fs.writeFile('./test.txt', d, (err) => {
        if (err) {
            console.log('ERR: ', err);
            return;
        }
        console.log('Successffully modified file!');
    });
});


const readf = (filename) => {
    return new Promise((success, fail) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        });
    });
};

const writef = (filename, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};


readf('test.txt')
    .then(data => {
        return writef('test.txt', data);
    })
    .then(() => {
        console.log('success writing to file!');
    })
    .catch(err => {
        console.log('ERROR: ', err);
    });



// fetch
fetch('http://google.com/ajax.json')
    .then(res => {
        return res.json();
    })
    .then(data => {
        return writef('test.txt', data);
    })
    .then(() => {
        console.log('successfull save!');
    })
    .catch(err => {
        console.log('ERROR: ', err);
    });
