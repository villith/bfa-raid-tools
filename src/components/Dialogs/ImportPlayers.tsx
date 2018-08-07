import { Button, Dialog, DialogTitle, StyleRulesCallback, Table, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossType } from '../../classes/Boss';
import { Player } from '../../classes/Player';
import { filterPlayersByBoss } from '../../helpers/bossFilter';
import PlayerListBody from '../PlayerList/PlayerListBody';

export interface IImportPlayersProps {
  open: boolean;
  closeDialog: (() => void);
  players: Player[];
  currentBoss: BossType;
  addPlayersToBoss: ((playerIds: string[], boss: BossType) => void);
}

export interface IImportPlayersState {
  selected: string[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  submitButton: {
    borderRadius: 0,
  }
});

class ImportPlayers extends React.Component<WithStyles<any> & IImportPlayersProps, IImportPlayersState> {
  public state = {
    selected: [] as string[],
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

  public handleSubmit = () => {
    const selected = [ ...this.state.selected ];
    this.props.addPlayersToBoss(selected, this.props.currentBoss);
    this.props.closeDialog();
    this.setState({ selected: [] });
  }

  public render() {
    const { selected } = this.state;
    const { currentBoss, players, classes, closeDialog, open } = this.props;
    const playerList = filterPlayersByBoss(currentBoss, players);
    const buttonText = playerList.length > 0 ? 'Import Selected' : 'No Players To Import';
    return (
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle id='dialog-title'>Import Players</DialogTitle>
        <Table>
          <PlayerListBody
            handleClick={this.handleClick}
            players={playerList}
            selected={selected}
            sortable={false}
          />
        </Table>
        <Button disabled={playerList.length === 0 || selected.length === 0} className={classes.submitButton} size='large' variant={'contained'} color={'primary'} onClick={this.handleSubmit}>
          {buttonText}
        </Button>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ImportPlayers)