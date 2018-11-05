import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Cooldown } from '../../classes/Cooldown';

export interface ICooldownListProps {
  cooldowns: Cooldown[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
});

class CooldownList extends React.Component<WithStyles<any> & ICooldownListProps> {
  public render() {
    const { classes, cooldowns } = this.props;
    return (
      <Paper className={classes.root}>
        {cooldowns.map(cooldown => cooldown.label)}
      </Paper>
    );
  }
}

export default withStyles(styles)(CooldownList);
