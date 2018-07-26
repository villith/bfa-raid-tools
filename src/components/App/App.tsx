import './App.css';

import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Cooldown } from '../../classes/Cooldown';
import { Player } from '../../classes/Player';
import { testPlayers } from '../../constants/testPlayers';
import * as db from '../../firebase/db';
import { auth, firebase } from '../../firebase/firebase';
import { getClassInfo } from '../../helpers/getClassInfo';
import CooldownList from '../CooldownList/CooldownList';
import { NavBar } from '../NavBar/NavBar';
import PlayerList from '../PlayerList/PlayerList';

export interface IAppState {
  authUser: firebase.User | null;
  cooldowns: Cooldown[];
  lastPlayerId: number;
  players: Player[];
  userCredentials: firebase.auth.UserCredential;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class App extends React.Component<WithStyles<any>, IAppState> {
  public state = {
    authUser: null,
    cooldowns: [] as Cooldown[],
    lastPlayerId: 0,
    players: [] as Player[],
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

    this.buildTestPlayerList();
  }

  public buildTestPlayerList() {
    testPlayers.map((testPlayer, index) => this.handleAddPlayer(testPlayer, index));
  }

  public buildCooldowns(player: Player) {
    const newCooldowns: Cooldown[] = [];    
    const classInfo = getClassInfo(player.playerClass);
    const specInfo = classInfo.specs.find(spec => spec.id === player.playerSpec);
    specInfo!.cooldowns.map(cooldown => newCooldowns.push(
      new Cooldown(
        cooldown.spellId,
        cooldown.name,
        cooldown.icon,
        cooldown.cooldownType,
        cooldown.cooldownTime,
        cooldown.WOWClass,
        cooldown.WOWSpec,
        player.id,
        cooldown.altCooldownTime,
        cooldown.charges,
      )
    ));
    this.setState(prevState => ({ cooldowns: [ ...prevState.cooldowns, ...newCooldowns ] }));
  }

  public handleAddPlayer(player: Partial<Player>, index: number) {
    const newPlayer = new Player(
      index,
      player.playerName!,
      player.playerClass!,
      player.playerSpec!
    );
    this.buildCooldowns(newPlayer);   
    this.setState(prevState => ({ players: [ ...prevState.players, newPlayer ] }));
  }
  
  public render() {
    const { cooldowns, players } = this.state;
    return (
      <Grid container={true} spacing={16} className="App">
        <Grid item={true} xs={12}>
          <NavBar />
        </Grid>
        <Grid item={true} xs={4}>
          <PlayerList
            players={players}
          />
        </Grid>
        <Grid item={true} xs={8}>
          <CooldownList
            cooldowns={cooldowns}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
