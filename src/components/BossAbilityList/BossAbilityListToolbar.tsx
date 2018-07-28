import { Button, StyleRulesCallback, Theme, Toolbar, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import { FilterList as FilterListIcon } from '@material-ui/icons';
import * as React from 'react';

export interface IBossAbilityListToolbarProps {
  placeholder?: string;
}

export interface IBossAbilityListToolbarState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
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
  public render() {
    const { classes } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant='title' id='BossAbilityListTitle'>
            COOLDOWNS
          </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title='Filter List'>
            <Button variant='flat'>
              <FilterListIcon />
            </Button>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(BossAbilityListToolbar)