import React from 'react'
import {Navbar,Container,Form,Button, Col, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Signup() {
    return (
        <div>
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand>Dello-Box Sign Up</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
                </Container>
            </Navbar>
            </div>
            <Container>
                <Col xs>
                    <Form>
                        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="Username" placeholder="Enter Username" />
                        </Form.Group>
                        <Row>
                        <Form.Group as={Col} md="6" className="position-relative mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="FirstName" placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="position-relative mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="LastName" placeholder="Enter Last Name"/>
                        </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="PhoneNumber" placeholder="Enter Phone Number"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="Email" placeholder="Enter Email"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Link to ="/inprogress">
                        <Button variant="primary" type="submit" >
                            Sign Up
                        </Button>
                        </Link>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}
