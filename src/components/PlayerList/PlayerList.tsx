import './PlayerList.css';

import { Paper, StyleRulesCallback, Table, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Player } from '../../classes/Player';
import { ArmorType } from '../../enums/armorType';
import { Role } from '../../enums/role';
import { WeaponType } from '../../enums/weaponType';
import { WOWClass } from '../../enums/WOWclass';
import { WOWSpec } from '../../enums/WOWspec';
import { getClassInfo, getSpecInfo } from '../../helpers/getClassInfo';
import AddPlayer from '../AddPlayer/AddPlayer';
import SegmentBarContainer, { ISegmentValue } from '../SegmentBar/SegmentBarContainer';
import PlayerListHeader from './PlayerListHeader';
import PlayerListRow from './PlayerListRow';
import PlayerListToolbar from './PlayerListToolbar';

export type Order = 'asc' | 'desc';

export interface IPlayerListProps {
  handleAddPlayer: ((player: Partial<Player>, index: number, callback?: () => {}) => void);
  handleDeletePlayers: ((selected: string[]) => void);
  players: Player[];
}

export interface IPlayerListState {
  addPlayerVisible: boolean;
  numSelected: number;
  order: Order;
  orderBy: string;
  selected: string[];
  playerName: string;
  playerClass: WOWClass;
  playerSpec: WOWSpec;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

// import Select from 'react-select';
class PlayerList extends React.Component<WithStyles<any> & IPlayerListProps, IPlayerListState> {
  public state = {
    addPlayerVisible: false,
    numSelected: 0,
    order: 'asc' as Order,
    orderBy: 'id',
    selected: [] as string[],
    playerName: '',
    playerClass: 0,
    playerSpec: 0,
  }

  public handlePlayerNameChange = (event: any) => {
    this.setState({ playerName: event.target.value });
  }

  public handleWOWClassChange = (event: any) => {
    this.setState({ playerClass: parseInt(event.target.value, 10) });
  }

  public handleWOWSpecChange = (event: any) => {
    this.setState({ playerSpec: parseInt(event.target.value, 10) });
  }

  public toggleAddPlayer = () => {
    this.setState(prevState => ({ addPlayerVisible: !prevState.addPlayerVisible }));
  }

  public confirmAddPlayer = () => {
    this.props.handleAddPlayer({
      playerName: this.state.playerName,
      playerClass: this.state.playerClass,
      playerSpec: this.state.playerSpec
    }, this.props.players.length);

    this.toggleAddPlayer();
  }

  public deleteSelectedPlayers = () => {
    console.log('[deleteSelectedPlayers]');
    const selected = [ ...this.state.selected ];
    this.props.handleDeletePlayers(selected);
    this.setState({ selected: [] });
  }

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

  public handleClick = (event: any, id: string) => {
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

  public isSelected = (id: string) => this.state.selected.indexOf(id) !== -1;

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

  public buildRoleSegments = () => {
    type RoleSegmentMap = { [key in Role]: ISegmentValue };
    const roleColors = [
      '#c2185b',
      '#388e3c',
      '#ffa000',
      '#e64a19',
    ];
    const roleLabels = [
      'Tank',
      'Healer',
      'Melee DPS',
      'Ranged DPS',
    ];
    const roleSegments: RoleSegmentMap = {} as RoleSegmentMap;
    const players = [ ...this.props.players ];
    players.map(player => {
      const { playerClass, playerSpec } = player;
      const specInfo = getSpecInfo(playerClass, playerSpec);
      const playerRole = !specInfo.isMelee && specInfo.role === Role.DPS
      ? specInfo.role + 1 : specInfo.role;

      roleSegments.hasOwnProperty(playerRole)
      ? roleSegments[playerRole].count += 1
      : roleSegments[playerRole] = {
        color: roleColors[playerRole],
        count: 1,
        label: roleLabels[playerRole],
      };
    });

    return roleSegments;
  }

  public buildArmorTypeSegments = () => {
    type ArmorTypeSegmentMap = { [key in ArmorType]: ISegmentValue };
    const armorTypeColors = [
      'red',
      'blue',
      'yellow',
      'green',
    ];
    const armorTypeLabels = [
      'Cloth',
      'Leather',
      'Mail',
      'Plate'
    ];
    const armorTypeSegments: ArmorTypeSegmentMap = {} as ArmorTypeSegmentMap;
    const players = [ ...this.props.players ];
    players.map(player => {
      const { playerClass } = player;
      const classInfo = getClassInfo(playerClass);
      const armorType = classInfo.armorType;
      armorTypeSegments.hasOwnProperty(armorType)
      ? armorTypeSegments[armorType].count += 1
      : armorTypeSegments[armorType] = {
        color: armorTypeColors[armorType],
        count: 1,
        label: armorTypeLabels[armorType]
      };
    });

    return armorTypeSegments;
  }

  public buildWeaponTypeSegments = () => {
    type WeaponTypeSegmentMap = {[key in WeaponType]: ISegmentValue };
    const weaponTypeColors = [
      'brown',
      'grey',
      'red',
      'blue',
      'yellow',
      'green',
      'pink',
      'purple',
      'brown',
      'grey',
      'red',
      'blue',
      'yellow',
      'green',
      'pink',
      'purple'
    ];

    const weaponTypeLabels = [
      'Dagger',
      'Warglaive',
      'Fist',
      'Wand',
      'Bow',
      'Gun',
      'Shield',
      'Offhand',
      'Polearm',
      'Staff',
      'One-Handed Axe',
      'One-Handed Mace',
      'One-Handed Sword',
      'Two-Handed Axe',
      'Two-Handed Mace',
      'Two-Handed Sword'
    ];
    
    const weaponTypeSegments: WeaponTypeSegmentMap = {} as WeaponTypeSegmentMap;
    const players = [ ...this.props.players ];
    players.map(player => {
      const { playerClass, playerSpec } = player;
      const specInfo = getSpecInfo(playerClass, playerSpec);
      const weaponTypes = specInfo.weaponTypes;
      weaponTypes.map(weaponType => {
        weaponTypeSegments.hasOwnProperty(weaponType)
        ? weaponTypeSegments[weaponType].count += 1
        : weaponTypeSegments[weaponType] = {
          color: weaponTypeColors[weaponType],
          count: 1,
          label: weaponTypeLabels[weaponType]
        };
      });
    });

    return weaponTypeSegments;
  }

  public render() {
    const { addPlayerVisible, order, orderBy, selected } = this.state;
    const { classes, players } = this.props;
    const classSegments = this.buildClassSegments();
    const roleSegments = this.buildRoleSegments();
    const armorTypeSegments = this.buildArmorTypeSegments();
    const weaponTypeSegments = this.buildWeaponTypeSegments();
    return (
      <Paper className={classes.root}>
        <PlayerListToolbar
          addPlayerVisible={addPlayerVisible}
          confirmAddPlayer={this.confirmAddPlayer}
          deletePlayers={this.deleteSelectedPlayers}
          toggleAddPlayer={this.toggleAddPlayer} 
          numSelected={selected.length}
        />
        { addPlayerVisible && (
          <AddPlayer
            playerClass={this.state.playerClass}
            playerName={this.state.playerName}
            playerSpec={this.state.playerSpec}
            handleNameChange={this.handlePlayerNameChange}
            handleClassChange={this.handleWOWClassChange}
            handleSpecChange={this.handleWOWSpecChange}
          />
         )}
        { Object.keys(classSegments).length > 0 && <SegmentBarContainer segments={classSegments} /> }
        { Object.keys(roleSegments).length > 0 && <SegmentBarContainer segments={roleSegments} /> }
        { Object.keys(armorTypeSegments).length > 0 && <SegmentBarContainer segments={armorTypeSegments} /> }
        { Object.keys(weaponTypeSegments).length > 0 && <SegmentBarContainer segments={weaponTypeSegments} /> }
        <div className={classes.tableWrapper}>
          <Table style={{ tableLayout: 'auto' }}>
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
