import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/userSlice";
import SideBar from "../Components/SideBar";
import Messages from "../Components/Messages";
import { setOnlineUser, setSocket } from "../Redux/socketSlice";
import {io} from 'socket.io-client'
import { setConversations, setMessages } from "../Redux/conversationSlice";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.div`
  background-color: #f0f0f0;
  height: 8%;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: 800;
  padding: 5px;
  color: #4399ff;
`;

const Data = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Photo = styled.img`
  border: 1px solid #4399ff;
  border-radius: 50%;
  margin: 5px;
  height: 35px;
  width: 35px;
`;

const Name = styled.div`
  color: #4399ff;
  margin: 5px;
  font-size: 20px;
  padding: 7px 2px 7px 2px;
`;

const Logout = styled.button`
  margin: 5px;
  padding: auto;
  height: 35px;
  width: 35px;
  svg {
    margin: 2px;
    font-size: 30px;
    color: #4399ff;
  }
  cursor: pointer;
  border:none;
`;

const Body = styled.div`
  display: flex;
  height:92%;
`;


function Home() {

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(currentUser){
      const socket = io('https://weconnect-backend.onrender.com/',{
        query:{
          userId:currentUser._id,
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers',(users)=>{
          dispatch(setOnlineUser(users));
      })

      return () => socket.close();
    }
    else{
        if(socket){
          socket.close();
          setSocket(null);
        }
    }
  },[currentUser])
  
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(setConversations(null));
    dispatch(setMessages([]));
  }

  return (
  <Container>
        <Header>
          <Logo>Chat App</Logo>
          <Data>
            <Photo src={currentUser.profilepic}></Photo>
            <Name>{currentUser.fullname}</Name>
            <Logout onClick={(e)=>{handleClick(e)}}>
              <FiLogOut/>
            </Logout>
          </Data>
        </Header>
        <Body>
          <SideBar/>
          <Messages/>
        </Body>
      </Container>
    )
}

export default Home;
