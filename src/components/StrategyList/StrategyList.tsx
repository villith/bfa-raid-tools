import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Strategy } from '../../classes/Strategy';
import { IPreferences } from '../App/App';
import AddStrategyCard from './AddStrategyCard';
import StrategyCard from './StrategyCard';

export interface IStrategyListProps {
  buildNewStrategy: (callback: (sid: string) => void) => void;
  handleToggleFavourite: (id: string) => void;
  preferences: IPreferences;
  strategies: Strategy[];
  handleSelectStrategy: (id: string | null) => void;
}

export interface IStrategyListState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3
  }
});

class StrategyList extends React.Component<WithStyles<any> & IStrategyListProps, IStrategyListState> {
  public sortByFavourite = () => {
    return (a: Strategy, b: Strategy) => {
      const x = this.props.preferences.favourites.indexOf(a.id!) === -1 ? -1 : 1;
      const y = this.props.preferences.favourites.indexOf(b.id!) === -1 ? -1 : 1;
      return x - y;
    }
  }
  public render() {
    const { buildNewStrategy, handleToggleFavourite, handleSelectStrategy, strategies } = this.props;
    return (
      <Grid container={true} spacing={8}>
        {strategies
          .filter(strategy => strategy.id !== null)
          .sort(this.sortByFavourite())
          .map((strategy, index) => {
            const favourite = this.props.preferences.favourites.indexOf(strategy.id!) !== -1;
            return (
              strategy.id &&
                <Grid key={index} item={true} xs={6} sm={4} md={3}>
                  <StrategyCard
                    toggleFavourite={handleToggleFavourite}
                    favourite={favourite}
                    strategy={strategy}
                    selectStrategy={handleSelectStrategy}
                  />
                </Grid>
            )
        })}
        <Grid item={true} xs={6} sm={4} md={3}>
          <AddStrategyCard
            buildNewStrategy={buildNewStrategy}
            handleSelectStrategy={handleSelectStrategy}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(StrategyList)