import {  createSlice } from '@reduxjs/toolkit';


const initialState = {
  chatId:null,
  chatName:null
};


export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state,action) => {
     state.chatId =action.payload.chatId
     state.chatName=action.payload.chatName
    }
  }
  })

export const { setChat } = chatSlice.actions;

export const SelectChatId=(state)=>state.chat.chatId;
export const SelectChatName=(state)=>state.chat.chatName;

export default chatSlice.reducer;
