import { CircularProgress, Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as _ from 'lodash';
import * as React from 'react';

import { buildBossAbilityList } from '../../bosses';
import { Boss, BossType, IBossMap } from '../../classes/Boss';
import { Player } from '../../classes/Player';
import { IPermissionMap, Strategy } from '../../classes/Strategy';
import { testPlayers } from '../../constants/testPlayers';
import { BossUldir } from '../../enums/bossUldir';
import { PermissionRole } from '../../enums/permissionRole';
import { Raid } from '../../enums/raid';
import {
  getUserPreferences,
  getUserStrategies,
  handleSignIn,
  handleSignOut,
  handleSignUp,
  saveUpdatedStrategy,
  saveUser,
  updateUserPreferences,
} from '../../firebase/db';
import { auth } from '../../firebase/firebase';
import { uuid } from '../../helpers/createGuid';
import { deepCopy as dc } from '../../helpers/deepCopy';
import { findAllByOwner, findById } from '../../helpers/getGeneric';
import { getPlayerByPlayerName, getPlayerIndexById } from '../../helpers/getPlayer';
import { getRaidInfo } from '../../helpers/getRaidInfo';
import Authentication from '../Dialogs/Authentication';
import ExportState from '../Dialogs/ExportState';
import ImportState from '../Dialogs/ImportState';
import MainContent from '../MainContent/MainContent';
import NavBar from '../NavBar/NavBar';
import SideMenu from '../SideMenu/SideMenu';
import StrategyList from '../StrategyList/StrategyList';
import TwitchWidgetContainer from '../Widgets/TwitchWidget/TwitchWidgetContainer';
import { Aux } from '../winAux';

const nullStrategy: Strategy = {
  id: null,
  title: 'New Strategy',
  description: '',
  bosses: {} as IBossMap,
  players: [] as Player[],
  users: {} as IPermissionMap,
};

export interface IAppState {
  user: firebase.User | null;
  currentStrategy: Strategy;
  authCredential: firebase.auth.AuthCredential | null;
  authOpen: boolean;
  currentBoss: BossType;
  currentRaid: Raid;
  exportOpen: boolean;
  importOpen: boolean;
  loading: boolean;
  preferences: IPreferences;
  sideMenuOpen: boolean;
  strategies: Strategy[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 6,
    overflowY: 'scroll'
  },
  loading: {
    margin: 'auto'
  }
});

export interface IPreferences {
  darkMode: boolean;
  favourites: string[];
}

class App extends React.Component<WithStyles<any>, IAppState> {
  public state = {
    user: {} as firebase.User,
    currentStrategy: nullStrategy,
    authCredential: null,
    authOpen: false,
    currentBoss: BossUldir.HOME,
    currentRaid: Raid.ULDIR,
    exportOpen: false,
    importOpen: false,
    loading: true,
    preferences: {
      darkMode: false,
      favourites: ['']
    },
    sideMenuOpen: false,
    strategies: [nullStrategy] as Strategy[],
  };

  public componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ user }, () => {
        if (user) { 
          saveUser(user, () => {
            const promiseArray = [] as Array<Promise<any>>;
            const strategiesPromise = getUserStrategies(user.uid).then((result: Strategy[]) => {
              console.log(result);
              this.setState({ strategies: result });
            }, (reason: string) => {
              this.setState({ loading: false }, () => { this.buildNewStrategy(); });
              console.log(reason);
            });
            const preferencesPromise = getUserPreferences(user.uid).then((result: any) => {
              const { preferences }: { preferences: IPreferences } = result;
              console.log(preferences);
              this.setState({ preferences });
            });
            promiseArray.push(strategiesPromise);
            promiseArray.push(preferencesPromise);

            Promise.all(promiseArray).then(() => {
              this.setState({ loading: false });
            });
          });
        }
        else {
          auth.signInAnonymously().then(resp => {
            this.setState({ authCredential: resp.credential });
          });
        }
      });
    });
  }

  public handleSelectStrategy = (id: string | null) => {
    if (id) {
      const strategy = this.state.strategies[findById(id, this.state.strategies)];
      if (strategy) {
        this.setState({ currentStrategy: strategy });
      }
      else {
        console.log(`[selectNewStrategy] Could not find strategy with id: ${id}`);
      }
    }
    else {
      this.setState({ currentStrategy: nullStrategy });
    }
  }

  public getCurrentStrategy = () => {
    const accessor = this.state.currentBoss;
    const strategy: Strategy = dc(this.state.currentStrategy);
    const bosses = strategy.bosses;
    const boss = bosses[accessor];

    return { accessor, boss, bosses, strategy };
  };

  public buildNewStrategy = () => {
    console.log(`[buildNewStrategy]`);
    const permissionMap: IPermissionMap = {
      [PermissionRole.ADMIN]: [],
      [PermissionRole.OFFICER]: [],
      [PermissionRole.MEMBER]: [],
      [PermissionRole.GUEST]: [],
    };
    const { user } = this.state;
    if (user) {
      permissionMap[PermissionRole.ADMIN].push(user.uid);
    }
    const description = `This is a test description, used to fill out test strategies. DELETE ME. What would this description field even be
      used for? Probably just retarded memes and ASCII art.`;
    const strategy = new Strategy(uuid(), 'New Strategy', description, this.buildBossList(), [] as Player[], permissionMap);
    this.setState(prevState => ({ currentStrategy: strategy, strategies: prevState.strategies.concat(strategy) }));
  }

  public buildTestPlayerList = () => {
    this.handleAddPlayers(testPlayers);
  }

  public buildBossList = () => {
    const newBosses: Boss[] = [];
    const raidInfo = getRaidInfo(this.state.currentRaid);
    raidInfo.bosses.map((boss, index) => newBosses.push(
      new Boss(
        boss.id,
        raidInfo.id,
        boss.label,
        boss.title,
        boss.icon,
      )
    ));
    return newBosses;
  }

  public handleAddPlayers = (players: Player[]) => {
    console.log(`[handleAddPlayers]`);
    const { strategy } = this.getCurrentStrategy();
    const newPlayers = strategy.players;
    players.map(player => {
      const playerIndex = getPlayerIndexById(player.id, newPlayers);
      const playerNameExists = getPlayerByPlayerName(player.playerName, newPlayers);
      if (playerIndex === -1 && !playerNameExists) {
        newPlayers.push(player);
      }
    });
    this.setState({ currentStrategy: strategy }, () => this.handleUpdateStrategy(strategy));
  }

  public handleAddPlayersToBoss = (playerIds: string[]) => {
    console.log(`[handleAddPlayersToBoss]`);
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const newPlayers = strategy.players;
    
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      const player = newPlayers[playerIndex];

      player.bosses[accessor] = true;
      boss.cooldowns.push(...player.cooldowns);
    });

    bosses[accessor] = boss;
    this.setState({ currentStrategy: strategy }, () => this.handleUpdateStrategy(strategy));
  };

  public handleDeletePlayers = (playerIds: string[]) => {
    const { bosses, strategy } = this.getCurrentStrategy();
    const newPlayers = strategy.players;
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      const player = newPlayers[playerIndex];
      if (playerIndex === -1) {
        console.log(`[handleDeletePlayer]: Player with playerId: ${playerId} not found in state.`);
      }
      else {
        newPlayers.splice(playerIndex, 1);
      }
      Object.keys(bosses).map(key => {
        const boss = bosses[key];
        const cooldownIndexes = findAllByOwner(player.id, boss.cooldowns);
        if (player.bosses[key] === true) {
          for (let i = cooldownIndexes.length - 1; i >= 0; i -= 1) {
            boss.cooldowns.splice(cooldownIndexes[i], 1);
          }
        }
      });
    });
    this.setState({ currentStrategy: strategy }, () => this.handleUpdateStrategy(strategy));
  }

  public handleDeletePlayersFromBoss = (playerIds: string[]) => {
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const newPlayers = strategy.players;
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      const player = newPlayers[playerIndex];

      player.bosses[accessor] = false;
      const cooldownIndexes = findAllByOwner(player.id, boss.cooldowns);
      for (let i = cooldownIndexes.length - 1; i >= 0; i -= 1) {
        boss.cooldowns.splice(cooldownIndexes[i], 1);
      }
    });

    bosses[accessor] = boss;
    this.setState({ currentStrategy: strategy }, () => this.handleUpdateStrategy(strategy));
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

  public toggleExportStateDialog = () => {
    this.setState(prevState => ({ exportOpen: !prevState.exportOpen }));
  }

  public closeExportStateDialog = () => {
    this.setState({ exportOpen: false });
  }

  public toggleImportStateDialog = () => {
    this.setState(prevState => ({ importOpen: !prevState.importOpen }));
  }

  public closeImportStateDialog = () => {
    this.setState({ importOpen: false });
  }

  public handleChangeBoss = (event: React.MouseEvent<HTMLElement>) => {
    const currentBoss = parseInt(event.currentTarget.id, 10);
    this.setState({ currentBoss });
  }

  public handleCooldownPickerChange = (cooldownId: string, bossAbilityId: string, timer: number) => {
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const cooldownIndex = findById(cooldownId, boss.cooldowns);
    boss.cooldowns[cooldownIndex].bossAbilities.push(bossAbilityId);
    boss.cooldowns[cooldownIndex].timers.push(timer);
    bosses[accessor] = boss;
    this.setState({ currentStrategy: strategy }, () => this.handleUpdateStrategy(strategy));
  }

  public handleRemoveCooldown = (bossAbilityId: string, cooldownId: string, timer: number) => {
    console.log(`[handleRemoveCooldown]: ${bossAbilityId}, ${cooldownId}, ${timer}`);
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const cooldownIndex = findById(cooldownId, boss.cooldowns);
    const cooldowns = boss.cooldowns[cooldownIndex]
    const { bossAbilities, timers } = cooldowns;
    const bossAbilityIndex = findById(bossAbilityId, bossAbilities);
    const timerIndex = timers.findIndex(t => timer === t);
    bossAbilities.splice(bossAbilityIndex, 1);
    timers.splice(timerIndex, 1);
    bosses[accessor] = boss;
    this.setState({ currentStrategy: strategy }, () => this.handleUpdateStrategy(strategy));
  }

  public handleChangePhaseTimers = (timers: number[]) => {
    console.log(timers);
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const { abilities, phases } = boss;
    const newPhases = phases.map((phase, index) => {
      let timer = timers[index];
      if (timer > 600) { timer = 600 }
      if (timer < 0) { timer = 0 }
      if (index < timers.length - 1) {
        const nextTimer = timers[index + 1];
        if (timer > nextTimer) {
          timer = nextTimer - 1;
        }
      }
      phase.timer = timer;
      return phase;
    });
    console.log(newPhases);
    const newAbilities = buildBossAbilityList(boss.id, newPhases, abilities);
    console.log(newAbilities);
    boss.phases = newPhases;
    boss.abilities = newAbilities;
    bosses[accessor] = boss;
    this.setState({ currentStrategy: strategy }, () => this.handleUpdateStrategy(strategy));
  }

  public handleImportState = (importString: string) => {
    const newState = importString;
    console.log(newState);
  }

  public handleExportState = (exportString: string) => {
    console.log(exportString);
  }

  public toggleAuthDialog = () => {
    this.setState(prevState => ({ authOpen: !prevState.authOpen }));
  }

  public closeAuthDialog = () => {
    this.setState({ authOpen: false });
  }

  public buildUpdateStrategyPath = (strategy: Strategy) => {
    const strategies = dc(this.state.strategies);
    const { id } = strategy;
    if (id) {
      const oldStrategyIndex = findById(id, strategies);
      const oldStrategy = strategies[oldStrategyIndex];
      const deepDiff = (a: Strategy, b: Strategy) => {
        return _.transform(a, (result: any, value: any, key: any) => {
          if (!_.isEqual(value, b[key])) {
            result[key] = (_.isObject(value) && _.isObject(b[key])) ? deepDiff(value, b[key]) : value;
          }
        });
      }
      const diffs = deepDiff(strategy, oldStrategy);;
      strategies[oldStrategyIndex] = strategy;
      this.setState({ strategies });
      return diffs;
    }
    else {
      console.log('Cannot update null strategy');
      return;
    }
  }

  public handleUpdateStrategy = (strategy: Strategy) => {
    const strategies = dc(this.state.strategies);
    const { id } = strategy;
    if (id) {
      const oldStrategyIndex = findById(id, strategies);
      strategies[oldStrategyIndex] = strategy;
      this.setState({ strategies }, () => saveUpdatedStrategy(strategy));
    }
    else {
      console.log('Cannot update null strategy');
    }
  }

  public handleToggleFavourite = (id: string) => {
    if (id) {
      const preferences = dc(this.state.preferences);
      const { favourites } = preferences;
      const index = favourites.findIndex((strategyId: string) => strategyId === id);
      index === -1 ? favourites.push(id) : favourites.splice(index, 1);
      this.setState({ preferences }, () => updateUserPreferences(this.state.user.uid, preferences));
    }
  }

  public render() {
    const { authCredential, authOpen, currentBoss, sideMenuOpen, exportOpen, importOpen, currentStrategy, preferences, strategies, user, loading } = this.state;
    const { bosses, players } = currentStrategy;
    const { classes } = this.props;
    const boss = bosses[currentBoss];
    return (
      <div className={classes.root}>
        <NavBar
          toggleSideMenu={this.toggleSideMenu}
          toggleImportStateDialog={this.toggleImportStateDialog}
          toggleExportStateDialog={this.toggleExportStateDialog}
          toggleAuthDialog={this.toggleAuthDialog}
          selectNewStrategy={this.handleSelectStrategy}
          handleSignOut={handleSignOut}
          sideMenuOpen={sideMenuOpen}
          importOpen={importOpen}
          exportOpen={exportOpen}
          user={user}
        />
        <SideMenu
          bosses={bosses}
          closeMenu={this.closeSideMenu}
          currentBoss={currentBoss}
          handleChange={this.handleChangeBoss}
          openMenu={this.openSideMenu}
          open={sideMenuOpen}
        />
        <ImportState
          open={importOpen}
          importState={this.handleImportState}
          closeDialog={this.closeImportStateDialog}
        />
        <ExportState
          open={exportOpen}
          exportState={this.handleExportState}
          closeDialog={this.closeExportStateDialog}
        />
        <Authentication
          open={authOpen}
          user={user}
          authCredential={authCredential}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          closeDialog={this.closeAuthDialog}
        />
        {loading === true ? (
          <CircularProgress className={classes.loading} size={96} />
        ) : (
          <Grid container={true} spacing={16} className={classes.content}>
            {currentStrategy.id === null ? (
              <Aux>
                <Grid item={true} xs={8} sm={9}>
                  <StrategyList
                    handleToggleFavourite={this.handleToggleFavourite}
                    preferences={preferences}
                    strategies={strategies}
                    selectStrategy={this.handleSelectStrategy}
                  />
                </Grid>
                <Grid item={true} xs={4} sm={3}>
                  <TwitchWidgetContainer />
                </Grid>
              </Aux>
            ) : (
              <MainContent
                boss={boss}
                bosses={bosses}
                players={players}
                addPlayers={this.handleAddPlayers}
                addPlayersToBoss={this.handleAddPlayersToBoss}
                deletePlayers={this.handleDeletePlayers}
                deletePlayersFromBoss={this.handleDeletePlayersFromBoss}
                handleCooldownPickerChange={this.handleCooldownPickerChange}
                handleChangePhaseTimers={this.handleChangePhaseTimers}
                buildTestPlayerList={this.buildTestPlayerList}
                handleRemoveCooldown={this.handleRemoveCooldown}
              />
            )}
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
