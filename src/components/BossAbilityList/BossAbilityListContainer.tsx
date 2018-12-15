import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Boss } from 'src/classes/Boss';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import ExportAngryAssignments from '../Dialogs/ExportAngryAssignments';
import PhaseTabContainer from '../PhaseTab/PhaseTabContainer';
import BossAbilityList from './BossAbilityList';
import BossAbilityListToolbar from './BossAbilityListToolbar';

export interface IBossAbilityListContainerProps {
  boss: Boss;
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  encounterId: string;
  handleChangePhase: (event: any, newPhase: number) => void;
  handleChangePhaseTimers: (timers: number[]) => void;
  handleCooldownPickerChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  handleRemoveCooldown: (pid: string, cid: string, timer: number) => void;
  phases: Phase[];
  players: Player[];
  focusedPlayerId: string;
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
    // console.log(exportString);
  }
  
  public render() {
    const { angryAssignmentsExportOpen } = this.state;
    const { boss, bossAbilities, classes, cooldowns, currentPhase, encounterId, focusedPlayerId, handleChangePhase, handleChangePhaseTimers, handleCooldownPickerChange, handleRemoveCooldown, phases, players } = this.props;
    const phaseStartTime = phases[phases.findIndex(p => p.id === currentPhase)].timer || 0;
    const phaseEndTime = currentPhase + 1 < phases.length
      ? phases[phases.findIndex(p => p.id === currentPhase + 1)].timer
      : 9999;
    // console.log(bossAbilities);
    const filteredBossAbilities = bossAbilities
      .filter(ba => ba.timer >= phaseStartTime && ba.timer < phaseEndTime)
      .sort((a, b) => a.timer - b.timer);
    // console.log(phaseStartTime, phaseEndTime);
    // console.log(filteredBossAbilities);
    return (
      <Paper className={classes.root}>
        <ExportAngryAssignments
          open={angryAssignmentsExportOpen}
          bossAbilities={bossAbilities}
          cooldowns={cooldowns}
          players={players}
          closeDialog={this.closeAngryAssignmentsDialog}
          exportAngryAssignments={this.handleExportAngryAssignments}
        />
        <BossAbilityListToolbar
          boss={boss}
          handleChangePhaseTimers={handleChangePhaseTimers}
          phases={phases}
          toggleAngryAssignmentsDialog={this.toggleAngryAssignmentsDialog}
        />
        <PhaseTabContainer
          bossAbilities={bossAbilities}
          cooldowns={cooldowns}
          currentPhase={currentPhase}
          focusedPlayerId={focusedPlayerId}
          handleChangePhase={handleChangePhase}
          phases={phases}
        />
        <BossAbilityList
          bossAbilities={filteredBossAbilities}
          cooldowns={cooldowns}
          currentPhase={currentPhase}
          encounterId={encounterId}
          focusedPlayerId={focusedPlayerId}
          handleCooldownPickerChange={handleCooldownPickerChange}
          phases={phases}
          players={players}
          handleRemoveCooldown={handleRemoveCooldown}
         />
      </Paper>
    );
  }
}

export default withStyles(styles)(BossAbilityListContainer)