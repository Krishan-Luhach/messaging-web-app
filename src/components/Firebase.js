// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBmu_QTtolK_rRwnoMtecOYUWlQb21_pPw",
    authDomain: "imessage-97dd2.firebaseapp.com",
    projectId: "imessage-97dd2",
    storageBucket: "imessage-97dd2.appspot.com",
    messagingSenderId: "164944167343",
    appId: "1:164944167343:web:06a8f79f1937233f376f5a",
    measurementId: "G-K4P9XS9BLY"
  }
  const firebaseapp =initializeApp(firebaseConfig)
  const db=getFirestore(firebaseapp)
  const auth=getAuth(firebaseapp)
  const provider=new GoogleAuthProvider()
  export {auth,provider};
  export default db