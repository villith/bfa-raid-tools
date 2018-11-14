import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { IBossMap } from '../../classes/Boss';
import { Player, PlayerListType } from '../../classes/Player';
import { BossUldir } from '../../enums/bossUldir';
import PlayerListContainer from '../PlayerList/PlayerListContainer';
import { Aux } from '../winAux';

export interface IHomeProps {
  addPlayers: (player: Player[]) => void;
  addPlayersToBoss: (playerIds: string[]) => void;
  deletePlayers: (playerIds: string[]) => void;
  deletePlayersFromBoss: (playerIds: string[]) => void;
  buildTestPlayerList: () => void;
  players: Player[];
  bosses: IBossMap;
  focusedPlayerId: string;
  changeFocusedPlayerId: (id: string) => void;
}

export interface IHomeState {
  confirmPlayerDeleteVisible: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class Home extends React.Component<WithStyles<any> & IHomeProps, IHomeState> {
  public render() {
    const { addPlayers, addPlayersToBoss, buildTestPlayerList, deletePlayers, deletePlayersFromBoss, focusedPlayerId, changeFocusedPlayerId, players } = this.props;
    return (
      <Aux>
        <Grid item={true} xs={6} md={4}>
          <PlayerListContainer
            addPlayers={addPlayers}
            addPlayersToBoss={addPlayersToBoss}
            deletePlayers={deletePlayers}
            deletePlayersFromBoss={deletePlayersFromBoss}
            players={players}
            currentBoss={BossUldir.HOME}
            buildTestPlayerList={buildTestPlayerList}
            type={PlayerListType.ALL}
            focusedPlayerId={focusedPlayerId}
            changeFocusedPlayerId={changeFocusedPlayerId}
          />
        </Grid>
        <Grid item={true} xs={6} md={8} />
      </Aux>
    );
  }
}

export default withStyles(styles)(Home)