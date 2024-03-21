import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        socket:null,
        onlineUser:[],
    },
    reducers:{
        setSocket:(state,actions)=>{
            state.socket = actions.payload;
        },
        setOnlineUser:(state,actions)=>{
            state.onlineUser = actions.payload;
        }
    }
});

export const {setSocket,setOnlineUser} = socketSlice.actions;
export default socketSlice.reducer;