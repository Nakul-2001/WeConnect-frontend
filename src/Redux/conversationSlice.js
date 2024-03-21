import {createSlice} from '@reduxjs/toolkit'

const conversationSlice = createSlice({
    name:'conversation',
    initialState:{
        selectedConversation:null,
        messages:[],
    },
    reducers:{
        setConversations:(state,action)=>{
            state.selectedConversation = action.payload;
        },
        setMessages:(state,action)=>{
            state.messages = action.payload;
        }
    }
});

export const {setConversations,setMessages} = conversationSlice.actions;

export default conversationSlice.reducer;