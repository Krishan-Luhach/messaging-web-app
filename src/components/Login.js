import React from 'react'
import "./Login.css"
import {Button} from '@material-ui/core'
import {auth,provider} from './Firebase'
import { signInWithPopup } from 'firebase/auth'
function Login() {
  
  const signIn =()=>{
    signInWithPopup(auth,provider)
    .catch(error=>alert(error.message))
  }
  return (
    <div className='login'>
        <div className="login_logo">
            <img
             src='https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png'
             alt='imessage'
             />
             <h1>iMessage</h1>
        </div>
         <Button  onClick={signIn}>
          Sign In with Google</Button>
    </div>
  )
}

export default Login