interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
}

const firebaseConfig: IFirebaseConfig = {
  "apiKey": "AIzaSyAEriQFaLDbLuyhz0chlMeLQREMM0mLaJk",
  "authDomain": "bfa-raid-tools.firebaseapp.com",
  "databaseURL": "https://bfa-raid-tools.firebaseio.com",
  "messagingSenderId": "836078052823",
  "projectId": "bfa-raid-tools",
  "storageBucket": "bfa-raid-tools.appspot.com"
};

export { firebaseConfig };
