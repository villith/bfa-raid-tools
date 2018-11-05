import { Button, StyleRulesCallback, Theme, Toolbar, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
  Add as AddIcon,
  Clear as ClearIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  GroupAdd as GroupAddIcon,
  Mood as MoodIcon,
} from '@material-ui/icons';
import * as React from 'react';

import { PlayerListType } from '../../classes/Player';
import { Aux } from '../winAux';

export interface IPlayerListToolbarProps {
  addPlayerVisible: boolean;
  buildTestPlayerList?: () => void;
  confirmAddPlayer: () => void;
  deletePlayers: () => void;
  toggleAddPlayer: () => void;
  toggleImportPlayers: () => void;
  numSelected: number;
  type: PlayerListType;
}

export interface IPlayerListToolbarState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  actions: {
    display: 'flex',
  },
  cancelButton: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
  },
  confirmButton: {
    backgroundColor: 'white',
    color: '#4caf50',
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    '&:hover': {
      backgroundColor: lighten('#4caf50', 0.85)
    }
  },
  highlight:
  theme.palette.type === 'light'
    ? {
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        color: theme.palette.secondary.main,        
      }
    : {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.text.primary,
      },
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
});

class PlayerListToolbar extends React.Component<WithStyles<any> & IPlayerListToolbarProps, IPlayerListToolbarState> {
  public render() {
    const { addPlayerVisible, buildTestPlayerList, classes, confirmAddPlayer, deletePlayers, numSelected, toggleAddPlayer, toggleImportPlayers, type } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color='inherit' variant='subheading'>
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant='title' id='tableTitle'>
              ROSTER
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {addPlayerVisible ? (
            <Aux>
              <Tooltip title='Confirm'>
                <Button variant='flat' className={classes.confirmButton} onClick={confirmAddPlayer}>
                  <DoneIcon />
                </Button>
              </Tooltip>
              <Tooltip title='Cancel'>
                <Button variant='flat' color='secondary' className={classes.cancelButton} onClick={toggleAddPlayer}>
                  <ClearIcon />
                </Button>
              </Tooltip> 
            </Aux>
          ) : (
            <Aux>
              {type === PlayerListType.ALL && 
                <Tooltip title='Add Test Players'>
                  <Button variant='flat' color='primary' onClick={buildTestPlayerList}>
                    <MoodIcon />
                  </Button>
                </Tooltip>
              }
              {type === PlayerListType.BOSS_ROSTER &&
                <Tooltip title='Import Players'>
                  <Button variant='flat' color='primary' onClick={toggleImportPlayers}>
                    <GroupAddIcon />
                  </Button>
                </Tooltip>
              }
              <Tooltip title='Add New Player'>
                <Button variant='flat' color='primary' onClick={toggleAddPlayer}>
                  <AddIcon />
                </Button>
              </Tooltip>
            </Aux>
          )}
          {numSelected > 0 ? (
            <Tooltip title='Delete'>
              <Button variant='flat' color='secondary' onClick={deletePlayers}>
                <DeleteIcon />
              </Button>
            </Tooltip>
          ) : ( null )}
        </div>
      </Toolbar>
    );
  }
};

export default withStyles(styles)(PlayerListToolbar);

