import { CircularProgress, Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Apps as AppIcon, SaveAlt as SaveAltIcon, Share as ShareIcon } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { buildBossAbilityList } from '../../bosses';
import { Boss, BossType, IBossMap } from '../../classes/Boss';
import { Player } from '../../classes/Player';
import { IBooleanMap, IStrategyDescriptors, Strategy } from '../../classes/Strategy';
import { testPlayers } from '../../constants/testPlayers';
import { BossUldir } from '../../enums/bossUldir';
import { Raid } from '../../enums/raid';
import {
  getUserPreferences,
  getUserStrategies,
  handleSignIn,
  handleSignOut,
  handleSignUp,
  listenForStrategyUpdates,
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
import Authentication, { AuthDialogState } from '../Dialogs/Authentication';
import ExportState from '../Dialogs/ExportState';
import ImportState from '../Dialogs/ImportState';
import MainContent from '../MainContent/MainContent';
import NavBar from '../NavBar/NavBar';
import NavBarAccount from '../NavBar/NavBarAccount';
import NavBarAction from '../NavBar/NavBarAction';
import NavBarActions from '../NavBar/NavBarActions';
import SideMenu from '../SideMenu/SideMenu';
import { Aux } from '../winAux';

// import * as _ from 'lodash';
const defaultStrategy: Strategy = {
  id: '',
  title: 'New Strategy',
  description: '',
  bosses: {} as IBossMap,
  players: [] as Player[],
  admins: {} as IBooleanMap,
  officers: {} as IBooleanMap,
  members: {} as IBooleanMap,
  guests: {} as IBooleanMap,
};

export interface IAppState {
  user: firebase.User;
  currentStrategy: string;
  authCredential: firebase.auth.AuthCredential | null;
  authOpen: boolean;
  authDialogState: AuthDialogState;
  availableStrategies: IStrategyDescriptors[];
  currentBoss: BossType;
  currentRaid: Raid;
  exportOpen: boolean;
  importOpen: boolean;
  initLoading: boolean;
  loading: boolean;
  preferences: IPreferences;
  sideMenuOpen: boolean;
  strategies: Strategy[];
  navBarAnchorEl: HTMLElement | undefined;
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
  divider: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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
  },
  hidden: {
    display: 'none'
  }
});

export interface IPreferences {
  darkMode: boolean;
  favourites: string[];
}

class App extends React.Component<RouteComponentProps<any> & WithStyles<any>, IAppState> {
  public state = {
    user: {} as firebase.User,
    currentStrategy: '',
    authCredential: null,
    authOpen: false,
    authDialogState: 'signIn' as AuthDialogState,
    availableStrategies: [],
    currentBoss: BossUldir.HOME,
    currentRaid: Raid.ULDIR,
    exportOpen: false,
    importOpen: false,
    initLoading: true,
    loading: true,
    preferences: {
      darkMode: false,
      favourites: ['']
    },
    sideMenuOpen: false,
    strategies: [] as Strategy[],
    navBarAnchorEl: undefined
  };

  public componentDidMount() {
    const { history } = this.props;
    auth.onAuthStateChanged(user => {
      console.log('auth state changed');
      if (user) {
        this.setState({ user }, () => { 
          saveUser(user, () => {
            const promiseArray = [] as Array<Promise<any>>;
            const strategiesPromise = getUserStrategies(user.uid).then((results: Strategy[]) => {
              this.setState({ strategies: results }, () => {
                listenForStrategyUpdates(results.map(r => r.id), result => {
                  console.log('RESULT');
                  console.log(result);
                  const { strategies } = this.state;
                  if (result) {
                    const index = findById(result.id, strategies);
                    if (index !== -1) {
                      strategies[index] = result;
                      console.log('NEW STRATEGY UPDATE... UPDATING STATE');
                      this.setState({ strategies });
                    }
                    else {
                      console.log('could not find strategy in strategies');
                    }
                  }
                  else {
                    console.log('Result undefined');
                  }
                });
              });
            })
            .catch(reason => console.log(reason));

            const preferencesPromise = getUserPreferences(user.uid).then((result: any) => {
              const { preferences }: { preferences: IPreferences } = result;
              // console.log(preferences);
              console.log('preferencesPromise done');
              this.setState({ preferences });
            });
            promiseArray.push(strategiesPromise);
            promiseArray.push(preferencesPromise);

            Promise.all(promiseArray).then(() => {
              this.setState({ initLoading: false });
            }).catch(reason => {
              console.log(reason);
              this.setState({ initLoading: false }, () => {
                console.log('push history base');
                history.push('/')
              });
            });
          });
        });
      }
      else {
        console.log('abc');
        auth.signInAnonymously().then(resp => {
          const promiseArray = [] as Array<Promise<any>>;
          const strategiesPromise = getUserStrategies(resp.user!.uid).then((results: Strategy[]) => {
            console.log(results);
            this.setState({ strategies: results });
          });

          const preferencesPromise = getUserPreferences(resp.user!.uid).then((result: any) => {
            const { preferences }: { preferences: IPreferences } = result;
            // console.log(preferences);
            console.log('preferencesPromise done');
            this.setState({ preferences });
          });
          promiseArray.push(strategiesPromise);
          promiseArray.push(preferencesPromise);

          Promise.all(promiseArray).then(() => {
            this.setState({ loading: false }, () => {
              console.log('push history');
              history.push('/');
            });
          }).catch(reason => {
            console.log(reason);
            this.setState({ loading: false }, () => {
              console.log('push history');
              history.push('/');
            });
          });
        });
      }
    });
  }

  public setLoadingTrue = () => {
    console.log('[setLoadingTrue]');
    this.setState({ loading: true });
  }

  public handleSelectStrategy = (id: string, callback?: (id: string) => void) => {
    console.log('[handleSelectStrategy]');
    this.setLoadingTrue();
    if (id) {
      if (this.state.currentStrategy !== id) {
        const strategy = this.state.strategies[findById(id, this.state.strategies)];
        if (strategy) {
          this.setState({ currentStrategy: strategy.id }, () => { if (callback) { callback(id) } });
        }
        else {
          console.log(`[selectNewStrategy] Could not find strategy with id: ${id}`);
        }
      }
      else {
        console.log('Already on selected strategy');
      }
    }
    else {
      console.log('Strategy id is null / undefined');
    }
  }

  public getCurrentStrategy = () => {
    const { currentBoss, currentStrategy, strategies } = this.state;
    const accessor = currentBoss;
    const strategyId = currentStrategy || '';
    const strategy = strategies[findById(strategyId, strategies)] || defaultStrategy;
    const bosses = strategy.bosses;
    const boss = bosses[accessor];

    return { accessor, boss, bosses, strategy };
  };

  public buildNewStrategy = (callback: (sid: string) => void) => {
    // console.log(`[buildNewStrategy]`);
    const { user } = this.state;
    const admins = {} as IBooleanMap;
    if (user) {
      const definedUser: firebase.User = user;
      admins[definedUser.uid] = true;
    }
    const description = `This is a test description, used to fill out test strategies. DELETE ME.`;
    const strategy = new Strategy(uuid(), 'New Strategy', description, admins, undefined, undefined, undefined, this.buildBossList());
    this.setState(prevState => ({ strategies: prevState.strategies.concat(strategy) }), () => callback(strategy.id));
  };

  public handleFinishedLoading = () => {
    console.log('[handleFinishedLoading]');
    this.setState({ loading: false });
  };

  public buildTestPlayerList = () => {
    this.handleAddPlayers(testPlayers);
  }

  public navBarhandleClick = (event: any) => {
    this.setState({ navBarAnchorEl: event.currentTarget });
  }

  public navBarHandleClose = () => {
    this.setState({ navBarAnchorEl: undefined });
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
    // console.log(`[handleAddPlayers]`);
    const { strategies } = this.state;
    const { strategy } = this.getCurrentStrategy();
    const newPlayers = strategy.players;
    players.map(player => {
      const playerIndex = getPlayerIndexById(player.id, newPlayers);
      const playerNameExists = getPlayerByPlayerName(player.playerName, newPlayers);
      if (playerIndex === -1 && !playerNameExists) {
        newPlayers.push(player);
      }
    });
    strategies[findById(strategy.id, strategies)] = strategy;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
  }

  public handleAddPlayersToBoss = (playerIds: string[]) => {
    // console.log(`[handleAddPlayersToBoss]`);
    const { strategies } = this.state;
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const newPlayers = strategy.players;
    
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      const player = newPlayers[playerIndex];

      player.bosses[accessor] = true;
      boss.cooldowns.push(...player.cooldowns);
    });

    bosses[accessor] = boss;
    strategies[findById(strategy.id, strategies)] = strategy;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
  };

  public handleDeletePlayers = (playerIds: string[]) => {
    const { strategies } = this.state;
    const { bosses, strategy } = this.getCurrentStrategy();
    const newPlayers = strategy.players;
    playerIds.map(playerId => {
      const playerIndex = getPlayerIndexById(playerId, newPlayers);
      const player = newPlayers[playerIndex];
      if (playerIndex === -1) {
        // console.log(`[handleDeletePlayer]: Player with playerId: ${playerId} not found in state.`);
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
    strategies[findById(strategy.id, strategies)] = strategy;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
  }

  public handleDeletePlayersFromBoss = (playerIds: string[]) => {
    const { strategies } = this.state;
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
    strategies[findById(strategy.id, strategies)] = strategy;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
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

  public handleChangeBoss = (id: number) => {
    console.log('[handleChangeBoss]');
    this.setLoadingTrue();
    this.setState({ currentBoss: id });
  }

  public handleCooldownPickerChange = (cooldownId: string, bossAbilityId: string, timer: number) => {
    const { strategies } = this.state;
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const cooldownIndex = findById(cooldownId, boss.cooldowns);
    boss.cooldowns[cooldownIndex].bossAbilities.push(bossAbilityId);
    boss.cooldowns[cooldownIndex].timers[boss.id].push(timer);
    bosses[accessor] = boss;
    strategies[findById(strategy.id, strategies)] = strategy;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
  }

  public handleRemoveCooldown = (bossAbilityId: string, cooldownId: string, timer: number) => {
    // console.log(`[handleRemoveCooldown]: ${bossAbilityId}, ${cooldownId}, ${timer}`);
    const { strategies } = this.state;
    const { accessor, boss, bosses, strategy } = this.getCurrentStrategy();
    const cooldownIndex = findById(cooldownId, boss.cooldowns);
    const cooldowns = boss.cooldowns[cooldownIndex]
    const { bossAbilities, timers } = cooldowns;
    const bossAbilityIndex = findById(bossAbilityId, bossAbilities);
    const timerIndex = timers[boss.id].findIndex(t => timer === t);
    bossAbilities.splice(bossAbilityIndex, 1);
    timers[boss.id].splice(timerIndex, 1);
    bosses[accessor] = boss;
    strategies[findById(strategy.id, strategies)] = strategy;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
  }

  public handleChangePhaseTimers = (timers: number[]) => {
    // console.log(timers);
    const { strategies } = this.state;
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
    // console.log(newPhases);
    const newAbilities = buildBossAbilityList(boss.id, newPhases, abilities);
    // console.log(newAbilities);
    boss.phases = newPhases;
    boss.abilities = newAbilities;
    bosses[accessor] = boss;
    strategies[findById(strategy.id, strategies)] = strategy;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
  }

  public handleImportState = (importString: string) => {
    // const newState = importString;
    // console.log(newState);
  }

  public handleExportState = (exportString: string) => {
    // console.log(exportString);
  }

  public toggleAuthDialog = (newState: AuthDialogState) => {
    this.setState(prevState => ({
      authOpen: !prevState.authOpen,
      authDialogState: newState
    }));
  }

  public closeAuthDialog = () => {
    this.setState({ authOpen: false, navBarAnchorEl: undefined });
  }

  // public buildUpdateStrategyPath = (strategy: Strategy) => {
  //   const strategies = dc(this.state.strategies);
  //   const { id } = strategy;
  //   if (id) {
  //     const oldStrategyIndex = findById(id, strategies);
  //     const oldStrategy = strategies[oldStrategyIndex];
  //     const deepDiff = (a: Strategy, b: Strategy) => {
  //       return _.transform(a, (result: any, value: any, key: any) => {
  //         if (!_.isEqual(value, b[key])) {
  //           result[key] = (_.isObject(value) && _.isObject(b[key])) ? deepDiff(value, b[key]) : value;
  //         }
  //       });
  //     }
  //     const diffs = deepDiff(strategy, oldStrategy);;
  //     strategies[oldStrategyIndex] = strategy;
  //     this.setState({ strategies });
  //     return diffs;
  //   }
  //   else {
  //     // console.log('Cannot update null strategy');
  //     return;
  //   }
  // }

  public handleUpdateStrategy = (strategy: Strategy) => {
    const strategies = dc(this.state.strategies);
    const { id } = strategy;
    console.log(id);
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
      const { user } = this.state;
      const preferences = dc(this.state.preferences);
      const { favourites } = preferences;
      const index = favourites.findIndex((strategyId: string) => strategyId === id);
      index === -1 ? favourites.push(id) : favourites.splice(index, 1);
      this.setState({ preferences }, () => updateUserPreferences(user.uid, preferences));
    }
  }

  public handleChangeAuthDialogState = (newState: AuthDialogState) => {
    this.setState({ authDialogState: newState });
  }

  public getStrategyTitle = () => {
    const { currentStrategy, strategies } = this.state;
    const strategy = strategies[findById(currentStrategy, strategies)];
    if (strategy) { return strategy.title; }
    else { return ''; }
  };

  public handleEditStrategyDescriptors = (a: IStrategyDescriptors) => {
    console.log('HANDLE EDIT STRATEGY DESCRIPTORS');
    const { strategies } = this.state;
    const { id, description, title } = a;
    const index = findById(id, strategies);
    const strategy = strategies[index];
    strategy.description = description;
    strategy.title = title;
    this.setState({ strategies }, () => this.handleUpdateStrategy(strategy));
  }
  public render() {
    const { authCredential, authOpen, authDialogState, currentBoss, currentRaid, navBarAnchorEl, sideMenuOpen, exportOpen, importOpen, currentStrategy, preferences, strategies, user, loading, initLoading } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar
          toggleSideMenu={this.toggleSideMenu}
          sideMenuOpen={sideMenuOpen}
          importOpen={importOpen}
          exportOpen={exportOpen}
          strategyTitle={this.getStrategyTitle()}
        >
          <NavBarActions>
            <Link to='/'>
              <NavBarAction
                title='Show Strategy List'
                onClick={() => { this.setState({ currentStrategy: '' }) }}
                iconComponent={<AppIcon />}
              />
            </Link>
            <NavBarAction
              title='Import'
              onClick={this.toggleImportStateDialog}
              iconComponent={<SaveAltIcon />}
            />
            <NavBarAction
              title='Export'
              onClick={this.toggleExportStateDialog}
              iconComponent={<ShareIcon />}
            />
          </NavBarActions>
          <div className={classes.divider}>|</div>
          <NavBarAccount
            anchorEl={navBarAnchorEl}
            handleClick={this.navBarhandleClick}
            handleClose={this.navBarHandleClose}
            handleSignOut={handleSignOut}
            toggleAuthDialog={this.toggleAuthDialog}
            user={user}
          />
        </NavBar>
        <SideMenu
          closeMenu={this.closeSideMenu}
          currentBoss={currentBoss}
          currentRaid={currentRaid}
          handleChange={this.handleChangeBoss}
          openMenu={this.openSideMenu}
          open={sideMenuOpen}
          strategyId={currentStrategy}
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
          authDialogState={authDialogState}
          handleChangeAuthDialogState={this.handleChangeAuthDialogState}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
          closeDialog={this.closeAuthDialog}
        />
        {initLoading === true ? (
          <CircularProgress className={classes.loading} size={96} />
        ) : (
          <Aux>
            { loading && <CircularProgress className={classes.loading} size={96} /> }
            <Grid container={true} spacing={16} className={classNames(classes.content, loading && classes.hidden)}>
              <MainContent
                addPlayers={this.handleAddPlayers}
                addPlayersToBoss={this.handleAddPlayersToBoss}
                currentStrategy={currentStrategy}
                deletePlayers={this.handleDeletePlayers}
                deletePlayersFromBoss={this.handleDeletePlayersFromBoss}
                handleChangeBoss={this.handleChangeBoss}
                handleEditStrategyDescriptors={this.handleEditStrategyDescriptors}
                handleFinishedLoading={this.handleFinishedLoading}
                handleSelectStrategy={this.handleSelectStrategy}
                handleCooldownPickerChange={this.handleCooldownPickerChange}
                handleChangePhaseTimers={this.handleChangePhaseTimers}
                buildTestPlayerList={this.buildTestPlayerList}
                handleRemoveCooldown={this.handleRemoveCooldown}
                handleToggleFavourite={this.handleToggleFavourite}
                preferences={preferences}
                strategies={strategies}
                buildNewStrategy={this.buildNewStrategy}
                userId={user.uid}
              />
            </Grid>
          </Aux>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
