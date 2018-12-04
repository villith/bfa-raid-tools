import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@material-ui/icons';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Strategy } from '../../classes/Strategy';

export interface IStrategyCardProps {
  favourite: boolean;
  strategy: Strategy;
  selectStrategy: (id: string) => void;
  toggleFavourite: (id: string) => void;
}

export interface IStrategyCardState {
  editable: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  actions: {
    float: 'right'
  },
  favorite: {
    marginLeft: 'auto'
  },
  cardHeader: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  spacer: {
    flex: '1 1 100%',
  },
  cardTitle: {
    flex: '0 0 auto',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  link: {
    textDecoration: 'none',
    textOverflow: 'ellipsis'
  }
});

class StrategyCard extends React.Component<WithStyles<any> & IStrategyCardProps, IStrategyCardState> {
  public state = {
    editable: false,
  }

  public handleSelectStrategy = () => {
    this.props.selectStrategy(this.props.strategy.id);
  }

  public handleToggleFavourite = () => {
    this.props.toggleFavourite(this.props.strategy.id);
  }

  public render() {
    const { classes, favourite, strategy } = this.props;
    const { title, description } = strategy;
    return (
      <Card>
        <CardContent>
          <div className={classes.cardHeader}>
            <Link className={classes.link} to={`/${strategy.id}`}>
              <div className={classes.cardTitle} onClick={this.handleSelectStrategy}>
                <Typography variant='h5'>
                  {title}
                </Typography>
              </div>
            </Link>
            <div className={classes.favorite}>
              <Checkbox
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon />}
                checked={favourite}
                onClick={this.handleToggleFavourite}
                color='secondary'
              />
            </div>
          </div>
          <Typography component='p'>
            {description}
          </Typography>
          <Typography component='p'>
            {strategy.id}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size='small' color='primary'>
            Edit
          </Button>
          <Button size='small' color='secondary'>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(StrategyCard)