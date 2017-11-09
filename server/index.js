const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const db = require('../database/index.js');

const bodyParser = require('body-parser');
const express = require('express');
let app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/../client/dist'));

// parse incoming requests to collect search term from request data
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // req.body gets parsed using bodyParser
  let user = req.body.term;
  getReposByUsername(user, (data) => {
    db.save(data, () => {
      res.send('repo data saved');
    });
  });
});

app.get('/repos', function (req, res) {
  // query database
  db.getTop25((err, data) => {
    err && console.error(err);
    res.send(JSON.stringify(data));
  });
});

app.listen(app.get('port'), function() {
  console.log(`listening on port ${app.get('port')}`);
});

