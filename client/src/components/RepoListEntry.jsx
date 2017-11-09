import React from 'react';

const RepoListEntry = ({repo}) => (
  <tr>
    <td>{repo.name}</td>
    <td>{repo.owner}</td>
    <td>{repo.forks}</td>
  </tr>
)

export default RepoListEntry;