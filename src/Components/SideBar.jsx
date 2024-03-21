import React from "react";
import { styled } from "styled-components";
import { CiSearch } from "react-icons/ci";
import PersonInfo from "../Components/PersonInfo";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect} from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { getUser } from "../ApiCalls";
import { setConversations } from '../Redux/conversationSlice';

const Left = styled.div`
  width: 30%;
  height: 100%;
  background-color: #f0f0f0;
`;

const Heading = styled.div`
  font-size: 25px;
  font-weight: 550;
  padding-left: 5px;
  height: 6%;
`;

const SearchBox = styled.form`
  display: flex;
  gap:10px;
  padding: 10px;
  height: 6%;
`;

const SearchFeild = styled.input`
  width: 300px;
  color: black;
  outline: none;
  border-radius: 5px;
  border:1px solid blue;
  padding: 5px;
  font-size: 15px;
`;

const SearchIcon = styled.button`
  padding: auto;
  width:35px;
  svg {
    font-size: 25px;
    color:white;
  }
  border: 1px solid blue;
  border-radius:50%;
  background-color: #4399ff;
  cursor: pointer;
`;

const List = styled.div`
  height: 480px;
  width: 370px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SideBar = () => {
  const [list, setList] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [search,setSearch] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) return toast.error('Name must be at least 3 characters long!');

    const res =  await getUser(currentUser.accessToken);
    console.log(res);
    const conversation = res.find((r) => r.fullname.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      dispatch(setConversations(conversation));
      setSearch('');
    }
    else{
      toast.error('No such user found');
    }
  }


  useEffect(() => {
    const getUser = async () => {
      const Token = currentUser.accessToken;
      const res = await axios.get("https://weconnect-backend.onrender.com/api/user/", {
        headers: {
          Token: Token,
        },
      });
      const data = await res.data;
      console.log(data);
      setList(data);
    };
    currentUser && getUser();
  }, []);

  return (
    <Left>
      <SearchBox onClick={(e)=>{handleClick(e)}}>
        <SearchFeild placeholder="Search ..." value={search} onChange={(e)=>(setSearch(e.target.value))}></SearchFeild>
        <SearchIcon>
          <CiSearch />
        </SearchIcon>
      </SearchBox>
      <Heading>Recent Chats</Heading>
      <List>
        {list.map((person) => (
          <PersonInfo person={person} key={person._id}></PersonInfo>
        ))}
      </List>
    </Left>
  );
};

export default SideBar;
