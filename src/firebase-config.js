import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCT-HyXNMeYR9MIcr54y6LxViUEuCxoY-4",
  authDomain: "netflix-clone-f00d9.firebaseapp.com",
  projectId: "netflix-clone-f00d9",
  storageBucket: "netflix-clone-f00d9.firebasestorage.app",
  messagingSenderId: "507400586082",
  appId: "1:507400586082:web:94c7f6fa1cee449438223b",
  measurementId: "G-G4PPYS96DW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login = async(email, password) => {
  try{
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};