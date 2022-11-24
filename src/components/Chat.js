import { IconButton } from '@material-ui/core';
import { MicNone } from '@material-ui/icons';
import {  addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import db from './Firebase'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { SelectChatId, SelectChatName } from '../features/chatSlice';
import './Chat.css'
import Message from './Message';
import { SelectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move'
function Chat() {
  const user=useSelector(SelectUser)

  const [input, setInput] = useState("")
 const chatName=useSelector(SelectChatName)
 const chatId=useSelector(SelectChatId)
 const [messages, setMessages] = useState([])
 const bottomRef=useRef(null)
 useEffect(()=>{
   if(chatId){
    const chatRef=doc(db,'chats',chatId)
   
   const q=query(collection(chatRef,"messages"),orderBy("timestamp","asc"))
   onSnapshot(q,snapshot=>{
    const chats=[]
    snapshot.forEach(doc=>(
      chats.push({id:doc.id,data:doc.data()})
    ))
    setMessages(chats)
   })
   }
 },[chatId])



 useEffect(() => {
  // 👇️ scroll to bottom every time messages change
  bottomRef.current?.scrollIntoView({behavior: 'smooth'});
}, [messages]);

  const sendMessage=e=>{
    e.preventDefault();

    const chatRef=doc(db,'chats',chatId)
   addDoc(collection(chatRef,'messages'),{
    timestamp:serverTimestamp(),
    message:input,
    uid:user.uid,
    photo:user.photo,
    email:user.email,
    displayName:user.displayName

   })


    setInput("")
  }
  return (
    <div className='chat'>
   <div className="chat_header">
    <h4>To: <span className='channel_name'>{chatName}</span></h4>
    <strong>Details</strong>
   </div>
    {/* Chat messages */}
    
   <div className="chat_messages">
    <FlipMove>
    {messages.map(({id,data})=>(
      <Message key={id} contents={data}/>
    ))}
    </FlipMove>
   <div ref={bottomRef}/>
   </div>

    <div className="chat_input">
    <form>
      <input 
      type='text'
      value={input}
      onChange={e=>setInput(e.target.value)}
      placeholder='enter message' />
      <button onClick={sendMessage}>Send Message</button>
    </form>

    <IconButton>
      <MicNone className='chat_mic'/>
    </IconButton>
    </div>
    </div>
  )
}

export default Chat