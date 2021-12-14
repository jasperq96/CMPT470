import '../App.css';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/landing.css';

const Navigationbar = () => {
  return (
    <Container fluid className="carousel">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Welcome to Dello-Box</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={Link} to={'/login'}>
                Sign in
              </Nav.Link>
              <Nav.Link as={Link} to={'/signup'}>
                Sign up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Carousel indicators={false}>
        <Carousel.Item>
          <img className="d-block w-100" src="https://pt-static.z-dn.net/files/d14/f0517e80cc1fe426a2d7767047986b02.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>What is Dello-box?</h3>
            <p>Inpisred by Trello and Dropbox, Dello-Box is a centralized application that combines unique functionalities found in both aforementioned applications</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="https://www.microtool.de/wp-content/uploads/2018/11/board-f%C3%BCr-alle-zust%C3%A4nde.png" alt="Second slide" />

          <Carousel.Caption>
            <h3>Task Board</h3>
            <p>
              Our task board (DelloBoard) puts the simple in simplistic. With the task name, notes, start date and end date displayed, users have an easier time locating their desired task. If needed
              they can click on the desired task to edit any information related to it.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2020/06/08/dropbox-dark-hero.png?q=50&fit=contain&w=1500&h=&dpr=1.5" alt="Third slide" />

          <Carousel.Caption>
            <h3>Dropbox?</h3>
            <p>
              Similar to Dropbox, users can upload files of many types. They can also view all publicly-visible files that other users have uploaded. Don't worry, by default, users upload private
              files, so no accidental pictures to the world.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="https://wallpapercave.com/wp/wp8938645.jpg" alt="Third slide" />

          <Carousel.Caption>
            <h3>Make Contacts!</h3>
            <p>Like what others upload? Have a group member forget to attach a needed file for a task? Add them as a contact...</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src="https://www.ppt-backgrounds.net/thumbs/black-coming-soon-text-download-presentation-backgrounds.jpg" alt="Third slide" />

          <Carousel.Caption>
            <h3>Did we miss something?</h3>
            <p>Let us know if we missed any features or have any suggestions to improve our web-application!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Navigationbar;
