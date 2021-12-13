import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navigationbar() {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const onClickLogOutHandler = async () => {
    await userContext.logout();
    toast.success('Successfully logged out!');
    history.push('/');
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={'/home'}>
            Dello-Box
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/calendar'}>
                Calendar
              </Nav.Link>
              <NavDropdown title="Tasks" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={'/tasks/dello'}>
                  Board
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/tasks/create_tasks'}>
                  Create a Task/Column
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Files" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={'/files/upload'}>
                  Upload A File
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/files/manage'}>
                  Manage Your Files
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/files/view'}>
                  View Files
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to={'/contacts'}>
                Contacts
              </Nav.Link>
            </Nav>
            <Nav className="float-right">
              <NavDropdown title={userContext.user?.username} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={'/user-info'}>
                  User Information
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} onClick={onClickLogOutHandler}>
                Sign Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
