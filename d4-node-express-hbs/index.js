const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  fs.readFile('./blogposts.json', "utf8", (err, data) => {
    if (err) {
      res.status(400).send('request error');
    }
    let niza = { 
      blogpost:  JSON.parse(data), 
    };
    res.render('index', niza);
  });
});

app.post('/newblogpost', (req, res) => {
  fs.readFile('./blogposts.json', 'utf8', (err, data) => {
    if (err) {
      res.status(400).send('request error');
      return;
    }
    data = JSON.parse(data);
    data.push({
      title: req.body.title,
      name: req.body.name,
      lastname: req.body.lastname,
      content: req.body.content
    });
    data = JSON.stringify(data);
    fs.writeFile('./blogposts.json', data, (err) => {
      if (err) {
        res.status(400).send('request error');
        return;
      }
      res.redirect('/');
    });
  });
});

app.get('/blogpost/delete/:id', (req, res) => {
  fs.readFile('./blogposts.json', 'utf8', (err, data) => {
    if (err) {
      res.status(400).send('request error');
      return;
    }
    data = JSON.parse(data);
    data = data.filter((value, i) => {
      if (i != req.params.id) {
        return value;
      };
    });
    data = JSON.stringify(data);
    fs.writeFile('./blogposts.json', data, (err) => {
      if(err) {
        res.status(400).send('request error');
      }
      res.redirect('/');
    });
  });
});

app.listen(8080, (err) => {
  if (err) {
    console.log('Error starting server', err);
    return;
  }
  console.log('Server started...');
});