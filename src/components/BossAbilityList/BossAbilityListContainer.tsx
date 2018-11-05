import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import ExportAngryAssignments from '../Dialogs/ExportAngryAssignments';
import PhaseTabContainer from '../PhaseTab/PhaseTabContainer';
import BossAbilityList from './BossAbilityList';
import BossAbilityListToolbar from './BossAbilityListToolbar';

export interface IBossAbilityListContainerProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  handleChangePhase: (event: any, newPhase: number) => void;
  handleChangePhaseTimer: (event: any, phaseId: number) => void;
  handleCooldownPickerChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  phases: Phase[];
  players: Player[];
}

export interface IBossAbilityListContainerState {
  angryAssignmentsExportOpen: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
  },
});

class BossAbilityListContainer extends React.Component<WithStyles<any> & IBossAbilityListContainerProps, IBossAbilityListContainerState> {
  public state = {
    angryAssignmentsExportOpen: false
  }
  public toggleAngryAssignmentsDialog = () => {
    this.setState(prevState => ({ angryAssignmentsExportOpen: !prevState.angryAssignmentsExportOpen }));
  }

  public closeAngryAssignmentsDialog = () => {
    this.setState({ angryAssignmentsExportOpen: false });
  }

  public handleExportAngryAssignments = (exportString: string) => {
    console.log(exportString);
  }
  
  public render() {
    const { bossAbilities, classes, cooldowns, currentPhase, handleChangePhase, handleChangePhaseTimer, handleCooldownPickerChange, phases, players } = this.props;
    return (
      <Paper className={classes.root}>
        <ExportAngryAssignments
          open={this.state.angryAssignmentsExportOpen}
          closeDialog={this.closeAngryAssignmentsDialog}
          exportAngryAssignments={this.handleExportAngryAssignments}
        />
        <BossAbilityListToolbar 
          toggleAngryAssignmentsDialog={this.toggleAngryAssignmentsDialog}
        />
        <PhaseTabContainer
          currentPhase={currentPhase}
          handleChangePhase={handleChangePhase}
          handleChangePhaseTimer={handleChangePhaseTimer}
          phases={phases}
        />
        <BossAbilityList
          bossAbilities={bossAbilities}
          cooldowns={cooldowns}
          currentPhase={currentPhase}
          handleCooldownPickerChange={handleCooldownPickerChange}
          phases={phases}
          players={players}
         />
      </Paper>
    );
  }
}

export default withStyles(styles)(BossAbilityListContainer)