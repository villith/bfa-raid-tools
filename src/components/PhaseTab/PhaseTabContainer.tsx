import { StyleRulesCallback, Tab, Tabs, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface IPhaseTabContainerProps {
  currentPhase: number;
  handleChange: ((event: any, newPhase: number) => void);
  phases: any[];
}

export interface IPhaseTabContainerState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class PhaseTabContainer extends React.Component<WithStyles<any> & IPhaseTabContainerProps, IPhaseTabContainerState> {
  public render() {
    const { classes, currentPhase, handleChange, phases } = this.props;
    return (
      <div className={classes.root}>
        <Tabs
          value={currentPhase}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
        >
          {phases.map(phase => {
            return <Tab
              key={phase.id}
              label={phase.label}
            />
          })}
        </Tabs>
      </div>
    );
  }
}

export default withStyles(styles)(PhaseTabContainer)