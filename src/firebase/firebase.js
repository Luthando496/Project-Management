import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {

  apiKey: "AIzaSyD9BOETLolf_i-HdAXI9HLzdBhAO0rjyGc",

  authDomain: "projectdojo-f4f5c.firebaseapp.com",

  projectId: "projectdojo-f4f5c",

  storageBucket: "projectdojo-f4f5c.appspot.com",

  messagingSenderId: "653900365057",

  appId: "1:653900365057:web:10b79148751f259dc3ef00"

};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
 
const auth = getAuth()


export {auth,db,app,storage}