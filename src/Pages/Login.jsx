import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../ApiCalls';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  background-color: #c7c1c1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
  width: 92%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 97%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Move = styled.div`
  margin-bottom:5px;
  a{
    color:black;
    text-decoration:none;
  }
  &:hover {
    a{
      color: #0056b3;
    }
  }
`


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {currentUser,isFetching} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    // Handle login logic here
    login(dispatch,{username,password});
  };

  return (
    <LoginPageContainer>
      <LoginForm >
        <h2 style={{marginBottom:10}}>Login</h2>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Move><Link to='/Register'>Don't have an account</Link></Move>
        <Button onClick={handleClick} disabled={isFetching}>LOG IN</Button>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default Login;
