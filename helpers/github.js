const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {

  let options = {
    url: 'http://api.github.com/repos/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  let onResponse = (error, response, body, callback) => {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      callback(info);
    }
  }

  request(options, onResponse);
}

module.exports.getReposByUsername = getReposByUsername;