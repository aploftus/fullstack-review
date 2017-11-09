const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const db = require('../database/index.js');

const bodyParser = require('body-parser');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

// parse incoming requests to collect search term from request data
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  //in this route, you'll use your getReposByUsername function
  // to fetch the specified user's Github repos, then use your
  // save function to store the repo information in database.

  // req.body gets parsed using bodyParser
  let user = req.body.term;
  getReposByUsername(user, db.save)

  res.send('search term received');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

