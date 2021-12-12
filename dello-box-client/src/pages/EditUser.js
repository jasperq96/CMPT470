import React, { useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const dummy_data = {
  user_id: 1,
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'janedoe@gmail.com',
  phone: '604-123-4567'
};

export default function EditUser() {
  const [values, setValue] = useState({
    user_id: 1,
    first_name: dummy_data.first_name,
    last_name: dummy_data.last_name,
    email: dummy_data.email,
    phone: dummy_data.phone
  });
  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
    {
      console.log(evt.target.value);
    }
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`these are the entered values ${values.first_name}
    ${values.last_name}
    ${values.email}
    ${values.phone}`);
  };

  return (
    <Container fluid>
      <h1 className="WhiteHeaders">Creating a Task</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="WhiteHeaders">First Name</Form.Label>
            <Form.Control type="Name" placeholder="First Day of The Task" name="first_name" value={values.first_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="WhiteHeaders">Last Name</Form.Label>
            <Form.Control type="Name" placeholder="Time of Event" name="last_name" value={values.last_name} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Email</Form.Label>
          <Form.Control type="Email" placeholder="Task Title" name="email" value={values.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="WhiteHeaders">Phone</Form.Label>
          <Form.Control type="PhoneNumber" placeholder="Task Notes" name="phone" value={values.phone} onChange={handleChange} />
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)}>Change user Info</Button>
      </Form>
    </Container>
  );
}
