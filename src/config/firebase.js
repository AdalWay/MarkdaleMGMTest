import firebase from "firebase";
import firestore from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCcE4XrqNf4qLEZuVeQC9XkrGUkQsTm2hs",
  authDomain: "markdale-94dac.firebaseapp.com",
  databaseURL: "https://markdale-94dac.firebaseio.com",
  projectId: "markdale-94dac",
  storageBucket: "markdale-94dac.appspot.com",
  messagingSenderId: "614964836965"
};
firebase.initializeApp(config);

const firedb = firebase.firestore();

export default firedb;
