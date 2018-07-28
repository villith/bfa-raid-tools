import './App.css';

import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Boss } from '../../classes/Boss';
import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import { testPlayers } from '../../constants/testPlayers';
import { BossAntorus } from '../../enums/bossAntorus';
import { BossTomb } from '../../enums/bossTomb';
import { BossUldir } from '../../enums/bossUldir';
import { Raid } from '../../enums/raid';
import { getSpecInfo } from '../../helpers/getClassInfo';
import { getBossInfo, getRaidInfo } from '../../helpers/getRaidInfo';
import BossAbilityListContainer from '../BossAbilityList/BossAbilityListContainer';
import NavBar from '../NavBar/NavBar';
import PlayerList from '../PlayerList/PlayerList';
import SideMenu from '../SideMenu/SideMenu';

// import * as db from '../../firebase/db';
// import { auth, firebase } from '../../firebase/firebase';
export interface IAppState {
  authUser: firebase.User | null;
  bossAbilities: BossAbility[];
  bosses: Boss[];
  cooldowns: Cooldown[];
  currentBoss: BossAntorus | BossTomb | BossUldir;
  currentPhase: number;
  currentRaid: Raid;
  lastPlayerId: number;
  phases: Phase[];
  players: Player[];
  sideMenuOpen: boolean;
  userCredentials: firebase.auth.UserCredential;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3
  }
});

class App extends React.Component<WithStyles<any>, IAppState> {
  public state = {
    authUser: null,
    bossAbilities: [] as BossAbility[],
    bosses: [] as Boss[],
    cooldowns: [] as Cooldown[],
    currentBoss: BossUldir.TALOC,
    currentPhase: 0,
    currentRaid: Raid.ULDIR,
    lastPlayerId: 0,
    phases: [] as Phase[],
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

    this.buildBossList();
    this.buildBossAbilityList();
    this.buildPhaseList();
  }

  public buildTestPlayerList = () => {
    testPlayers.map((testPlayer, index) => this.handleAddPlayer(testPlayer, index));
  }

  public buildCooldowns = (player: Player) => {
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

  public buildBossAbilityList = () => {
    const newBossAbilities: BossAbility[] = [];
    const bossInfo = getBossInfo(this.state.currentRaid, this.state.currentBoss);
    bossInfo.abilities.map((bossAbility, index) => newBossAbilities.push(
      new BossAbility(
        index,
        bossAbility.spellId,
        bossAbility.label,
        bossAbility.icon,
        bossAbility.cooldownTypes,
        bossAbility.cooldown,
        [] as Cooldown[],
        bossAbility.phases,
        bossAbility.firstCast ? bossAbility.firstCast : undefined,
      )
    ));
    this.setState(prevState => ({ bossAbilities: [...prevState.bossAbilities, ...newBossAbilities ] }));
  }

  public buildPhaseList = () => {
    const newPhases: Phase[] = [];
    const bossInfo = getBossInfo(this.state.currentRaid, this.state.currentBoss);
    bossInfo.phases.map((phase, index) => newPhases.push(
      new Phase(
        index,
        phase.label,
        phase.estimatedStartTime,
        phase.startTime,
        phase.duration,
        phase.bossPercentage
      )
    ));
    this.setState(prevState => ({ phases: [...prevState.phases, ...newPhases ] }));
  }

  public buildBossList = () => {
    const newBosses: Boss[] = [];
    const raidInfo = getRaidInfo(this.state.currentRaid);
    raidInfo.bosses.map((boss, index) => newBosses.push(
      new Boss(
        boss.id,
        boss.label,
        boss.title,
        boss.icon,
        boss.abilities as BossAbility[],
        boss.phases as Phase[],
        [] as Player[],
      )
    ));
    this.setState(prevState => ({ bosses: [...prevState.bosses, ...newBosses ] }));
  }

  public handleAddPlayer = (player: Partial<Player>, index: number) => {
    console.log(`[handleAddPlayer]`);
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

  public openSideMenu = () => {
    this.setState({ sideMenuOpen: true });
  }

  public closeSideMenu = () => {
    this.setState({ sideMenuOpen: false });
  }

  public handleChangePhase = (event: any, newPhase: number) => {
    console.log(`[handleChangePhase]: ${newPhase}`);
    this.setState({ currentPhase: newPhase });
  }
  
  public render() {
    const { classes } = this.props;
    const { bossAbilities, bosses, cooldowns, currentBoss, currentPhase, phases, players, sideMenuOpen } = this.state;
    return (
      <div className={classes.root}>
        <NavBar
          toggleSideMenu={this.toggleSideMenu}
          open={sideMenuOpen}
        />
        <SideMenu
          bosses={bosses}
          closeMenu={this.closeSideMenu}
          currentBoss={currentBoss}
          openMenu={this.openSideMenu}
          open={sideMenuOpen}
        />
        <Grid container={true} spacing={16} className={classes.content}>
          <Grid item={true} xs={6} md={4}>
            <PlayerList
              handleAddPlayer={this.handleAddPlayer}
              players={players}
            />
          </Grid>
          <Grid item={true} xs={6} md={8}>
            <BossAbilityListContainer
              bossAbilities={bossAbilities}
              cooldowns={cooldowns}
              currentPhase={currentPhase}
              handleChangePhase={this.handleChangePhase}
              phases={phases}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
