import * as firebase from 'firebase';
import { PermissionRole } from 'src/enums/permissionRole';

import { BossAbility } from '../classes/BossAbility';
import { Cooldown } from '../classes/Cooldown';
import { Phase } from '../classes/Phase';
import { IBooleanMap, Strategy } from '../classes/Strategy';
import { IPreferences } from '../components/App/App';
import { auth, db } from './firebase';

const getState = (id: string) => {
  const ref = db.ref(`users/${id}`);
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot: any) => {
      resolve(snapshot.val());
    });
  });
};

// const saveUpdatedStrategy = (diffs: _.Dictionary<{}>) => {
//   // console.log(diffs);
//   const keyArray: string[] = [];
//   const recursiveFunc = (value: any) => {
//     const isObject = _.isObject(value);
//     const isArray = _.isArray(value);
//     const keys = Object.keys(value);
//     if (isArray) {
//       // console.log('[isArray]');
//       if (keys.length > 0) {
//         (value as any[]).map((v, index) => {
//           keyArray.push(keys[index]);
//           const path = keyArray.join('/');
//           keyArray.pop();
//           const ref = db.ref(`strategies/${path}`);
//           // console.log(`[ARRAY]: ${path}: ${value}`);
//           ref.set(value);
//         });
//       }
//     }
//     else if (isObject) {
//       // console.log('[isObject]');
//       keys.map(key => {
//         const val = value[key];
//         recursiveFunc(val);
//       });
//     }
//     else {
//       // console.log('[isKV]');
//       const path = keyArray.join('/');
//       keyArray.pop();
//       const ref = db.ref(`strategies/${path}`);
//       // console.log(`[OBJECT]: ${path}: ${value}`);
//       ref.set(value);
//     }
//   };
//   recursiveFunc(diffs);
// };

const handleSignUp = async (email: string, password: string) => {
  try {
    const resp = await auth.createUserWithEmailAndPassword(email, password);
    // console.log(resp);
    return resp;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
}

const handleSignIn = async (email: string, password: string) => {
  try {
    const resp = await auth.signInWithEmailAndPassword(email, password);
    // console.log(resp);
    return resp;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
}

const handleSignOut = async () => {
  try {
    const resp = await auth.signOut();
    // console.log(resp);
    return resp;
  }
  catch (err) {
    // console.log(err);
    return err;
  }
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

const testFunc = (uid: string) => {
  const ref = db.ref(`strategies`);
  console.log(ref);
  ref.once('value', (snapshot: any) => {
    const values = snapshot.val();
    console.log('===TEST FUNC===');
    console.log(values);
  });
};

// const changeStrategyPermissions = (uid: string, sid: string, pid: PermissionRole, callback: () => void) => {
//   const ref = db.ref(`strategyPermissions/${sid}`);
//   ref.set({
//     admins: {},
//     strategyId: sid,
//     permissionRole: pid
//   }).then(callback);
// };

const changeUserPermissions = (uid: string, sid: string, pid: PermissionRole, callback?: () => void) => {
  console.log(uid, sid, pid);
  const ref = db.ref(`permissions/${uid}/${sid}`);
  ref.set(pid).then(callback).catch(reason => console.log(reason));
}

const removeUserFromStrategy = (uid: string, sid: string, callback?: () => void) => {
  const ref = db.ref(`permissions/${uid}/${sid}`);
  ref.remove().then(callback);
};

const updateUserPermissions = (permissions: Array<IBooleanMap | undefined>, sid: string, callback?: () => void) => {
  permissions.map((p, index) => {
    if (p) {
      Object.keys(p).map(uid => {
        const value = p[uid];
        if (value) {
          changeUserPermissions(uid, sid, index, callback);
        }
        else {
          removeUserFromStrategy(uid, sid, callback);
        }
      });
    }
  });
}

const saveUpdatedStrategy = (strategy: Strategy) => {
  const { admins, officers, members, guests } = strategy;
  const ref = db.ref(`strategies/${strategy.id}`);
  ref.once('value', (snapshot: any) => {
    const values = snapshot.val();
    if (values) {
      console.log('values exist');
      updateUserPermissions([admins, officers, members, guests], strategy.id, () => {
        ref.set(strategy);
      });
    }
    else {
      console.log('values do not exist');
      ref.set(strategy).then(() => {
        updateUserPermissions([admins, officers, members, guests], strategy.id, () => {
          ref.set(strategy);
        });;
      });
    }
  });
};

const getUserStrategies = (uid: string) => {
  const ref = db.ref(`permissions/${uid}`);
  const results: Strategy[] = [];
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot: any) => {
      console.log(snapshot);
      const values = snapshot.val();
      if (values) {
        console.log(values);
        const keys = Object.keys(values);
        Object.keys(values).map((key: string) => {
          getStrategyById(key).then(result => {
            results.push(result);
            console.log(results.length, keys.length);
            if (results.length === keys.length) {
              resolve(results);
            };
          })
        });
      }
      else {
        console.log(`No strategies available for user with id: ${uid}`);
      }
    }, (reason: any) => console.log(reason));
  });
}

const getStrategyById = (sid: string): Promise<Strategy> => {
  const ref = db.ref(`strategies/${sid}`) ;
  return new Promise((resolve, reject) => {
    ref.once('value', (snapshot: any) => {
      const strategy: Strategy = snapshot.val();
      if (strategy) {        
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
          if (!player.cooldowns) { player.cooldowns = [] as Cooldown[]; }
          // console.log(player);
          player.cooldowns.map(cooldown => {
            if (!cooldown.bossAbilities) { cooldown.bossAbilities = [] as string[] }
            if (!cooldown.timers) { cooldown.timers = [] as number[] }
          });
          return player;
        });
        resolve(strategy);
      }
      else {
        reject(`Could not find strategy with id: ${sid}`);
      }
    }, (reason: string) => console.log(reason));
  });
};

const getUserPreferences = (uid: string) => {
  const ref = db.ref(`users/${uid}`);
  ref.child('preferences');
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

export { changeUserPermissions, getState, saveUpdatedStrategy, handleSignIn, handleSignUp, handleSignOut,
  getUserPreferences, getUserStrategies, getStrategyById, saveUser, testFunc, updateUserPreferences };
