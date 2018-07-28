import { Button, StyleRulesCallback, Theme, Toolbar, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Add as AddIcon, Clear as ClearIcon, Delete as DeleteIcon, Done as DoneIcon, FilterList as FilterListIcon } from '@material-ui/icons';
import * as React from 'react';
import { Aux } from '../winAux';

export interface IPlayerListToolbarProps {
  addPlayerVisible: boolean;
  confirmAddPlayer: (() => void);
  toggleAddPlayer: (() => void);
  numSelected: number;
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
    const { addPlayerVisible, classes, confirmAddPlayer, numSelected, toggleAddPlayer } = this.props;
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
            <Tooltip title='Add Player'>
              <Button variant='flat' color='primary' onClick={toggleAddPlayer}>
                <AddIcon />
              </Button>
            </Tooltip>
          )}
          {numSelected > 0 ? (
            <Tooltip title='Delete'>
              <Button variant='flat' color='secondary'>
                <DeleteIcon />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title='Filter List'>
              <Button variant='flat'>
                <FilterListIcon />
              </Button>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
};

export default withStyles(styles)(PlayerListToolbar);

