import { Paper, StyleRulesCallback, Table, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import BossAbilityListHeader from './BossAbilityListHeader';
import BossAbilityListRow from './BossAbilityListRow';
import BossAbilityListToolbar from './BossAbilityListToolbar';

export interface IBossAbilityListProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
});

class BossAbilityList extends React.Component<WithStyles<any> & IBossAbilityListProps> {
  public render() {
    const { classes, bossAbilities } = this.props;
    return (
      <Paper className={classes.root}>
        <BossAbilityListToolbar />
        <Table style={{ tableLayout: 'auto' }}>
          <BossAbilityListHeader />
          <TableBody>
            {...bossAbilities
              .map(bossAbility => {
                const { icon, id, label, spellId } = bossAbility;
                return <BossAbilityListRow
                  key={id}
                  icon={icon}
                  id={id}
                  label={label}
                  spellId={spellId}
                />
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(BossAbilityList);
