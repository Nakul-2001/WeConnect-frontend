import React, { useState } from 'react';
import styled from 'styled-components';
import { register } from '../ApiCalls';
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #c7c1c1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 90%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 98%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
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

const Register = () => {

  const [isregister,setRegister] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register({username,fullname,password,confirmpassword,gender});
    console.log(res);
    res && setRegister(true);
  };

  return (
    <>
    {isregister ? navigate('/login') : <><Container>
      <Form onSubmit={handleSubmit}>
        <h2 style={{marginBottom:10}}>Register</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <Move><Link to='/login'>Already have an account?</Link></Move>
        <Button type="submit" >Register</Button>
      </Form>
    </Container></>}
    </>
  );
};

export default Register;

