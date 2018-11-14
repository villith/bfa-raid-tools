import { Badge, StyleRulesCallback, Tab, Tabs, Theme, WithStyles, withStyles } from '@material-ui/core';
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
  root: {
    width: '100%',
  },
  timeInputContainer: {
    display: 'inline',
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
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
            return (
              <Tab key={index} label={
                <Badge color='secondary' badgeContent={1}>
                  {phase.label}
                </Badge>
              }/>
            )
          })}
        </Tabs>
      </div>
    );
  }
}

export default withStyles(styles)(PhaseTabContainer)