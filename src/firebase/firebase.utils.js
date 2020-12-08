// Importing firebase allows us to use firebase when importing the other utilities.
import firebase from 'firebase/app';

// Needed for the database
import 'firebase/firestore';

// Needed for authentication
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC09s1ubwE5EaITLbwYgIG-kkWF4H8YLy4",
  authDomain: "apparel-ecommerce-db.firebaseapp.com",
  databaseURL: "https://apparel-ecommerce-db.firebaseio.com",
  projectId: "apparel-ecommerce-db",
  storageBucket: "apparel-ecommerce-db.appspot.com",
  messagingSenderId: "562261207837",
  appId: "1:562261207837:web:df4eee9b717801306ecff4",
  measurementId: "G-FTGRQ28KZ0"
};

firebase.initializeApp(config);

// auth and firestore are imported from above.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// This always initiates the google popup when using the Google 'provider' above.
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;