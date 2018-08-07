import { StyleRulesCallback, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Player } from '../../classes/Player';
import { Order } from './PlayerListContainer';
import PlayerListRow from './PlayerListRow';

export interface IPlayerListBodyProps {
  selected: string[];
  order?: Order;
  orderBy?: string;
  handleClick: ((event: any, id: string) => void);
  players: Player[];
  sortable: boolean;
}

export interface IPlayerListBodyState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class PlayerListBody extends React.Component<WithStyles<any> & IPlayerListBodyProps, IPlayerListBodyState> {
  public getSorting = (order: Order, orderBy: string) => {
    return order === 'desc'
      ? (a: Player, b: Player) => (
        b[orderBy] === a[orderBy]
        ? a.id < b.id ? -1 : 1
        : b[orderBy] < a[orderBy] ? -1 : 1
      ) : (a: Player, b: Player) => (
        a[orderBy] === b[orderBy]
        ? a.id < b.id ? -1 : 1
        : a[orderBy] < b[orderBy] ? -1 : 1
      );
  }

  public render() {
    const { handleClick, players, selected, order, orderBy, sortable } = this.props;
    const playerList = sortable ? players.sort(this.getSorting(order!, orderBy!)) : players;
    return (
      <TableBody>
        {playerList.map(player => {
            const { id, playerName, playerClass, playerSpec } = player;
            const isSelected = selected.indexOf(id) !== -1;
            return <PlayerListRow
              isSelected={isSelected}
              key={id}
              playerClass={playerClass}  // class reserved
              playerSpec={playerSpec}
              playerName={playerName}
              playerId={id}
              handleClick={handleClick}
            />
        })}
      </TableBody>
    );
  }
}

export default withStyles(styles)(PlayerListBody)