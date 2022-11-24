import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './App.css';
import { auth } from './components/Firebase';
import Imessage from './components/Imessage';
import Login from './components/Login';
import { login, logout, SelectUser } from './features/userSlice';

function App() {
  const user=useSelector(SelectUser)
  const dispatch=useDispatch()

useEffect(()=>{
  onAuthStateChanged(auth,authUser=>{
    if(authUser){
      //user is logged in 
      dispatch(login(
        {
          uid:authUser.uid,
          email:authUser.email,
          photo:authUser.photoURL,
          displayName:authUser.displayName
      }))
    }
    else{
      //user is logged out
      dispatch(logout())
    }
  })
  //eslint-disable-next-line
},[])

  return (
    <div className="App">
     {user?<Imessage/>:<Login/>}
    </div>
  );
}

export default App;
