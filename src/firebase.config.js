import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCoYjxB0ty0QwlCqkIiRbvbpPm7uT4_APo",
    authDomain: "serverlessproject-25849.firebaseapp.com",
    projectId: "serverlessproject-25849",
    storageBucket: "serverlessproject-25849.appspot.com",
    messagingSenderId: "605803401834",
    appId: "1:605803401834:web:08b913802057d27acd3013",
    measurementId: "G-XEDZ7TSMWG"
  };
  

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export default db;

