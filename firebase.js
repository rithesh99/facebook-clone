import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAFKTokfNEeIaxQZtnYx8p7iGpQaUkQk6I",
    authDomain: "facebook-clone-9e19a.firebaseapp.com",
    projectId: "facebook-clone-9e19a",
    storageBucket: "facebook-clone-9e19a.appspot.com",
    messagingSenderId: "192461593066",
    appId: "1:192461593066:web:955a2595e0e753e3b7fa93"
  };
  
   const app = firebase.apps.length ?  firebase.app() : firebase.initializeApp(firebaseConfig)

  const db = app.firestore();
  const storage = firebase.storage();

  export { db, storage } ;