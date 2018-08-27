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
  addPlayers: ((players: Player[]) => void);
  addPlayersToBoss: ((playerIds: string[]) => void);
  deletePlayers: ((playerIds: string[]) => void);
  deletePlayersFromBoss: ((playerIds: string[]) => void);
  handleCooldownPickerChange: ((cooldownId: string, bossAbilityId: string, timer: number) => void);
  handleChangePhaseTimer: ((event: any, phaseId: number) => void);
  players: Player[];
}

export interface IMainContentState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class MainContent extends React.Component<WithStyles<any> & IMainContentProps, IMainContentState> {
  public render() {
    const { boss, bosses, addPlayers, addPlayersToBoss, deletePlayers, deletePlayersFromBoss, handleChangePhaseTimer, handleCooldownPickerChange, players } = this.props;
    return (
      boss.id === BossUldir.HOME ? (
        <Home
          addPlayers={addPlayers}
          deletePlayers={deletePlayers}
          addPlayersToBoss={addPlayersToBoss}
          deletePlayersFromBoss={deletePlayersFromBoss}
          players={players}
          bosses={bosses}
        />
      ) : (
        <Encounter
          boss={boss}
          addPlayers={addPlayers}
          deletePlayers={deletePlayers}
          addPlayersToBoss={addPlayersToBoss}
          deletePlayersFromBoss={deletePlayersFromBoss}
          handleCooldownPickerChange={handleCooldownPickerChange}
          handleChangePhaseTimer={handleChangePhaseTimer}
          players={players}
        />
      )
    );
  }
}

export default withStyles(styles)(MainContent)