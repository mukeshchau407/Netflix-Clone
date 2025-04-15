import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCT-HyXNMeYR9MIcr54y6LxViUEuCxoY-4",
  authDomain: "netflix-clone-f00d9.firebaseapp.com",
  projectId: "netflix-clone-f00d9",
  storageBucket: "netflix-clone-f00d9.firebasestorage.app",
  messagingSenderId: "507400586082",
  appId: "1:507400586082:web:4a25c7aa06a4d3ee38223b",
  measurementId: "G-RK3KZ5NF87"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
