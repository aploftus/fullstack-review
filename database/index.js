const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

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
    let repoEntry = new Repo({
      id: repo.id,
      name: repo.name,
      forks: repo.forks,
      owner_id: repo.owner.id,
      owner: repo.owner.login
    });

    // document-save returns a promise
    repoEntry.save((err, repoEntry) => {
      // if the record already exists
      if (err) {
        // update the record rather than drop it
        throw repoEntry;
      }
      console.log('repoEntry ', repoEntry.name, ' has been saved');
    })
    .catch(({id, name, forks, owner_id, owner}) => {
      let newParams = {
        name: name,
        forks: forks,
        owner_id: owner_id,
        owner: owner
      };
      // when we update, we update the "table", right?
      Repo.update({id: id}, newParams, (err, raw) => {
        if (err) {
          console.error('unable to update repo record');
        }
        console.log('raw response from mongo is ', raw);
      })
    })
  }
}

module.exports.save = save;