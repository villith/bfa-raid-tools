import { Card, CardContent, IconButton, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IAddStrategyCardProps {
  buildNewStrategy: (callback: (sid: string) => void) => void;
  handleSelectStrategy: (sid: string, callback?: (sid: string) => void) => void;
}

export interface IAddStrategyCardState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  addIcon: {
    height: 64,
    width: 64,
    opacity: 0.85
  },
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

class AddStrategyCard extends React.Component<RouteComponentProps<any> & WithStyles<any> & IAddStrategyCardProps, IAddStrategyCardState> {
  public handleNewStrategy = (sid: string) => {
    const { handleSelectStrategy, history } = this.props;
    handleSelectStrategy(sid, (id) => { history.push(`/${id}`) });
  }

  public render() {
    const { buildNewStrategy, classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <IconButton className={classes.addButton}>
            <AddIcon
              className={classes.addIcon}
              onClick={() => buildNewStrategy(this.handleNewStrategy)}
            />
          </IconButton>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(AddStrategyCard))