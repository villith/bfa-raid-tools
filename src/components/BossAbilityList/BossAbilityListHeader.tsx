import { TableCell, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';

export interface IBossAbilityListHeaderProps {
  placeholder?: string;
}

const columnData = [
  { id: 'icon', numeric: false, disablePadding: true },
  { id: 'label', numeric: false, disablePadding: false, label: 'Ability Name' }
];

export default class BossAbilityListHeader extends React.Component<IBossAbilityListHeaderProps, any> {
  public render() {
    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            const { id, numeric, disablePadding, label } = column;
            return (
              <TableCell
                key={id}                
                numeric={numeric}
                padding={disablePadding ? 'none' : 'default'}
                scope='col'
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
