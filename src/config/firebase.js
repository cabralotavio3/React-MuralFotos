// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA33Eiei_q1wk_MW-b5HsQGhzDJ97ZcGOo",
  authDomain: "applivroscefet.firebaseapp.com",
  projectId: "applivroscefet",
  storageBucket: "applivroscefet.firebasestorage.app",
  messagingSenderId: "934059508400",
  appId: "1:934059508400:web:2d293eb3dc765460577175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};