
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import { SelectUser } from '../features/userSlice'
import db, { auth } from './Firebase'
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
function Sidebar() {
const user=useSelector(SelectUser)
const [chats, setChats] = useState([])
useEffect(() => {
    const q=query(collection(db,'chats'))
    onSnapshot(q,snapshot=>{
      const temp=[];
      snapshot.forEach(doc=>{
        temp.push({id:doc.id,data:doc.data()})
    })
      setChats(temp)
    })
}, [])

const addChat=()=>{
  const chatName=prompt("Please enter a Chat Name: ")
  if(chatName.length<5) alert("Please Enter a name with atleast 4 characters :)")
 else{
   addDoc(collection(db,'chats'),{
    chatName:chatName
  })
}
}
  return (
    <div className='sidebar'>
        
        <div className='sidebar_header'>
         <Avatar 
          src={user.photo}
          onClick={()=>auth.signOut()}
          className='sidebar_avatar'/>
         <div className='sidebar_input'>
            <Search/>
            <input placeholder='search'/>

         </div>
         <IconButton variant="outlined" className='sidebar_inputButton'>
                <RateReviewOutlinedIcon onClick={addChat}/>
            </IconButton>

        </div>
        <div className='sidebar_chat'>
        {/* id and data are destructured from "chats" state, and chatName is destructured from data field of chats state */}
          {chats.map(({id,data:{chatName}})=>(
            <SidebarChat key={id} id={id} chatName={chatName}/>
          ))}
      
          
        </div>
    </div>
  )
}

export default Sidebar