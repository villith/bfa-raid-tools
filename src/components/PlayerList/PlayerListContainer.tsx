import './PlayerList.css';

import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossType } from '../../classes/Boss';
import { Player, PlayerListType } from '../../classes/Player';
import { WOWClass } from '../../enums/WOWclass';
import { WOWSpec } from '../../enums/WOWspec';
import { getPlayersByBoss } from '../../helpers/bossFilter';
import { getPlayerByPlayerName, getPlayerIndexById } from '../../helpers/getPlayer';
import AddPlayer from '../AddPlayer/AddPlayer';
import ConfirmPlayerDelete from '../Dialogs/ConfirmPlayerDelete';
import ImportPlayers from '../Dialogs/ImportPlayers';
import SegmentBarWrapper from '../SegmentBar/SegmentBarWrapper';
import PlayerList from './PlayerList';
import PlayerListToolbar from './PlayerListToolbar';

export type Order = 'asc' | 'desc';

export interface IPlayerListContainerProps {
  addPlayers: ((player: Player[]) => void);
  addPlayersToBoss: ((playerIds: string[], boss: BossType) => void);
  deletePlayers: ((playerIds: string[]) => void);
  deletePlayersFromBoss: ((playerIds: string[], boss: BossType) => void);
  players: Player[];
  currentBoss: BossType;
  type: PlayerListType;
}

export interface IPlayerListContainerState {
  addPlayerVisible: boolean;
  importPlayersVisible: boolean;
  confirmPlayerDeleteVisible: boolean;
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
class PlayerListContainer extends React.Component<WithStyles<any> & IPlayerListContainerProps, IPlayerListContainerState> {
  public state = {
    addPlayerVisible: false,
    importPlayersVisible: false,
    confirmPlayerDeleteVisible: false,
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

  public toggleImportPlayers = () => {
    this.setState(prevState => ({ importPlayersVisible: !prevState.importPlayersVisible }));
  }

  public toggleAddPlayer = () => {
    this.setState(prevState => ({ addPlayerVisible: !prevState.addPlayerVisible }));
  }

  public confirmAddPlayer = () => {
    const existingPlayer = getPlayerByPlayerName(this.state.playerName, this.props.players);
    if (!existingPlayer) {
      const newPlayer = new Player(
        this.state.playerName,
        this.state.playerClass,
        this.state.playerSpec,
      );
      this.props.addPlayers([newPlayer]);
    }
    else {
      this.props.addPlayersToBoss([existingPlayer.id], this.props.currentBoss);
    }
    this.toggleAddPlayer();
  }

  public confirmDeletePlayers = () => {
    this.props.deletePlayers(this.state.selected);
    this.toggleConfirmPlayerDelete();
    this.setState({ selected: [] });
  }

  public deleteSelectedPlayers = () => {
    const selected = [ ...this.state.selected ];
    if (this.props.currentBoss !== 0) {
      this.props.deletePlayersFromBoss(selected, this.props.currentBoss);
      this.setState({ selected: [] });
    }
    else {
      selected.map(playerId => {
        const playerIndex = getPlayerIndexById(playerId, this.props.players);
        const player = this.props.players[playerIndex];
        let bossCount = 0;
        Object.keys(player.bosses).map(boss => player.bosses[boss] === true ? bossCount += 1 : null);
        if (bossCount > 1) {
          this.toggleConfirmPlayerDelete();
        }
        else {
          this.props.deletePlayers(selected);
          this.setState({ selected: [] });
        }
      })
    }
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
      this.setState(({ selected: this.props.players.map(p => p.id) }));
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

  public toggleConfirmPlayerDelete = () => {
    this.setState(prevState => ({ confirmPlayerDeleteVisible: !prevState.confirmPlayerDeleteVisible }));
  }
  
  public render() {
    const { addPlayerVisible, importPlayersVisible, order, orderBy, selected } = this.state;
    const { classes, currentBoss, addPlayersToBoss, players, type } = this.props;
    const playerList = getPlayersByBoss(currentBoss, players);
    return (
      <Paper className={classes.root}>
        <PlayerListToolbar
          addPlayerVisible={addPlayerVisible}
          confirmAddPlayer={this.confirmAddPlayer}
          deletePlayers={this.deleteSelectedPlayers}
          toggleAddPlayer={this.toggleAddPlayer}
          toggleImportPlayers={this.toggleImportPlayers}
          numSelected={selected.length}
          type={type}
        />
        <ImportPlayers
          open={importPlayersVisible}
          closeDialog={this.toggleImportPlayers}
          players={players}
          currentBoss={currentBoss}
          addPlayersToBoss={addPlayersToBoss}
        />
        { addPlayerVisible && (
          <AddPlayer
            playerClass={this.state.playerClass}
            playerName={this.state.playerName}
            playerSpec={this.state.playerSpec}
            players={players}
            handleNameChange={this.handlePlayerNameChange}
            handleClassChange={this.handleWOWClassChange}
            handleSpecChange={this.handleWOWSpecChange}
          />
         )}
        <SegmentBarWrapper
          players={playerList}
        />
        <PlayerList
          selected={selected}
          order={order}
          orderBy={orderBy}
          handleSelectAllClick={this.handleSelectAllClick}
          handleRequestSort={this.handleRequestSort}
          handleClick={this.handleClick}
          players={playerList}
        />
        <ConfirmPlayerDelete
          open={this.state.confirmPlayerDeleteVisible}
          closeDialog={this.toggleConfirmPlayerDelete}
          deletePlayers={this.confirmDeletePlayers}
          players={players}
          selected={selected}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(PlayerListContainer);
