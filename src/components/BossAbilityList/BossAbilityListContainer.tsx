import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import PhaseTabContainer from '../PhaseTab/PhaseTabContainer';
import BossAbilityList from './BossAbilityList';
import BossAbilityListToolbar from './BossAbilityListToolbar';

export interface IBossAbilityListContainerProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  handleChangePhase: ((event: any, newPhase: number) => void);
  phases: any[];
}

export interface IBossAbilityListContainerState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
});

class BossAbilityListContainer extends React.Component<WithStyles<any> & IBossAbilityListContainerProps, IBossAbilityListContainerState> {
  public render() {
    const { bossAbilities, classes, cooldowns, currentPhase, handleChangePhase, phases } = this.props;
    return (
      <Paper className={classes.root}>
        <BossAbilityListToolbar />
        <PhaseTabContainer
          currentPhase={currentPhase}
          handleChange={handleChangePhase}
          phases={phases}
        />
        <BossAbilityList
          bossAbilities={bossAbilities}
          cooldowns={cooldowns}
         />
      </Paper>
    );
  }
}

export default withStyles(styles)(BossAbilityListContainer)