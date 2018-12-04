import { Card, CardContent, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
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

class AddStrategyCard extends React.Component<RouteComponentProps<any> & WithStyles<any> & IAddStrategyCardProps, IAddStrategyCardState> {
  public handleNewStrategy = (sid: string) => {
    const { handleSelectStrategy, history } = this.props;
    handleSelectStrategy(sid, (id) => { history.push(`/${id}`) });
  }

  public render() {
    const { buildNewStrategy } = this.props;
    return (
      <Card>
        <CardContent>
          <AddIcon onClick={() => buildNewStrategy(this.handleNewStrategy)} />
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(AddStrategyCard))