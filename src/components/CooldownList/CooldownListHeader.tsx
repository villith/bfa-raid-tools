import { TableCell, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';

export interface ICooldownListHeaderProps {
  placeholder?: string;
}

const columnData = [
  { id: 'icon', numeric: false, disablePadding: false },
  { id: 'label', numeric: false, disablePadding: false, label: 'Ability Name' },
  { id: 'timer', numeric: false, disablePadding: false, label: 'Time' },
];

export default class CooldownListHeader extends React.Component<ICooldownListHeaderProps, any> {
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
