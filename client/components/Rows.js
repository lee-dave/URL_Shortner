import React from 'react';

const Rows = ({ longurl, shorturl, clicks, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td><a href={longurl}>{longurl}</a></td>
      <td><a href={shorturl}>{shorturl}</a></td>
      <td>{clicks}</td>
    </tr>
  )
}

export default Rows
