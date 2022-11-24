import { Avatar } from '@material-ui/core'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useState,useEffect } from 'react'
import db from './Firebase'
import { useDispatch } from 'react-redux'
import { setChat } from '../features/chatSlice'
import './SidebarChat.css'
import moment from 'moment'
function SidebarChat({id,chatName}) {
  const dispatch=useDispatch()
  const [chatinfo, setchatinfo] = useState([])

useEffect(() => {
  const chatRef=doc(db,'chats',id)
  const q=query(collection(chatRef,'messages'),orderBy("timestamp","desc"))
  onSnapshot(q,snapshot=>{
    const info=[]
    snapshot.forEach(doc=>(
      info.push(doc.data())
    ))
    setchatinfo(info)
  })
//eslint-disable-next-line
}, [])


  return (
    <div onClick={()=>{
      dispatch(setChat({
        chatId:id,
        chatName:chatName
      }))
    }}
    className='sidebarChat'>
        <Avatar src={chatinfo[0]?.photo}/>
        <div className='sidebarChat_info'>
            <h3>{chatName}</h3>
            <p>{chatinfo[0]?.message}</p>
            <small>{moment(new Date(chatinfo[0]?.timestamp?.toDate())).fromNow()}</small>
        </div>

    </div>
  )
}

export default SidebarChat