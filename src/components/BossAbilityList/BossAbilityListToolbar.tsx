import {
  Button,
  Grow,
  List,
  ListItem,
  Paper,
  Popper,
  StyleRulesCallback,
  TextField,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { AccessTime as TimeIcon, Share as ShareIcon } from '@material-ui/icons';
import * as React from 'react';
import { Boss } from 'src/classes/Boss';
import { Phase } from 'src/classes/Phase';
import { getBossInfo } from 'src/helpers/getters';

export interface IBossAbilityListToolbarProps {
  boss: Boss;
  handleChangePhaseTimers: (timers: number[]) => void;
  phases: Phase[];
  toggleAngryAssignmentsDialog: () => void;
}

export interface IBossAbilityListToolbarState {
  anchorEl: any;
  phaseTimersVisible: boolean;
  phaseTimers: string[];
  tempPhaseTimers: string[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  popper: {
    zIndex: 1
  },
  root: {},
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
});

class BossAbilityListToolbar extends React.Component<WithStyles<any> & IBossAbilityListToolbarProps, IBossAbilityListToolbarState> {
  public state = {
    anchorEl: null,
    phaseTimersVisible: false,
    phaseTimers: Array(this.props.phases.length).fill(0),
    tempPhaseTimers: [],
  }

  public componentDidMount = () => {
    const { phases } = this.props;
    const phaseTimers = phases.map(phase => `${phase.timer}`);
    // console.log('a');
    this.setState({ phaseTimers, tempPhaseTimers: [...phaseTimers] });
  }

  public handleChange = (index: number) => (event: any) => {
    const { phaseTimers } = this.state;
    const { currentTarget } = event;
    const value = parseInt(currentTarget.value, 10);
    if (value) {
      phaseTimers[index] = value;
      this.setState({ phaseTimers });
    }
  }

  public handleSubmitDefaultPhaseTimers = () => {
    const { boss } = this.props;
    const bossInfo = getBossInfo(boss.raidId, boss.id);
    const timers = bossInfo.phases.map(phase => `${phase.estimatedStartTime}`);
    this.setState({ phaseTimers: [...timers] });
  }

  public handleSubmitPhaseTimers = () => {
    const { phaseTimers } = this.state;
    this.setState({ tempPhaseTimers: [...phaseTimers], phaseTimersVisible: false }, () => {
      this.props.handleChangePhaseTimers(phaseTimers);
    });
  }

  public hidePhaseTimersDialog = () => {
    const { tempPhaseTimers } = this.state;
    this.setState({ phaseTimersVisible: false, phaseTimers: [...tempPhaseTimers] });
  }

  public togglePhaseTimersDialog = (event: any) => {
    const { currentTarget } = event;
    this.setState(prevState => ({ 
      anchorEl: currentTarget,
      phaseTimersVisible: !prevState.phaseTimersVisible
    }));
  }

  public render() {
    const { anchorEl, phaseTimers,  phaseTimersVisible } = this.state;
    const { classes, phases, toggleAngryAssignmentsDialog } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant='h6' id='BossAbilityListTitle'>
            COOLDOWNS
          </Typography>
        </div>
        <div className={classes.spacer} />
          <Popper id={'phaseTimerPopper'} open={phaseTimersVisible} placement={'left-start'} anchorEl={anchorEl} transition={true} className={classes.popper}>
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} timeout={350}>
                <Paper elevation={5}>
                  <List>
                    {phases.map((phase, index) => {
                      const timer = phaseTimers[index];
                      return (
                        <ListItem key={index}>
                          <TextField
                            id={`phase-${phase.id}`}
                            className={classes.timeInput}
                            type='number'
                            label={`${phase.label}`}
                            onChange={this.handleChange(index)}
                            value={timer}
                            inputProps={{
                              style: { textAlign: 'right' }
                            }}
                          />
                        </ListItem>
                      )
                    })}
                  </List>
                  <div className={classes.buttons}>
                    <Button variant='text' color='default' onClick={this.handleSubmitDefaultPhaseTimers}>RESTORE DEFAULT</Button>
                    <Button variant='text' color='primary' onClick={this.handleSubmitPhaseTimers}>SAVE</Button>
                    <Button variant='text' color='secondary' onClick={this.hidePhaseTimersDialog}>CANCEL</Button>
                  </div>
                </Paper>
              </Grow>
            )}
          </Popper>
        <div className={classes.actions}>
          <Tooltip title='Edit Phase Timers'>
            <Button variant='text' onClick={this.togglePhaseTimersDialog}>
              <TimeIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Filter List'>
            <Button variant='text' onClick={toggleAngryAssignmentsDialog}>
              <ShareIcon />
            </Button>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(BossAbilityListToolbar)