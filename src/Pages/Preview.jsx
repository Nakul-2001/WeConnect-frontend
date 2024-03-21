import React from 'react';
import { Link } from 'react-router-dom';
import {styled} from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color:blue;
  color:white;
`;

const Features = styled.div`
  margin-top: 40px;
`;

const Feature = styled.div`
  margin-bottom: 10px;
`;

const Preview = () => {
  return (
    <Container>
      <Title>Welcome to our Chat App</Title>
      <Link to='/Login'><Button>Login</Button></Link>
      <Link to='Register'><Button>Register</Button></Link>
      <Features>
        <Feature>Real-time messaging</Feature>
        <Feature>Group chats</Feature>
        <Feature>File sharing</Feature>
        <Feature>Emoji support</Feature>
      </Features>
    </Container>
  );
}

export default Preview;
