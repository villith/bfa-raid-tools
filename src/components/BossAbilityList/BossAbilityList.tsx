import { StyleRulesCallback, Table, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import BossAbilityListHeader from './BossAbilityListHeader';
import BossAbilityListRow from './BossAbilityListRow';

export interface IBossAbilityListProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class BossAbilityList extends React.Component<WithStyles<any> & IBossAbilityListProps> {
  public render() {
    const { bossAbilities, cooldowns } = this.props;
    return (
      <Table style={{ tableLayout: 'auto' }}>
        <BossAbilityListHeader />
        <TableBody>
          {bossAbilities.map(bossAbility => {
            const { firstCast, cooldownTypes, icon, id, label, spellId } = bossAbility;
            const assignedCooldowns = bossAbility.cooldowns;
            return <BossAbilityListRow
              key={id}
              assignedCooldowns={assignedCooldowns}
              cooldowns={cooldowns}
              cooldownTypes={cooldownTypes}
              firstCast={firstCast}
              icon={icon}
              id={id}
              label={label}
              spellId={spellId}
            />
          })}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(BossAbilityList);
