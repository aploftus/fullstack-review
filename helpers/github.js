const request = require('request');

let getReposByUsername = (username, callback) => {
  console.log('inside git');
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.GITHUB_TOKEN,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request.get(options, (err, response, body) => {
      err && console.error(err);
      console.log('successful get from git');
      // console.log(body);
      let data = JSON.parse(body);
      callback(data);
    });
}

module.exports.getReposByUsername = getReposByUsername;