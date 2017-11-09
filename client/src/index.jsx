import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    // use jQuery's ajax method to send a POST request to /repos
    // contentType can't be text/plain, or else won't allow a cross origin request
    let server = 'http://localhost:1128/repos';
    $.ajax({
      type: "POST",
      url: server,
      data: JSON.stringify({ term: term }),
      contentType: 'application/json', 
      success: (data) => {
        console.log('success!');
        console.log(data);
      },
      dataType: 'json'
    });
    console.log(`${term} was searched`);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));