import * as firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCEKKlA_anwFN_r7URH4Yl4WrGIm2KBK7w",
    authDomain: "myschedularreact.firebaseapp.com",
    databaseURL: "https://myschedularreact.firebaseio.com",
    projectId: "myschedularreact",
    storageBucket: "myschedularreact.appspot.com",
    messagingSenderId: "484768212354",
    appId: "1:484768212354:web:f6ee1bb3e2c71baee05b9b"
  };
  var app = firebase.initializeApp(firebaseConfig);
  export const aut =  app.auth();
  export const data = app.firestore();
  
