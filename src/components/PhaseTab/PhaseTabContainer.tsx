import { StyleRulesCallback, Tab, Tabs, TextField, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Phase } from '../../classes/Phase';

export interface IPhaseTabContainerProps {
  currentPhase: number;
  handleChangePhase: ((event: any, newPhase: number) => void);
  handleChangePhaseTimer: ((event: any, phaseId: number, timer: number) => void);
  phases: Phase[];
}

export interface IPhaseTabContainerState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  timeInput: {

  }
});

class PhaseTabContainer extends React.Component<WithStyles<any> & IPhaseTabContainerProps, IPhaseTabContainerState> {
  public handleChange = (phaseId: number, timer: number) => (event: any) => {
    this.props.handleChangePhaseTimer(event, phaseId, timer);
  }

  public render() {
    const { classes, currentPhase, handleChangePhase, phases } = this.props;
    return (
      <div className={classes.root}>
        {phases.map((phase, index) => {
          const time = phase.timer;
          return (
            <TextField
              key={index}
              id={`phase-${phase.id}`}
              className={classes.timeInput}
              type='number'
              label='Start Time (s)'
              // tslint:disable-next-line:jsx-no-lambda
              onChange={this.handleChange(phase.id, time)}
              defaultValue={time}
            />
          )
        })}
        <Tabs
          value={currentPhase}
          onChange={handleChangePhase}
          indicatorColor='primary'
          textColor='primary'
        >
          {phases.map((phase, index) => {
            return (
              <Tab key={index} label={phase.label} />
            )
          })}
        </Tabs>
      </div>
    );
  }
}

export default withStyles(styles)(PhaseTabContainer)