import './App.css';

import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Player } from '../../classes/Player';
import { testPlayers } from '../../constants/testPlayers';
import { BossAntorus } from '../../enums/bossAntorus';
import { BossTomb } from '../../enums/bossTomb';
import { BossUldir } from '../../enums/bossUldir';
import { Raid } from '../../enums/raid';
import { getSpecInfo } from '../../helpers/getClassInfo';
import { getBossInfo } from '../../helpers/getRaidInfo';
import BossAbilityList from '../BossAbilityList/BossAbilityList';
import NavBar from '../NavBar/NavBar';
import PlayerList from '../PlayerList/PlayerList';
import SideMenu from '../SideMenu/SideMenu';

// import * as db from '../../firebase/db';
// import { auth, firebase } from '../../firebase/firebase';
export interface IAppState {
  authUser: firebase.User | null;
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentBoss: BossAntorus | BossTomb | BossUldir;
  lastPlayerId: number;
  players: Player[];
  sideMenuOpen: boolean;
  userCredentials: firebase.auth.UserCredential;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class App extends React.Component<WithStyles<any>, IAppState> {
  public state = {
    authUser: null,
    bossAbilities: [] as BossAbility[],
    cooldowns: [] as Cooldown[],
    currentBoss: BossUldir.TALOC,
    currentRaid: Raid.ULDIR,
    lastPlayerId: 0,
    players: [] as Player[],
    sideMenuOpen: false,
    userCredentials: {} as firebase.auth.UserCredential,
  };

  public componentDidMount() {
    // auth.signInAnonymously().then((userCredentials) => {
    //   this.setState({ userCredentials });
    //   db.createUser(userCredentials.user!.uid);
    // }).catch((e) => {
    //   console.log(e);
    // });

    // auth.onAuthStateChanged((authUser) => {
    //   this.setState({ authUser });
    // });

    this.buildTestPlayerList();
    this.buildBossAbilityList();
  }

  public buildTestPlayerList() {
    testPlayers.map((testPlayer, index) => this.handleAddPlayer(testPlayer, index));
  }

  public buildCooldowns(player: Player) {
    const newCooldowns: Cooldown[] = [];    
    const specInfo = getSpecInfo(player.playerClass, player.playerSpec);
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

  public buildBossAbilityList() {
    const newBossAbilities: BossAbility[] = [];
    const bossInfo = getBossInfo(this.state.currentRaid, this.state.currentBoss);
    bossInfo.abilities.map((bossAbility, index) => newBossAbilities.push(
      new BossAbility(
        index,
        bossAbility.id,
        bossAbility.label,
        bossAbility.icon,
        bossAbility.cooldownTypes,
        bossAbility.cooldown,
        [] as Cooldown[],
        bossAbility.firstCast ? bossAbility.firstCast : undefined,
      )
    ));
    this.setState(prevState => ({ bossAbilities: [...prevState.bossAbilities, ...newBossAbilities ] }));
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

  public toggleSideMenu = () => {
    this.setState(prevState => ({ sideMenuOpen: !prevState.sideMenuOpen }));
  }

  public closeSideMenu = () => {
    this.setState({ sideMenuOpen: false });
  }
  
  public render() {
    const { bossAbilities, cooldowns, players, sideMenuOpen } = this.state;
    return (
      <Grid container={true} spacing={16} className="App">
        <SideMenu
          closeMenu={this.closeSideMenu}
          open={sideMenuOpen}
        />
        <Grid item={true} xs={12}>
          <NavBar
            toggleSideMenu={this.toggleSideMenu}
          />
        </Grid>
        <Grid item={true} sm={6} md={4}>
          <PlayerList
            players={players}
          />
        </Grid>
        <Grid item={true} sm={6} md={8}>
          <BossAbilityList
            bossAbilities={bossAbilities}
            cooldowns={cooldowns}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
