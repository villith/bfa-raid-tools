import './App.css';

import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Boss, BossType, IBossMap } from '../../classes/Boss';
import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import { testPlayers } from '../../constants/testPlayers';
import { BossUldir } from '../../enums/bossUldir';
import { Raid } from '../../enums/raid';
import { deepCopy as dc } from '../../helpers/deepCopy';
import { getPlayerByPlayerName, getPlayerIndexById } from '../../helpers/getPlayer';
import { getBossInfo, getRaidInfo } from '../../helpers/getRaidInfo';
import MainContent from '../MainContent/MainContent';
import NavBar from '../NavBar/NavBar';
import SideMenu from '../SideMenu/SideMenu';

// import * as db from '../../firebase/db';
// import { auth, firebase } from '../../firebase/firebase';

export interface IAppState {
  authUser: firebase.User | null;
  bosses: IBossMap;
  currentBoss: BossType;
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
    currentBoss: BossUldir.HOME,
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
    this.handleAddPlayers(testPlayers);
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
      )
    ));
    this.setState({ bosses: newBosses });
  }

  public handleAddPlayers = (players: Player[]) => {
    const newPlayers = [ ...this.state.players ];
    players.map(player => {
      const playerIndex = getPlayerIndexById(player.id, newPlayers);
      const playerNameExists = getPlayerByPlayerName(player.playerName, newPlayers);
      if (playerIndex === -1 && !playerNameExists) {
        newPlayers.push(player);
      }
    });
    this.setState({ players: newPlayers });  
  }

  public handleAddPlayersToBoss = (playerIds: string[], boss: BossType) => {
    const newPlayers = [ ...this.state.players ];
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      const player = newPlayers[playerIndex];

      player.bosses[boss] = true;
    });

    this.setState({ players: newPlayers });
  };

  public handleDeletePlayers = (playerIds: string[]) => {
    const newPlayers = [ ...this.state.players ];
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      if (playerIndex === -1) {
        console.log(`[handleDeletePlayer]: Player with playerId: ${playerId} not found in state.`);
      }
      else {
        newPlayers.splice(playerIndex, 1);
      }
    });
    this.setState({ players: newPlayers });
  }

  public handleDeletePlayersFromBoss = (playerIds: string[], boss: BossType) => {
    const newPlayers = [ ...this.state.players ];
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      const player = newPlayers[playerIndex];

      player.bosses[boss] = false;
    });

    this.setState({ players: newPlayers });
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

  public handleChangeBoss = (event: React.MouseEvent<HTMLElement>) => {
    const currentBoss = parseInt(event.currentTarget.id, 10);
    this.setState({ currentBoss });
  }
  
  public render() {
    const { bosses, currentBoss, players, sideMenuOpen } = this.state;
    const { classes } = this.props;
    const boss = this.state.bosses[currentBoss];
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
        <MainContent
          boss={boss}
          bosses={bosses}
          players={players}
          addPlayers={this.handleAddPlayers}
          addPlayersToBoss={this.handleAddPlayersToBoss}
          deletePlayers={this.handleDeletePlayers}
          deletePlayersFromBoss={this.handleDeletePlayersFromBoss}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
