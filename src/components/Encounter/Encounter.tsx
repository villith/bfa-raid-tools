import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Boss } from '../../classes/Boss';
import { Player, PlayerListType } from '../../classes/Player';
import BossAbilityListContainer from '../BossAbilityList/BossAbilityListContainer';
import PlayerListContainer from '../PlayerList/PlayerListContainer';
import { Aux } from '../winAux';

export interface IEncounterProps {
  boss: Boss;
  addPlayers: ((player: Player[]) => void);
  addPlayersToBoss: ((playerIds: string[]) => void);
  deletePlayers: ((playerIds: string[]) => void);
  deletePlayersFromBoss: ((playerIds: string[]) => void);
  handleCooldownPickerChange: ((cooldownId: string, bossAbilityId: string, timer: number) => void);
  handleChangePhaseTimer: ((event: any, phaseId: number) => void);
  players: Player[];
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
    const { addPlayers, addPlayersToBoss, boss, deletePlayers, deletePlayersFromBoss, handleChangePhaseTimer, handleCooldownPickerChange, players } = this.props;
    const { abilities, cooldowns, phases } = boss;
    return (
      <Aux>
        <Grid item={true} xs={6} md={4}>
          <PlayerListContainer
            addPlayers={addPlayers}
            addPlayersToBoss={addPlayersToBoss}
            deletePlayers={deletePlayers}
            deletePlayersFromBoss={deletePlayersFromBoss}
            players={players}
            currentBoss={boss.id}
            type={PlayerListType.BOSS_ROSTER}
          />
        </Grid>
        <Grid item={true} xs={6} md={8}> 
          <BossAbilityListContainer
            bossAbilities={abilities}
            cooldowns={cooldowns}
            currentPhase={currentPhase}
            handleCooldownPickerChange={handleCooldownPickerChange}
            handleChangePhase={this.handleChangePhase}
            handleChangePhaseTimer={handleChangePhaseTimer}
            phases={phases}
            players={players}
          />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(Encounter)