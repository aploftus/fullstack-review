const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const db = require('../database/index.js');

const bodyParser = require('body-parser');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

// parse incoming requests to collect search term from request data
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // req.body gets parsed using bodyParser
  let user = req.body.term;
  getReposByUsername(user, db.save);
  res.send('search term received');
});

app.get('/repos', function (req, res) {
  // query database
  db.getTop25((err, data) => {
    err && console.error(err);
    res.send(JSON.stringify(data));
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

