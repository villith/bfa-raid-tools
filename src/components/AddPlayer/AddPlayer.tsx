import {
  FormControl,
  InputLabel,
  Select,
  StyleRulesCallback,
  TextField,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { CLASSES } from '../../constants/classes';
import { WOWClass } from '../../enums/WOWclass';
import { WOWSpec } from '../../enums/WOWspec';
import { getClassInfo } from '../../helpers/getClassInfo';


export interface IAddPlayerProps {
  playerClass: WOWClass;
  playerSpec: WOWSpec;
  playerName: string;
  handleNameChange: ((event: any) => void);
  handleClassChange: ((event: any) => void);
  handleSpecChange: ((event: any) => void);
}

export interface IAddPlayerState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
});

class AddPlayer extends React.Component<WithStyles<any> & IAddPlayerProps, IAddPlayerState> {
  public render() {
    const { classes, handleClassChange, handleNameChange, handleSpecChange, playerClass, playerName, playerSpec } = this.props;
    const classInfo = getClassInfo(playerClass);
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <TextField
            id='playerName'
            label={'Player Name'}
            value={playerName}
            onChange={handleNameChange}
            required={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Class</InputLabel>
          <Select
            native={true}
            value={playerClass}
            onChange={handleClassChange}
            inputProps={{
              name: 'WOWClass',
              id: 'wow-class'
            }}
          >
            {CLASSES.map((wc, index) => {
              return <option key={index} value={wc.id}>{wc.label}</option>
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Spec</InputLabel>
          <Select
            native={true}
            value={playerSpec}
            onChange={handleSpecChange}
            inputProps={{
              name: 'WOWSpec',
              id: 'wow-spec'
            }}
          >
            {classInfo.specs.map((ws, index) => {
              return <option key={index} value={ws.id}>{ws.name}</option>
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(AddPlayer)