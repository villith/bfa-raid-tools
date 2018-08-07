import { StyleRulesCallback, Table, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Player } from '../../classes/Player';
import BossAbilityListHeader from './BossAbilityListHeader';
import BossAbilityListRow from './BossAbilityListRow';

export interface IBossAbilityListProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  handleCooldownPickerChange: ((event: any) => void);
  phaseTimers: { [index: number]: number };
  players: Player[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class BossAbilityList extends React.Component<WithStyles<any> & IBossAbilityListProps> {
  public render() {
    const { bossAbilities, cooldowns, currentPhase, handleCooldownPickerChange, players } = this.props;
    return (
      <Table>
        <BossAbilityListHeader />
        <TableBody>
          {bossAbilities
            .filter(ba => ba.phases.indexOf(currentPhase) !== -1)
            .map((bossAbility, index) => {
              const { firstCast, cooldownTypes, icon, id, label, spellId } = bossAbility;
              const assignedCooldowns = bossAbility.cooldowns;
              return <BossAbilityListRow
                key={index}
                assignedCooldowns={assignedCooldowns}
                cooldowns={cooldowns}
                cooldownTypes={cooldownTypes}
                firstCast={firstCast}
                handleCooldownPickerChange={handleCooldownPickerChange}
                icon={icon}
                id={id}
                label={label}
                spellId={spellId}
                players={players}
              />
            })
          }
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(BossAbilityList);
