import * as firebase from 'firebase';

import { BossAbility } from '../classes/BossAbility';
import { Cooldown } from '../classes/Cooldown';
import { Phase } from '../classes/Phase';
import { Strategy } from '../classes/Strategy';
import { IAppState, IPreferences } from '../components/App/App';
import { auth, db } from './firebase';

const createUser = (id: string) => {
  const ref = db.ref(`users/${id}`);
  ref.push();
};

const updateState = (id: string, state: IAppState) => {
  const ref = db.ref(`users/${id}`);
  ref.push(state);
};

const getState = (id: string) => {
  const ref = db.ref(`users/${id}`);
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot: any) => {
      resolve(snapshot.val());
    });
  });
};

const saveUpdatedStrategy = (strategy: Strategy) => {
  const { id, title, description, bosses, players, users } = strategy;
  const newStrategy = new Strategy(id, title, description, bosses, players, users);
  localStorage.setItem('currentStrategy', JSON.stringify(newStrategy));
  const ref = db.ref(`strategies`);
  console.log(newStrategy);
  ref.child(id!).set(newStrategy);
}

const handleSignUp = (email: string, password: string) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

const handleSignIn = (email: string, password: string) => {
  auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    });
}

const saveUser = (user: firebase.User, callback: () => void) => {
  const ref = db.ref(`users/${user.uid}`);
  ref.set({
    uid: user.uid,
    displayName: user.displayName || 'Anonymous',
    email: user.email,
    profilePicture: user.photoURL,
    preferences: {
      darkMode: false,
      favourites: ['']      
    }
  }).then(callback);
};

const getUserStrategies = (uid: string) => {
  const ref = db.ref(`strategies`);
  ref.orderByChild('users').equalTo(uid);
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot: any) => {
      const values = snapshot.val();
      if (values) {
        const strategies: Strategy[] = Object.keys(values).map(key => values[key]);
        strategies.map(strategy => {
          Object.keys(strategy.bosses).map(bossKey => {
            const boss = strategy.bosses[parseInt(bossKey, 10)];

            // Reinstantiate empty boss arrays
            if (!boss.cooldowns) { boss.cooldowns = [] as Cooldown[] }
            boss.cooldowns.map(cooldown => {
              if (!cooldown.bossAbilities) { cooldown.bossAbilities = [] as string[] }
              if (!cooldown.timers) { cooldown.timers = [] as number[] }
            });

            if (!boss.abilities) { boss.abilities = [] as BossAbility[] }
            if (!boss.phases) { boss.phases = [] as Phase[] }

            return boss;
          });
          Object.keys(strategy.players).map(playerKey => {
            const player = strategy.players[parseInt(playerKey, 10)];
            player.cooldowns.map(cooldown => {
              if (!cooldown.bossAbilities) { cooldown.bossAbilities = [] as string[] }
              if (!cooldown.timers) { cooldown.timers = [] as number[] }
            });
            return player;
          })
          return strategy;
        });
        resolve(strategies);
      }
      else {
        reject('No strategies available for user.');
      }
    });
  });
}

const getUserPreferences = (uid: string) => {
  const ref = db.ref(`users/${uid}`);
  ref.child('preferences')
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot: any) => {
      const values = snapshot.val();
      if (values) {
        resolve(values);
      }
      else {
        reject('Could not find any user preferences');
      }
    });
  });
}

const updateUserPreferences = (userId: string, preferences: IPreferences) => {
  const ref = db.ref(`users/${userId}`);
  return ref.child('preferences').set(preferences);
}

// const handleSignUpSuccess = (data: any) => {
//   const newAuthData = {
//     token: data.idToken,
//     userId: data.localId,
//     error: null,
//     loading: false
//   };
//   this.storeUserToken(data);
//   this.setState({ authData: newAuthData });
// }

// const handleSignUpError = (err: any) => {
//   const newAuthData = {
//     token: null,
//     userId: null,
//     error: err,
//     loading: false
//   };
//   return newAuthData;
// }

// const storeUserToken = (data: any) => {
//   const expirationDate = new Date().getTime() + data.expiresIn * 1000;
//   localStorage.setItem('token', data.idToken);
//   localStorage.setItem('expirationDate', expirationDate.toString());
//   localStorage.setItem('userId', data.localId);
// }

// const deleteUserToken = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('expirationDate');
//   localStorage.removeItem('userId');
// }

// const handleSignIn = (email: string, password: string) => {
//   const authData = {
//     email,
//     password,
//     returnSecureToken: true
//   };
//   axios.post(`${apiBase}verifyPassword?key=AIzaSyAEriQFaLDbLuyhz0chlMeLQREMM0mLaJk`, authData)
//     .then(resp => {
//       this.handleSignInSuccess(resp.data);
//     })
//     .catch(err => {
//       this.handleSignInError(err);
//     });
// }

// const handleSignOut = () => {
//   const newAuthData = {
//     token: null,
//     userId: null,
//     error: null,
//     loading: false
//   };
//   this.deleteUserToken();
//   this.setState({ authData: newAuthData })
// }

// const handleSignInSuccess = (data: any) => {
//   const newAuthData = {
//     token: data.idToken,
//     userId: data.localId,
//     error: null,
//     loading: false
//   };
//   this.storeUserToken(data);
//   this.setState({ authData: newAuthData }, () => this.toggleAuthDialog());
// }

// const handleSignInError = (error: FirebaseError) => {
//   const newAuthData = {
//     token: null,
//     userId: null,
//     error,
//     loading: false
//   };
//   this.setState({ authData: newAuthData });
// }

export { createUser, updateState, getState, saveUpdatedStrategy, handleSignIn, handleSignUp,
  getUserPreferences, getUserStrategies, saveUser, updateUserPreferences };
