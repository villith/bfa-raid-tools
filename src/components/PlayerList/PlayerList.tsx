import './PlayerList.css';

import { Paper, StyleRulesCallback, Table, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Player } from '../../classes/Player';
import { WOWClass } from '../../enums/WOWclass';
import { getClassInfo } from '../../helpers/getClassInfo';
import SegmentBarContainer, { ISegmentValue } from '../SegmentBar/SegmentBarContainer';
import PlayerListHeader from './PlayerListHeader';
import PlayerListRow from './PlayerListRow';
import PlayerListToolbar from './PlayerListToolbar';

export type Order = 'asc' | 'desc';

export interface IPlayerListProps {
  players: Player[];
}

export interface IPlayerListState {
  numSelected: number;
  order: Order;
  orderBy: string;
  selected: number[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

// import Select from 'react-select';
class PlayerList extends React.Component<WithStyles<any> & IPlayerListProps, IPlayerListState> {
  public state = {
    numSelected: 0,
    order: 'asc' as Order,
    orderBy: 'id',
    selected: [] as number[],
  }

  public getSorting = (order: Order, orderBy: string) => {
    return order === 'desc'
      ? (a: Player, b: Player) => (
        b[orderBy] === a[orderBy]
        ? a.id < b.id ? -1 : 1
        : b[orderBy] < a[orderBy] ? -1 : 1
      )
      : (a: Player, b: Player) => (
        a[orderBy] === b[orderBy]
        ? a.id < b.id ? -1 : 1
        : a[orderBy] < b[orderBy] ? -1 : 1
      );
  }

  public handleRequestSort = (event: any, property: any) => {
    const orderBy = property;
    let order: Order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  public handleSelectAllClick = (event: any, checked: boolean) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.players.map(p => p.id) }));
      return;
    }
    this.setState({ selected: [] });
  }

  public handleClick = (event: any, id: number) => {
    const selected = [ ...this.state.selected ];
    const selectedIndex = selected.indexOf(id);

    if (selectedIndex === -1) {
      selected.push(id);
    }
    else {
      selected.splice(selectedIndex, 1);
    }

    this.setState({ selected });
  }

  public isSelected = (id: number) => this.state.selected.indexOf(id) !== -1;

  public buildClassSegments = () => {
    type ClassSegmentMap = { [key in WOWClass]: ISegmentValue };
    const classSegments: ClassSegmentMap = {} as ClassSegmentMap;
    const players = [ ...this.props.players ];
    players.map(player => {
      const { playerClass } = player;
      const classInfo = getClassInfo(playerClass);
      classSegments.hasOwnProperty(playerClass)
      ? classSegments[playerClass].count += 1
      : classSegments[playerClass] = {
        color: classInfo.classColor,
        count: 1,
        label: classInfo.label,        
      }
    });

    return classSegments;
  }

  // public buildRoleSegments = () => {}
  // public buildArmorTypeSegments = () => {}
  // public buildWeaponTypeSegments = () => {}

  public render() {
    const { order, orderBy, selected } = this.state;
    const { classes, players } = this.props;
    const classSegments = this.buildClassSegments();
    return (
      <Paper className={classes.root}>
        <PlayerListToolbar
          numSelected={selected.length}
          // roleSegments={roleSegments}
          // armorTypeSegments={armorTypeSegments}
          // weaponTypeSegments={weaponTypeSegments}
        />
        { classSegments && <SegmentBarContainer segments={classSegments} /> }
        <div className={classes.tableWrapper}>
          <Table>
            <PlayerListHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={players.length}
            />
            <TableBody>
              {...this.props.players
                .sort(this.getSorting(order, orderBy))
                .map(player => {
                  const { id, playerName, playerClass, playerSpec } = player;
                  const isSelected = this.isSelected(id);
                  return <PlayerListRow
                    isSelected={isSelected}
                    key={id}
                    playerClass={playerClass}  // class reserved
                    playerSpec={playerSpec}
                    playerName={playerName}
                    playerId={id}
                    handleClick={this.handleClick}
                  />
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(PlayerList);
