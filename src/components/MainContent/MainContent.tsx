import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, RouteComponentProps, StaticContext, Switch } from 'react-router';
import { Strategy } from 'src/classes/Strategy';

import { IBossMap } from '../../classes/Boss';
import { Player } from '../../classes/Player';
import { IPreferences } from '../App/App';
import Encounter from '../Encounter/Encounter';
import Home from '../Home/Home';
import StrategyList from '../StrategyList/StrategyList';
import TwitchWidgetContainer from '../Widgets/TwitchWidget/TwitchWidgetContainer';
import { Aux } from '../winAux';

export interface IMainContentProps {
  bosses: IBossMap;
  addPlayers: (players: Player[]) => void;
  addPlayersToBoss: (playerIds: string[]) => void;
  buildNewStrategy: (callback: (sid: string) => void) => void;
  deletePlayers: (playerIds: string[]) => void;
  deletePlayersFromBoss: (playerIds: string[]) => void;
  handleChangeBoss: (id: number) => void;
  handleSelectStrategy: (id: string, callback?: (id: string) => void) => void;
  handleCooldownPickerChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  handleChangePhaseTimers: (timers: number[]) => void;
  handleRemoveCooldown: (pid: string, cid: string, timer: number) => void;
  handleToggleFavourite: (id: string) => void;
  preferences: IPreferences;
  strategies: Strategy[];
  buildTestPlayerList: () => void;
  players: Player[];
}

export interface IMainContentState {
  focusedPlayerId: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class MainContent extends React.Component<WithStyles<any> & IMainContentProps, IMainContentState> {
  public state = {
    focusedPlayerId: ''
  }

  public changeFocusedPlayerId = (id: string) => {
    const { focusedPlayerId } = this.state;
    if (id === focusedPlayerId) {
      this.setState({ focusedPlayerId: '' });
    }
    else {
      this.setState({ focusedPlayerId: id });
    }
  }

  public render() {
    const { focusedPlayerId } = this.state;
    const { buildNewStrategy, handleSelectStrategy, handleChangeBoss, handleToggleFavourite, preferences, strategies, bosses, buildTestPlayerList, addPlayers, addPlayersToBoss, handleRemoveCooldown, deletePlayers, deletePlayersFromBoss, handleChangePhaseTimers, handleCooldownPickerChange, players } = this.props;
    const strategyListPage = () => {
      return (
        <Aux>
          <Grid item={true} xs={8} sm={9}>
            <StrategyList
              buildNewStrategy={buildNewStrategy}
              handleToggleFavourite={handleToggleFavourite}
              preferences={preferences}
              strategies={strategies}
              handleSelectStrategy={handleSelectStrategy}
            />
          </Grid>
          <Grid item={true} xs={4} sm={3}>
            <TwitchWidgetContainer />
          </Grid>
        </Aux>
      );
    };

    const encounterPage = (props: RouteComponentProps<any, StaticContext, any>) => {
      const { strategyId, encounterId } = props.match.params;
      const boss = bosses[encounterId];
      return (
        encounterId === 0 || encounterId === undefined ? (
          <Home
            addPlayers={addPlayers}
            deletePlayers={deletePlayers}
            addPlayersToBoss={addPlayersToBoss}
            deletePlayersFromBoss={deletePlayersFromBoss}
            players={players}
            bosses={bosses}
            focusedPlayerId={focusedPlayerId}
            changeFocusedPlayerId={this.changeFocusedPlayerId}
            buildTestPlayerList={buildTestPlayerList}
            strategyId={strategyId}
            handleSelectStrategy={handleSelectStrategy}
          />
        ) : (
          boss ? (
            <Encounter
              encounterId={encounterId}
              strategyId={strategyId}
              boss={boss}
              addPlayers={addPlayers}
              deletePlayers={deletePlayers}
              addPlayersToBoss={addPlayersToBoss}
              deletePlayersFromBoss={deletePlayersFromBoss}
              handleSelectStrategy={handleSelectStrategy}
              handleChangeBoss={handleChangeBoss}
              handleCooldownPickerChange={handleCooldownPickerChange}
              handleChangePhaseTimers={handleChangePhaseTimers}
              handleRemoveCooldown={handleRemoveCooldown}
              players={players}
              focusedPlayerId={focusedPlayerId}
              changeFocusedPlayerId={this.changeFocusedPlayerId}
            />
          ) : (
            <div>ABC</div>
          )
        )
      )
    }

    return (
      <Switch>
        <Route exact={true} path='/' render={strategyListPage} />
        <Route path='/:strategyId/:encounterId?' render={(props) => encounterPage(props)} />
      </Switch>
    )
  }
}

export default withStyles(styles)(MainContent);