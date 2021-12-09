import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import httpService from '../../services/httpService';
import { toast } from 'react-toastify';
import initialSignup from './initialSignup.json';
import { createUserObject } from '../../models/userModel';
import { capitalize, decapitalize } from '../../utils/capitalizeString';

const Signup = () => {
  let history = useHistory();
  const [values, setValue] = useState(initialSignup);

  const createUser = async (newUser) => {
    const url = `/user`;
    httpService
      .post(url, newUser)
      .then(() => {
        toast.success('Successfully created a new user with username!');
        history.push('/login');
      })
      .catch((error) => {
        // Will display the first input error message
        const errorBody = error.response.data.errors[0];
        toast.error(capitalize(errorBody.param).concat(' ').concat(decapitalize(errorBody.msg)));
      });
  };

  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createUser(createUserObject(values));
  };

  return (
    <div>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Dello-Box Sign Up</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Container>
        <Col xs>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-5" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter Username" name="username" value={values.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
            </Form.Group>
            <Row>
              <Form.Group as={Col} md="6" className="position-relative mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="FirstName" placeholder="Enter First Name" name="firstname" value={values.firstname} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} md="6" className="position-relative mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="LastName" placeholder="Enter Last Name" name="lastname" value={values.lastname} onChange={handleChange} />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="Email" placeholder="Enter Email" name="email" value={values.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="PhoneNumber" placeholder="Enter Phone Number" name="phonenumber" value={values.phonenumber} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default Signup;
