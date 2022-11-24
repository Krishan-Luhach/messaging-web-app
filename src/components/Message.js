import { Avatar } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { SelectUser } from '../features/userSlice'
import './Message.css'
const Message=forwardRef(({id,contents:{
  timestamp,photo,email,displayName,message
}},ref) =>
{
  const user=useSelector(SelectUser)
  return (
    <div ref={ref} className={`message ${user.email===email&&'message_sender'}`}>
      <div className='display_name'>
      {user.email!==email&&<p>{displayName.length>8? displayName.substr(0,8)+"...":displayName}</p>}
      </div>
        <Avatar className='message_photo' src={photo}/>
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
    </div>
  )
})

export default Message