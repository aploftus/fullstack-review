import React from 'react';

const RepoListEntry = ({repo}) => (
  <tr>
    <td><a href={"https://github.com/" + repo.owner + "/" + repo.name}>{repo.name}</a></td>
    <td>{repo.owner}</td>
    <td>{repo.forks}</td>
  </tr>
)

export default RepoListEntry;