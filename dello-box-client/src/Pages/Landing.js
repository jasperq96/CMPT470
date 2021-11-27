import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
function Navigationbar(){
  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>Welcome to Dello-Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link as={Link} to={"/login"}>Sign in</Nav.Link>
            <Nav.Link as={Link} to={"/signup"}> Sign up </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigationbar;