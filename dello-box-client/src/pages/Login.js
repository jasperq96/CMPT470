import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Login() {
  const [values, setValue] = useState({
    username: '',
    password: ''
  });
  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`submitted values are ${values.username}
        ${values.password}`);
  };
  return (
    <div>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Dello-Box Sign In</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Container>
        <Col xs>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="Username" placeholder="Enter Username" name="username" value={values.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log in
            </Button>
            <Link to="/inprogress">
              <Button variant="primary" type="Log In">
                Redirect
              </Button>
            </Link>
          </Form>
        </Col>
      </Container>
    </div>
  );
}
