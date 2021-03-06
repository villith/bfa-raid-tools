import { TableCell, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';

export interface IBossAbilityListHeaderProps {
  placeholder?: string;
}

const columnData = [
  { id: 'icon', numeric: false, disablePadding: true, label: 'Icon', isIcon: true },
  { id: 'label', numeric: false, disablePadding: false, label: 'Ability Name' },
  { id: 'timer', numeric: false, disablePadding: false, label: 'Time' },
  { id: 'addCooldown', numeric: false, disablePadding: false, label: '' }
];

export default class BossAbilityListHeader extends React.Component<IBossAbilityListHeaderProps, any> {
  public render() {
    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            const { id, numeric, disablePadding, label, isIcon } = column;
            return (
              <TableCell
                key={id}                
                numeric={numeric}
                padding={disablePadding ? 'none' : 'default'}
                scope='col'
                style={isIcon ? { width: '64px', paddingLeft: '16px', paddingRight: '16px', textAlign: 'center' } : {}}
              >
                {label}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    );
  }
}
