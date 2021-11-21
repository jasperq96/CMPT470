import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
function Navigationbar(){
  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Dello-Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/Calendar"} href>Calendar</Nav.Link>
            <Nav.Link as={Link} to={"/Tasks"} href>Tasks</Nav.Link>
            <Nav.Link as={Link} to={"/Files"}>Files</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to={"/Account"}>Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigationbar;