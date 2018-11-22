import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Boss, IBossMap } from '../../classes/Boss';
import { Player } from '../../classes/Player';
import { BossUldir } from '../../enums/bossUldir';
import Encounter from '../Encounter/Encounter';
import Home from '../Home/Home';

export interface IMainContentProps {
  boss: Boss;
  bosses: IBossMap;
  addPlayers: (players: Player[]) => void;
  addPlayersToBoss: (playerIds: string[]) => void;
  deletePlayers: (playerIds: string[]) => void;
  deletePlayersFromBoss: (playerIds: string[]) => void;
  handleCooldownPickerChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  handleChangePhaseTimers: (timers: number[]) => void;
  handleRemoveCooldown: (pid: string, cid: string, timer: number) => void;
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
    if (id) {
      if (id === focusedPlayerId) {
        this.setState({ focusedPlayerId: '' });
      }
      else {
        this.setState({ focusedPlayerId: id });
      }
    }
    else {
      this.setState({ focusedPlayerId: '' });
    }
  }

  public render() {
    const { focusedPlayerId } = this.state;
    const { boss, bosses, buildTestPlayerList, addPlayers, addPlayersToBoss, handleRemoveCooldown, deletePlayers, deletePlayersFromBoss, handleChangePhaseTimers, handleCooldownPickerChange, players } = this.props;
    return (
      boss.id === BossUldir.HOME ? (
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
        />
      ) : (
        <Encounter
          boss={boss}
          addPlayers={addPlayers}
          deletePlayers={deletePlayers}
          addPlayersToBoss={addPlayersToBoss}
          deletePlayersFromBoss={deletePlayersFromBoss}
          handleCooldownPickerChange={handleCooldownPickerChange}
          handleChangePhaseTimers={handleChangePhaseTimers}
          handleRemoveCooldown={handleRemoveCooldown}
          players={players}
          focusedPlayerId={focusedPlayerId}
          changeFocusedPlayerId={this.changeFocusedPlayerId}
        />
      )
    );
  }
}

export default withStyles(styles)(MainContent)