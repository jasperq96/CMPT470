import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
function Navigationbar(){
  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as={Link} to={"/home"}>Dello-Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/calendar"}>Calendar</Nav.Link>
            <Nav.Link as={Link} to={"/tasks"}>Tasks</Nav.Link>
            <Nav.Link as={Link} to={"/files"}>Files</Nav.Link>
            <Nav.Link as={Link} to={"/contacts"}>Contacts</Nav.Link>
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigationbar;