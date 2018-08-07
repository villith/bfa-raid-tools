import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Boss, BossType, IBossMap } from '../../classes/Boss';
import { Player } from '../../classes/Player';
import { BossUldir } from '../../enums/bossUldir';
import Encounter from '../Encounter/Encounter';
import Home from '../Home/Home';

export interface IMainContentProps {
  boss: Boss;
  bosses: IBossMap;
  addPlayers: ((players: Player[]) => void);
  addPlayersToBoss: ((playerIds: string[], boss: BossType) => void);
  deletePlayers: ((playerIds: string[]) => void);
  deletePlayersFromBoss: ((playerIds: string[], boss: BossType) => void);
  players: Player[];
}

export interface IMainContentState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3
  }
});

class MainContent extends React.Component<WithStyles<any> & IMainContentProps, IMainContentState> {
  public render() {
    const { boss, bosses, classes, addPlayers, addPlayersToBoss, deletePlayers, deletePlayersFromBoss, players } = this.props;
    return (
      <Grid container={true} spacing={16} className={classes.root}>
        {boss.id === BossUldir.HOME ? (
          <Home
            addPlayers={addPlayers}
            deletePlayers={deletePlayers}
            addPlayersToBoss={addPlayersToBoss}
            deletePlayersFromBoss={deletePlayersFromBoss}
            players={players}
            bosses={bosses}
          />
        ) : (
          <Encounter
            boss={boss}
            addPlayers={addPlayers}
            deletePlayers={deletePlayers}
            addPlayersToBoss={addPlayersToBoss}
            deletePlayersFromBoss={deletePlayersFromBoss}
            players={players}
          />
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(MainContent)