const tconvert = (t, flag) => {
    switch (flag) {
        case "c2f":
            return (t * 1.8 + 32);
        case "f2c":
            return ((t - 32) / 1.8);
    }
};
console.log(tconvert(32, "f2c"));
console.log(tconvert(100, "c2f"));
console.log(tconvert(100, "f2c"));
console.log(tconvert(56, "c2f"));
console.log(tconvert(56, "abc"));

setInterval(() => {
    c
})