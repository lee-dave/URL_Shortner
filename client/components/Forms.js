import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const Forms = () => {

  return (
    <Form
      action='/longUrls'
      method='POST'
      className='my-4 form-inline'
    >
      <Form.Control
        className="form-control col mr-2"
        placeholder="Enter Url"
        name='longUrls'
      />
      <Button type="submit" size='md'>
        Submit
      </Button>
    </Form>
  )
}

export default Forms
