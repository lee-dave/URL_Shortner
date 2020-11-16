import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Rows from './Rows'

const Tables = () => {
  const [rowsArray, setRowsArray] = useState([])

  useEffect(() => {
    fetch('/getAll')
      .then(res => res.json())
      .then(data => {
        setRowsArray(data.allUrls.map((obj, index) => {
          return <Rows key={obj._id} index={index} {...obj} />
        }))
      })
  }, [])

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Long URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {rowsArray}
      </tbody>
    </Table>
  )
}

export default Tables
