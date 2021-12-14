import '../App.css';
import React, { useState, useContext } from 'react';
import { Navbar, Container, Form, Button, Col, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import { toast } from 'react-toastify';
import authenticationService from '../services/authenticationService';
import { Link } from 'react-router-dom';

const Login = () => {
  let history = useHistory();
  let userContext = useContext(UserContext);
  const [values, setValue] = useState({
    username: '',
    password: ''
  });

  const attemptLogin = async (loginUser) => {
    const data = await authenticationService.login(loginUser);
    const { isAuthenticated } = data;
    if (isAuthenticated) {
      userContext.setUser(data.user);
      userContext.setIsAuthenticated(isAuthenticated);
      history.push('/home');
      toast.success(`Successfully logged in as ${data.user.username}!`);
    } else {
      toast.error('Invalid login credentials!');
    }
  };

  const handleChange = (evt) => {
    setValue({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = {
      username: values.username,
      password: values.password
    };
    attemptLogin(user);
  };

  return (
    <div className="body-color">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Dello-Box Sign In</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to={'/'}>
                Landing Page
              </Nav.Link>
            </Nav>
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
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default Login;
