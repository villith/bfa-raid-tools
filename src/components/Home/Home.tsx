import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { IBossMap } from '../../classes/Boss';
import { Player, PlayerListType } from '../../classes/Player';
import { BossUldir } from '../../enums/bossUldir';
import PlayerListContainer from '../PlayerList/PlayerListContainer';
import TwitchWidgetContainer from '../Widgets/TwitchWidget/TwitchWidgetContainer';
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
  strategyId: string;
  handleSelectStrategy: (id: string) => void;
  changeFocusedPlayerId: (id: string) => void;
}

export interface IHomeState {
  confirmPlayerDeleteVisible: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class Home extends React.Component<WithStyles<any> & IHomeProps, IHomeState> {
  public componentDidMount() {
    this.props.handleSelectStrategy(this.props.strategyId);
  }
  public render() {
    const { addPlayers, addPlayersToBoss, buildTestPlayerList, deletePlayers, deletePlayersFromBoss, focusedPlayerId, changeFocusedPlayerId, players } = this.props;
    return (
      <Aux>
        <Grid item={true} xs={6} sm={6}>
          <PlayerListContainer
            addPlayers={addPlayers}
            addPlayersToBoss={addPlayersToBoss}
            deletePlayers={deletePlayers}
            deletePlayersFromBoss={deletePlayersFromBoss}
            players={players}
            playerList={players}
            currentBoss={BossUldir.HOME}
            buildTestPlayerList={buildTestPlayerList}
            type={PlayerListType.ALL}
            focusedPlayerId={focusedPlayerId}
            changeFocusedPlayerId={changeFocusedPlayerId}
          />
        </Grid>
        <Grid item={true} xs={3} sm={3} />
        <Grid item={true} xs={3} sm={3}>
          <TwitchWidgetContainer />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(Home)