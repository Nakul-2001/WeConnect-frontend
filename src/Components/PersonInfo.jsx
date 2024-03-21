import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConversations, setMessages } from "../Redux/conversationSlice";

const Container = styled.div`
  height: 60px;
  display: flex;
  margin: 8px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const Photo = styled.img`
  margin: 5px 10px 5px 15px;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  border: 2px solid black;
`;

const Fullname = styled.div`
  color: #4399ff;
  font-weight: bold;
  font-size: 20px;
  padding-left: 5px;
  padding-top: 15px;
`;

function PersonInfo({ person }) {
  const { selectedConversation, messages } = useSelector(
    (state) => state.conversations
  );
  const dispatch = useDispatch();
  const isSelected = selectedConversation?._id == person._id;

  const { onlineUser } = useSelector((state)=>state.sockets);
  const isOnline = onlineUser.includes(person._id);

  const handleClick = () => {
    dispatch(setConversations(person));
  };

  return (
    <Container
      style={{backgroundColor: isSelected ? "white" : "#f0f0f0"}}
      onClick={() => {
        handleClick();
      }}
    >
      <Photo src={person.profilepic} style={{borderColor: isOnline ? "green" : "black"}}></Photo>
      <Fullname>{person.fullname}</Fullname>
    </Container>
  );
}

export default PersonInfo;
