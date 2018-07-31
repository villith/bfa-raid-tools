import './App.css';

import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Boss, BossType } from '../../classes/Boss';
import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import { testPlayers } from '../../constants/testPlayers';
import { BossUldir } from '../../enums/bossUldir';
import { Raid } from '../../enums/raid';
import { deepCopy as dc } from '../../helpers/deepCopy';
import { getSpecInfo } from '../../helpers/getClassInfo';
import { getBossInfo, getRaidInfo } from '../../helpers/getRaidInfo';
import BossAbilityListContainer from '../BossAbilityList/BossAbilityListContainer';
import NavBar from '../NavBar/NavBar';
import PlayerList from '../PlayerList/PlayerList';
import SideMenu from '../SideMenu/SideMenu';

// import * as db from '../../firebase/db';
// import { auth, firebase } from '../../firebase/firebase';

interface IBossMap {
  [index: number]: Boss;
}

export interface IAppState {
  authUser: firebase.User | null;
  bosses: IBossMap;
  currentBoss: BossType;
  currentPhase: number;
  currentRaid: Raid;
  lastPlayerId: number;
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
    bosses: {} as IBossMap,
    currentBoss: BossUldir.TALOC,
    currentPhase: 0,
    currentRaid: Raid.ULDIR,
    lastPlayerId: 0,
    players: [] as Player[],
    sideMenuOpen: false,
    userCredentials: {} as firebase.auth.UserCredential,
  };

  public componentWillMount() {
    this.buildBossList();
  }

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

    this.initApp();
  }

  public initApp = () => {
    this.buildBossAbilityList(() => {
      this.buildPhaseList(() => {
        this.buildTestPlayerList();
      });
    });
  }

  public getBossStateObject = () => {
    const accessor: BossType = this.state.currentBoss;
    const boss = dc(this.state.bosses[accessor]) as Boss;
    const bosses: IBossMap = dc(this.state.bosses) as IBossMap;

    return { accessor, boss, bosses };
  };

  public buildTestPlayerList = () => {
    let count = 0;
    const map = (player: Partial<Player>) => {
      this.handleAddPlayer(player, count,  () => {
        count += 1;
        if (count < testPlayers.length) { map(testPlayers[count]) };
      });
    };
    map(testPlayers[count]);
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
    return newCooldowns;
  }

  public buildBossAbilityList = (callback?: () => void) => {
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

    const { accessor, boss, bosses } = this.getBossStateObject();
    boss.abilities = newBossAbilities;
    bosses[accessor] = boss;
    this.setState({ bosses }, callback);
  }

  public buildPhaseList = (callback?: () => void) => {
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
    const { accessor, boss, bosses } = this.getBossStateObject();
    boss.phases = newPhases;
    bosses[accessor] = boss;
    this.setState({ bosses }, callback);
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
        [] as Cooldown[],
        boss.phases as Phase[],
        [] as Player[],
      )
    ));
    this.setState({ bosses: newBosses });
  }

  public handleAddPlayer = (player: Partial<Player>, index: number, callback?: () => void) => {
    console.log(`[handleAddPlayer]`);
    const newPlayer = new Player(
      player.playerName!,
      player.playerClass!,
      player.playerSpec!
    );
    const cooldowns = this.buildCooldowns(newPlayer);
    console.log('cooldowns');
    console.dir(cooldowns);
    const { accessor, boss, bosses } = this.getBossStateObject();
    boss.roster.push(newPlayer);
    boss.cooldowns.push(...cooldowns);
    bosses[accessor] = boss;
    console.log('setstate');
    this.setState({ bosses }, callback);
  }

  public handleDeletePlayer = (playerId: string, callback?: () => void) => {
    const { accessor, boss, bosses } = this.getBossStateObject();
    const playerIndex = boss.roster.findIndex(player => player.id === playerId);
    if (playerIndex === -1) {
      console.log(`[handleDeletePlayer]: Player with playerId: ${playerId} not found in state.`);
    }
    else {
      boss.roster.splice(playerIndex, 1);
      bosses[accessor] = boss;
      this.setState({ bosses }, callback);
    }
  }

  public handleDeleteSelectedPlayers = (selected: string[]) => {
    let count = 0;
    const map = (playerId: string) => {
      this.handleDeletePlayer(playerId, () => {
        count += 1;
        if (count < selected.length) { map(selected[count]) };
      });
    };
    map(selected[count]);
  }

  public handleAddToRoster = (player: Player, boss: Boss) => {
    return;
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

  public handleChangeBoss = (event: React.MouseEvent<HTMLElement>) => {
    const newBoss = parseInt(event.currentTarget.id, 10);
    this.setState({ currentBoss: newBoss });
  }
  
  public render() {
    const { bosses, currentBoss, currentPhase, sideMenuOpen } = this.state;
    const { classes } = this.props;
    const boss = this.state.bosses[currentBoss];
    const { abilities, cooldowns, phases, roster } = boss;
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
          handleChange={this.handleChangeBoss}
          openMenu={this.openSideMenu}
          open={sideMenuOpen}
        />
        <Grid container={true} spacing={16} className={classes.content}>
          <Grid item={true} xs={6} md={4}>
            <PlayerList
              handleAddPlayer={this.handleAddPlayer}
              handleDeletePlayers={this.handleDeleteSelectedPlayers}
              players={roster}
            />
          </Grid>
          <Grid item={true} xs={6} md={8}>
            <BossAbilityListContainer
              bossAbilities={abilities}
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
