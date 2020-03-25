const fs = require("fs");

const filename = "niza.json"

const get = (req, res) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("get read >>>> " + data);
  });
  res.send("get is ok");
};

const post = (req, res) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    };
    let json = JSON.parse(data);
    json.push({ user: `${req.body.name} ${req.body.lastname}` })
    fs.writeFile(filename, JSON.stringify(json), (err) => {
      if (err) {
        console.log(err)
      }
    });
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    })
    res.send("post is ok");
    console.log("post read >>>> " + data);
  });
};

const read = (fname) => {
  return new Promise((success, fail) => {
    fs.readFile(fname, 'utf8', (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
};

const write = (fname, data) => {
  return new Promise((success, fail) => {
    fs.writeFile(fname, data, (err) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
};

// get()
//   .then(() => {
//     return read();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// post()
//   .then(() => {
//     return read();
//   })
//   .then(() => {
//     return write();
//   })
//   .then(() => {
//     return read();
//   })
//   .catch((err) => {
//     console.log(err);
//   });


module.exports = {
  get,
  post,
  read,
  write,
};