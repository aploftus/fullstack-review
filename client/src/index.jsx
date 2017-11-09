import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      server: 'http://localhost:1128/repos'
    }
  }

  componentDidMount() {
    this.retrieveTop25.call(this);
  }

  retrieveTop25() {
    $.ajax({
      type: 'GET',
      url: this.state.server,
      dataType: 'json',
      success: (data) => {
        this.setState({
          repos: data
        });
      },
      error: (error) => {
        console.error('yo, unable to get');
      }
    });
  }

  search(term) {
    // use jQuery's ajax method to send a POST request to /repos
    // contentType can't be text/plain, or else won't allow a cross origin request
    $.ajax({
      type: 'POST',
      url: this.state.server,
      data: JSON.stringify({ term: term }),
      contentType: 'application/json',
      // don't specify the wrong dataType for the return data. If you do,
      // your success function won't run.
      success: (data) => { 
        console.log('RESPONSE DATA ', data);
        this.retrieveTop25.call(this);
      }
    });
    console.log(`${term} was searched`);
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));