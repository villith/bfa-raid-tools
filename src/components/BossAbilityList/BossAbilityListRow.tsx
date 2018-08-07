import { TableCell, TableRow, Typography } from '@material-ui/core';
import * as React from 'react';

import { Cooldown } from '../../classes/Cooldown';
import { CooldownType } from '../../enums/cooldownType';
import { secondsToMinutes } from '../../helpers/secondsToMinutes';
import { Aux } from '../winAux';

export interface IBossAbilityListRowProps {
  assignedCooldowns: Cooldown[];
  cooldowns: Cooldown[];
  cooldownTypes: CooldownType[];
  firstCast: number | undefined;
  icon: string;
  id: number;
  label: string;
  spellId: number;
}

class BossAbilityListRow extends React.Component<IBossAbilityListRowProps, any> {
  public render() {
    const { firstCast, id, icon, label, spellId } = this.props;
    const iconURL = `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`;
    const iconURLAlt = `${label} Icon`;
    const wowheadTooltip = `http://www.wowhead.com/spell=${spellId}`;

    return (
      <Aux>
        <TableRow
          hover={true}
          tabIndex={-1}
          key={id}
        >
          <TableCell padding='none'>
            <a href={wowheadTooltip} rel="dd=16" target='_blank'><img src={iconURL} alt={iconURLAlt} /></a>
          </TableCell>
          <TableCell><Typography>{label}</Typography></TableCell>
          { firstCast && <TableCell><Typography>{secondsToMinutes(firstCast)}</Typography></TableCell> }
        </TableRow>
        {/* <CooldownList
          cooldowns={cooldowns}
        /> */}
      </Aux>
    );
  }
}

export default BossAbilityListRow;
