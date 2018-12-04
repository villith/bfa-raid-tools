import { Badge, StyleRulesCallback, Tab, Tabs, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { BossAbility } from 'src/classes/BossAbility';
import { Cooldown } from 'src/classes/Cooldown';

import { Phase } from '../../classes/Phase';

export interface IPhaseTabContainerProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  focusedPlayerId: string;
  handleChangePhase: (event: any, newPhase: number) => void;
  phases: Phase[];
}

export interface IPhaseTabContainerState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  hidden: {
    visibility: 'hidden'
  },
  timeInputContainer: {
    display: 'inline',
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
  }
});

class PhaseTabContainer extends React.Component<WithStyles<any> & IPhaseTabContainerProps, IPhaseTabContainerState> {
  public getFocusedPlayerCooldownCount = (): number[] => {
    const { bossAbilities, cooldowns, focusedPlayerId, phases } = this.props;
    // console.log(focusedPlayerId);
    if (focusedPlayerId.length > 0) {
      const cooldownCounts = phases.map(phase => {
        const currentPhase = phase.id;
        const phaseStartTime = phases[phases.findIndex(p => p.id === currentPhase)].timer || 0;
        const phaseEndTime = currentPhase + 1 < phases.length
          ? phases[phases.findIndex(p => p.id === currentPhase + 1)].timer
          : 9999;
        const filteredBossAbilities = bossAbilities.filter(ba => ba.timer >= phaseStartTime && ba.timer < phaseEndTime);
        // console.log(filteredBossAbilities);
        const filteredCooldowns = cooldowns.filter(cd => cd.owner === focusedPlayerId);
        // console.log(filteredCooldowns);
        const filterByFocusedPlayer = filteredBossAbilities.filter(ba => {
          let result = false;
          for (const cd of filteredCooldowns) {
            if (cd.bossAbilities.includes(ba.id)) {
              result = true;
              break;
            };
          }
          return result;
        }); 
        return filterByFocusedPlayer.length;
      });
      return cooldownCounts;
    }
    return Array(phases.length).fill(0);
  }

  public render() {
    const { classes, currentPhase, handleChangePhase, phases } = this.props;
    const focusedPlayerCooldownCounts = this.getFocusedPlayerCooldownCount();
    return (
      <div className={classes.root}>
        {/* {phases.map((phase, index) => {
          const time = phase.timer;
          return (
            <div key={index} className={classes.timeInputContainer}>
              <TextField
                id={`phase-${phase.id}`}
                className={classes.timeInput}
                type='number'
                label={`${phase.label}`}
                // tslint:disable-next-line:jsx-no-lambda
                onChange={this.handleChange(phase.id, time)}
                defaultValue={time}
              />
            </div>
          )
        })} */}
        <Tabs
          value={currentPhase}
          onChange={handleChangePhase}
          indicatorColor='primary'
          textColor='primary'
          fullWidth={true}
          centered={true}
        >
          {phases.map((phase, index) => {
            const count = focusedPlayerCooldownCounts[index];
            return (
              <Tab key={index} label={
                count > 0 ? (
                  <Badge color='secondary' badgeContent={count} className={classes.padding}>
                    {phase.label}
                  </Badge>
                ) : (
                  <Badge color='secondary' badgeContent={count} classes={{ badge: classes.hidden }}>
                    {phase.label}
                  </Badge>
                )
              }/>
            )
          })}
        </Tabs>
      </div>
    );
  }
}

export default withStyles(styles)(PhaseTabContainer)