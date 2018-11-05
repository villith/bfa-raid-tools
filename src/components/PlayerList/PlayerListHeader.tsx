import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import * as React from 'react';
import { Order } from './PlayerListContainer';

export interface IPlayerListHeaderProps {
  numSelected: number;
  order: Order;
  orderBy: string;
  onSelectAllClick: ((event: any, checked: boolean) => void);
  onRequestSort: ((event: any, property: any) => void);
  rowCount: number;
}

const columnData = [
  { id: 'playerClass', numeric: false, disablePadding: true, label: 'Class' },
  { id: 'playerSpec', numeric: false, disablePadding: true, label: 'Spec' },
  { id: 'playerName', numeric: false, disablePadding: false, label: 'Player Name' },  
];

export default class PlayerListHeader extends React.Component<IPlayerListHeaderProps, any> {
  public createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property);
  }

  public render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell scope='col' padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            const { id, numeric, disablePadding, label } = column;
            return (
              <TableCell
                key={id}                
                numeric={numeric}
                padding={disablePadding ? 'none' : 'default'}
                scope='col'
                sortDirection={orderBy === id ? order : false}
              >
                <Tooltip
                  title='Sort'
                  placement={numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === id}
                    direction={order}
                    onClick={this.createSortHandler(id)}
                  >
                    {label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    );
  }
}
