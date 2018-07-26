import { Button, StyleRulesCallback, Theme, Toolbar, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Add as AddIcon, Delete as DeleteIcon, FilterList as FilterListIcon } from '@material-ui/icons';
import * as React from 'react';

export interface IPlayerListToolbarProps {
  numSelected: number;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
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

class PlayerListToolbar extends React.Component<WithStyles<any> & IPlayerListToolbarProps> {
  public render() {
    const { classes, numSelected } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color='inherit' variant='subheading'>
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant='title' id='tableTitle'>
              Roster
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title='Add Player'>
            <Button variant='flat' color='primary'>
              <AddIcon />
            </Button>
          </Tooltip>
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

