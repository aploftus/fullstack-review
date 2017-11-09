const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true,
});

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  forks: Number,
  owner_id: Number,
  owner: String
});

// can add methods onto the schema model instances, but
// must do this before compiling below

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // This function should save a repo or repos to the MongoDB
  for (var i = 0; i < repos.length; i++) {
    let repo = repos[i];
    let repoEntry = new Repo({ id: repo.id });
    let params = {
      name: repo.name,
      forks: repo.forks,
      owner_id: repo.owner.id,
      owner: repo.owner.login
    };

    // upsert allows us to create a record if one doesn't already exist
    Repo.findOneAndUpdate({id: repoEntry.id}, params, { upsert: true }, (err, doc) => {
      err && console.error('sorry, insert/update unsuccessful');
      console.log('repoEntry ', repo.name, ' has been saved');
    });
    
  }
}

module.exports.save = save;