import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { getPlayersByBoss } from 'src/helpers/bossFilter';

import { Boss } from '../../classes/Boss';
import { Player, PlayerListType } from '../../classes/Player';
import BossAbilityListContainer from '../BossAbilityList/BossAbilityListContainer';
import PlayerListContainer from '../PlayerList/PlayerListContainer';
import { Aux } from '../winAux';

export interface IEncounterProps {
  boss: Boss;
  addPlayers: (player: Player[]) => void;
  addPlayersToBoss: (playerIds: string[]) => void;
  deletePlayers: (playerIds: string[]) => void;
  deletePlayersFromBoss: (playerIds: string[]) => void;
  handleCooldownPickerChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  handleChangePhaseTimers: (timers: number[]) => void;
  handleRemoveCooldown: (pid: string, cid: string, timer: number) => void;
  players: Player[];
  focusedPlayerId: string;
  changeFocusedPlayerId: (id: string) => void;
}

export interface IEncounterState {
  currentPhase: number;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class Encounter extends React.Component<WithStyles<any> & IEncounterProps, IEncounterState> {
  public state = {
    currentPhase: 0
  }
  
  public handleChangePhase = (event: any, newPhase: number) => {
    console.log(`[handleChangePhase]: ${newPhase}`);
    this.setState({ currentPhase: newPhase });
  }

  public render() {
    const { currentPhase } = this.state;
    const { addPlayers, addPlayersToBoss, boss, changeFocusedPlayerId, handleRemoveCooldown, focusedPlayerId, deletePlayers, deletePlayersFromBoss, handleChangePhaseTimers, handleCooldownPickerChange, players } = this.props;
    const { abilities, cooldowns, phases } = boss;
    const playerList = getPlayersByBoss(boss.id, players);
    return (
      <Aux>
        <Grid item={true} xs={6} md={4}>
          <PlayerListContainer
            addPlayers={addPlayers}
            addPlayersToBoss={addPlayersToBoss}
            deletePlayers={deletePlayers}
            deletePlayersFromBoss={deletePlayersFromBoss}
            focusedPlayerId={focusedPlayerId}
            changeFocusedPlayerId={changeFocusedPlayerId}
            players={players}
            playerList={playerList}
            currentBoss={boss.id}
            type={PlayerListType.BOSS_ROSTER}
          />
        </Grid>
        <Grid item={true} xs={6} md={8}> 
          <BossAbilityListContainer
            boss={boss}
            bossAbilities={abilities}
            cooldowns={cooldowns}
            currentPhase={currentPhase}
            handleCooldownPickerChange={handleCooldownPickerChange}
            handleChangePhase={this.handleChangePhase}
            handleChangePhaseTimers={handleChangePhaseTimers}
            handleRemoveCooldown={handleRemoveCooldown}
            focusedPlayerId={focusedPlayerId}
            phases={phases}
            players={players}
          />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(Encounter)