import './App.css';

import { Button } from '@material-ui/core';
import * as React from 'react';

import { classes } from '../../constants/classes';
import { WOWClass } from '../../enums/WOWclass';
import { WOWSpec } from '../../enums/WOWspec';
import * as db from '../../firebase/db';
import { auth, firebase } from '../../firebase/firebase';
import { NavBar } from '../NavBar/NavBar';
import PlayerList from '../PlayerList/PlayerList';

class App extends React.Component<{}, {
  authUser: firebase.User | null,
  userCredentials: firebase.auth.UserCredential,
}> {
  public state = {
    authUser: null,
    userCredentials: {} as firebase.auth.UserCredential,
  };

  public componentDidMount() {
    auth.signInAnonymously().then((userCredentials) => {
      this.setState({ userCredentials });
      db.createUser(userCredentials.user!.uid);
    }).catch((e) => {
      console.log(e);
    });

    auth.onAuthStateChanged((authUser) => {
      this.setState({ authUser });
    });
  }
  public render() {
    return (
      <div className="App">
        <NavBar />
        <PlayerList
          players={[
            {
              id: 0,
              playerClass: WOWClass.WARRIOR,
              playerName: 'Manmoth',
              playerSpec: WOWSpec.FURY,
            }
          ]}
        />
        <Button variant='contained' color='primary'>
          Test Button
        </Button>
        {classes.map((wowClass, index) => {
          return (
            <div className='wowClass' key={index}>
              <img className='wowClassIcon' style={{ borderColor: wowClass.classColor }} src={`classIcons/${wowClass.icon}.jpg`} />
              <span className='wowClassText' style={{ color: wowClass.classColor }}> {wowClass.label}</span>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
