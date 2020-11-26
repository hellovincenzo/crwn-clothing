import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDJonIGWU6leg6wcsbVGL2PtATlKVuFC30',
  authDomain: 'crwn-db-fdb8a.firebaseapp.com',
  databaseURL: 'https://crwn-db-fdb8a.firebaseio.com',
  projectId: 'crwn-db-fdb8a',
  storageBucket: 'crwn-db-fdb8a.appspot.com',
  messagingSenderId: '281118136252',
  appId: '1:281118136252:web:5e272a8040f14a337e3db9',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log('Error creating user', e.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;