import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import PhaseTabContainer from '../PhaseTab/PhaseTabContainer';
import BossAbilityList from './BossAbilityList';
import BossAbilityListToolbar from './BossAbilityListToolbar';

export interface IBossAbilityListContainerProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  handleChangePhase: ((event: any, newPhase: number) => void);
  phases: Phase[];
  players: Player[];
}

export interface IBossAbilityListContainerState {
  phaseTimers: { [index: number]: number }
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
});

class BossAbilityListContainer extends React.Component<WithStyles<any> & IBossAbilityListContainerProps, IBossAbilityListContainerState> {
  public state = {
    phaseTimers: {} as { [index: number]: number }
  }

  public handleChangePhaseTimer = (event: any, phaseId: number) => {
    const phaseTimers = Object.assign({}, this.state.phaseTimers);
    let newValue = parseInt(event.target.value, 10);
    if (newValue > 600) { newValue = 600 }
    if (newValue < 0) { newValue = 0 }
    const nextPhase = phaseTimers[phaseId + 1];
    console.log(newValue, nextPhase);
    if (nextPhase && newValue > nextPhase) {
      console.log(newValue, nextPhase);
      newValue = nextPhase - 1;
    }
    phaseTimers[phaseId] = newValue;
    this.setState({ phaseTimers });
  }

  public render() {
    const { bossAbilities, classes, cooldowns, currentPhase, handleChangePhase, phases, players } = this.props;
    return (
      <Paper className={classes.root}>
        <BossAbilityListToolbar />
        <PhaseTabContainer
          currentPhase={currentPhase}
          handleChangePhase={handleChangePhase}
          handleChangePhaseTimer={this.handleChangePhaseTimer}
          phases={phases}
          phaseTimers={this.state.phaseTimers}
        />
        <BossAbilityList
          bossAbilities={bossAbilities}
          cooldowns={cooldowns}
          currentPhase={currentPhase}
          phaseTimers={this.state.phaseTimers}
          players={players}
         />
      </Paper>
    );
  }
}

export default withStyles(styles)(BossAbilityListContainer)