// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDohE_hcqR_szk-14sblUBAhtzHiIpQ3lA",
    authDomain: "clone-ac1a2.firebaseapp.com",
    projectId: "clone-ac1a2",
    storageBucket: "clone-ac1a2.appspot.com",
    messagingSenderId: "42558791704",
    appId: "1:42558791704:web:18469e7c17e3cbe924e36d",
    measurementId: "G-63772JMZW8"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { db, auth};