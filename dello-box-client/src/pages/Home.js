import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import '../stylesheets/home.css';
import { Container } from 'react-bootstrap';

export default function Home() {
  const userContext = useContext(UserContext);

  return (
    <Container fluids>
      <p id='head1' class='header'>Welcome Back</p>
      <p id='head2' class='header'>{userContext.user?.username}</p>
      <p id='head3' class='header'>Dello-box of {userContext.user?.username}</p>
      <div class='light x1'></div>
      <div class='light x2'></div>
      <div class='light x3'></div>
      <div class='light x4'></div>
      <div class='light x5'></div>
      <div class='light x6'></div>
      <div class='light x7'></div>
      <div class='light x8'></div>
      <div class='light x9'></div>
    </Container>
  );
}
