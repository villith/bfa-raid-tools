import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Boss, BossType } from '../../classes/Boss';
import { Cooldown } from '../../classes/Cooldown';
import { Player, PlayerListType } from '../../classes/Player';
import { getPlayersByBoss } from '../../helpers/bossFilter';
import BossAbilityListContainer from '../BossAbilityList/BossAbilityListContainer';
import PlayerListContainer from '../PlayerList/PlayerListContainer';
import { Aux } from '../winAux';

export interface IEncounterProps {
  boss: Boss;
  addPlayers: ((player: Player[]) => void);
  addPlayersToBoss: ((playerIds: string[], boss: BossType) => void);
  deletePlayers: ((playerIds: string[]) => void);
  deletePlayersFromBoss: ((playerIds: string[], boss: BossType) => void);
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

  public getPlayerCooldowns = () => {
    const players = getPlayersByBoss(this.props.boss.id, this.props.players);
    const cooldowns: Cooldown[] = [];
    players.map(player => {
      cooldowns.push(...player.cooldowns);
    });
    return cooldowns;
  }

  public render() {
    const { currentPhase } = this.state;
    const { addPlayers, addPlayersToBoss, boss, deletePlayers, deletePlayersFromBoss, handleCooldownPickerChange, players } = this.props;
    const { abilities, phases } = boss;
    const cooldowns = this.getPlayerCooldowns();
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
            phases={phases}
            players={players}
          />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(Encounter)