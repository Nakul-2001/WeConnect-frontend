import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import ReceiverChat from "../Components/ReceiverChat";
import SenderChat from "../Components/SenderChat";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setMessages } from "../Redux/conversationSlice";
import { getMessages, listenMessage } from "../ApiCalls";
import { IoSendSharp } from "react-icons/io5";

const Right = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  width: 70%;
  height: 100%;
`;

const ReceiverInfo = styled.div`
  background-color: #f0f0f0;
  font-size: 20px;
  color: #4399ff;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Chats = styled.div`
  height: 91%;
  width: 880px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Options = styled.form`
  display: flex;
  align-items: center;
  height: 9%;
  padding: 5px;
  gap:20px;
  background-color: #f0f0f0;
`;

const Input = styled.textarea`
  text-indent:10px;
  width: 93%;
  border-radius: 20px;
  outline: none;
  border: none;
  font-size:20px;
  resize:none;
`;

const Button = styled.button`
  width: 7vh;
  height: 7vh;
  display:flex;
  align-items:center;
  justify-content: center;
  background-color: #4399ff;
  svg{
    color:white;
    font-size:25px;
  }
  border-radius: 50%;
  border: none;
`;

const Messages = () => {

  const {selectedConversation,messages} = useSelector((state) => state.conversations);
  const {socket} = useSelector((state)=>state.sockets);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [sentmessage, setSentmessage] = useState("");
  const [list, setList] = useState([]);
  const lastmessage = useRef();


  useEffect(() => {
    
    if (selectedConversation) {
      const get = async () => {
        const res = await getMessages({currentUser,selectedConversation});
        setList(res);
      }
      get();
    }

    listenMessage({dispatch,messages,socket});

    setTimeout(()=>{
      lastmessage.current?.scrollIntoView({behaviour:"smooth"}); 
    },1000);

    return () => socket?.off("newMessage");

  }, [selectedConversation,sentmessage,socket,messages]);

  const handleClick = (e) => {
    e.preventDefault();

    const sendMessage = async () => {
      try {
        if (!sentmessage) return;
        const Token = currentUser.accessToken;
        const res = await axios.post(
          `http://localhost:3000/api/message/send/${selectedConversation._id}`,
          { message: sentmessage },
          {
            headers: {
              Token: Token,
            },
          }
        );
        dispatch(setMessages([...messages, sentmessage]));
        setSentmessage("");
      } catch (error) {
        console.log(error);
      }
    };
    sendMessage();
  };

  return (
    <Right>
      {!selectedConversation ? (
        <div
          style={{
            fontSize: 20,
            textAlign: "center",
            paddingTop: 10,
            color: "#4399ff",
          }}
        >
          Tap on any chat to start Conversation.
        </div>
      ) : (
        <>
          <ReceiverInfo>
            <b style={{ color: "black" }}>To : </b>{" "}
            {selectedConversation?.fullname}
          </ReceiverInfo>
          <Chats>
            {list.length > 0 ? (
              list.map((mess) =>
                mess.senderId == currentUser._id ? (
                  <div key={mess._id} ref={lastmessage}>
                    <SenderChat user={currentUser} mess={mess} />
                  </div>
                ) : (
                  <div key={mess._id} ref={lastmessage}>
                    <ReceiverChat user={selectedConversation} mess={mess} />
                  </div>
                )
              )
            ) : (
              <div
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  paddingTop: 10,
                  color: "#4399ff",
                }}
              >
                Send message to start conversation.
              </div>
            )}
          </Chats>
          <Options onClick={(e) => {
                handleClick(e);
              }}>
            <Input rows = "1" 
              placeholder="Write Something..."
              value = {sentmessage}
              onChange={(e) => setSentmessage(e.target.value)}
            ></Input>
            <Button>
              <IoSendSharp />
            </Button>
          </Options>
        </>
      )}
    </Right>
  );
};

export default Messages;
