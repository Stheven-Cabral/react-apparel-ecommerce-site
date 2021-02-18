// Importing firebase allows us to use firebase when importing the other utilities such as firestore and auth.
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

// createUserProfileDocument will be used in storing user in our firestore database as opposed to authentication database created when you 'sign in with google'.
// createUserProfileDocument is not a firebase method.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log(userAuth)
  // if user is null return nothing.
  if (!userAuth) return;

  // A reference is a pointer to the requested object or collection.
  const userRef = (firestore.doc(`users/${userAuth.uid}`));
  console.log(userRef)
  // You have have to use useRef to get a snapshot of the user in order to perform 'get'.
  const snapShot = await userRef.get();
  console.log(snapShot)

  // exists is a property on a snapshot that lets us know if a snapshot object exists.
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        // passing in any additional data as an object to userAuth
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  // We still might need the userRef for something so we need to return it. 
  return userRef;
}

// Initializes firebase.
firebase.initializeApp(config);

// auth and firestore are imported from above.
// Exporting firebase auth in order to use it in other files related to authentication.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// This always initiates the google popup when using the Google 'provider' above.
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
// You're firebase project needs to be setup in your firebase console to allow for google sign in.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;