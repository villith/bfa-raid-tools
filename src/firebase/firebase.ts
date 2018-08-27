import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import { firebaseConfig }  from '../env/firebase-config';

const config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  messagingSenderId: firebaseConfig.messagingSenderId,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);

export { firebase, db, auth, ui };
