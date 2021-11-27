import React from 'react'
import {Navbar,Container} from 'react-bootstrap'
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
            <h1>
            Signup Page
            </h1>
        </div>
    )
}
