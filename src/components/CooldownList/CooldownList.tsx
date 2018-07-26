import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Cooldown } from '../../classes/Cooldown';

export interface ICooldownListProps {
  cooldowns: Cooldown[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({});

class CooldownList extends React.Component<WithStyles<any> & ICooldownListProps> {
  public render() {
    const { cooldowns } = this.props;
    return (
      <Paper>
        {cooldowns.map(cooldown => cooldown.name)}
      </Paper>
    );
  }
}

export default withStyles(styles)(CooldownList);
