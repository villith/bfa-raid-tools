import { StyleRulesCallback, Table, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Player } from '../../classes/Player';
import PlayerListBody from './PlayerListBody';
import { Order } from './PlayerListContainer';
import PlayerListHeader from './PlayerListHeader';

export interface IPlayerListProps {
  selected: string[];
  order: Order;
  orderBy: string;
  handleSelectAllClick: (event: any, checked: boolean) => void;
  handleRequestSort: (event: any, property: any) => void;
  handleClick: (id: string) => void;
  players: Player[];
  focusedPlayerId: string;
  changeFocusedPlayerId: (id: string) => void;
}

export interface IPlayerListState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  tableWrapper: {
    overflowX: 'auto',
  },
});

class PlayerList extends React.Component<WithStyles<any> & IPlayerListProps, IPlayerListState> {
  public render() {
    const { classes, focusedPlayerId, changeFocusedPlayerId, handleRequestSort, handleSelectAllClick, handleClick, order, orderBy, players, selected } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table style={{ tableLayout: 'auto' }}>
          <PlayerListHeader
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={players.length}
          />
          <PlayerListBody
            handleClick={handleClick}
            players={players}
            order={order}
            orderBy={orderBy}
            selected={selected}
            sortable={true}
            focusedPlayerId={focusedPlayerId}
            changeFocusedPlayerId={changeFocusedPlayerId}
          />
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerList)