import axios from 'axios';
import {loginStart,loginSuccess,loginFailure} from './Redux/userSlice'
import {toast} from 'react-hot-toast'
import { useEffect } from 'react';
import { setMessages } from './Redux/conversationSlice';
import notification from './Sound/mixkit-correct-answer-tone-2870.wav';

//Get Users
export const getUser = async (Token) =>{
    try {
        const res = await axios.get('https://weconnect-backend.onrender.com/api/user/',{headers:{
            Token:Token
        }});
        console.log(res.data);
        const data =  await res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//login
export const login = async (dispatch,user) =>{
    try {

        if(!user.username || !user.password ){
            toast.error("Please fill all the fields");
            return;
        }
        
        dispatch(loginStart());
        
        const res = await axios.post(`https://weconnect-backend.onrender.com/api/auth/Login`,user);
        
        const data = await res.data;
        
        dispatch(loginSuccess(data));
        
    } catch (error) {
        dispatch(loginFailure());
        console.log(error);
        toast.error(error.message);
    }
}

//Register

const handleInputError = ({username,fullname,password,confirmpassword,gender}) => {
    if(!username || !fullname || !password || !confirmpassword || !gender){
        toast.error("Please fill all the fields");
        return false;
    }

    if(password !== confirmpassword){
        toast.error("Password do not match");
        return false;
    }

    return true;
    
}
export const register = async (user) =>{
    try {
        
        const error = handleInputError({...user});
        if(!error) return false;

        const res = await axios.post(`https://weconnect-backend.onrender.com/api/auth/Register`,user);
        const data = await res.data;
        console.log(data);
        return true;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}


//getMessages
export const getMessages = async ({currentUser,selectedConversation}) => {
    try {
      const Token = currentUser.accessToken;
      const res = await axios.get(
        `https://weconnect-backend.onrender.com/api/message/${selectedConversation._id}`,
        {
          headers: {
            Token: Token,
          },
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };


//Listen Message (socket.io).
export const listenMessage = ({dispatch,messages,socket}) => {
    socket?.on('newMessage',(newMessage)=>{
        const sound = new Audio(notification);
        sound.play();
        console.log('in socket',socket.id);
        dispatch(setMessages([...messages,newMessage]))}
    )
};

