// Change file name to firebase.js and edit the values in config to match your firebase database.

import firebase from 'firebase/app';
import 'firebase/database';
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
export default firebase;