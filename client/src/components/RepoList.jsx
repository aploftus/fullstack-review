import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    <table>
      <tbody>
        <tr>
          <th>Repo</th>
          <th>Owner</th>
          <th>Forks</th>
        </tr>
        { repos.map((repo, index) => <RepoListEntry repo={repo} key={index} />) }
      </tbody>
    </table>
  </div>
)

export default RepoList;