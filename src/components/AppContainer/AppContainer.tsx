import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import App from '../App/App';

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    height: '100%'
  }
});
class AppContainer extends React.Component<WithStyles<any>> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <App />
      </div>
    );
  }
}

export default withStyles(styles)(AppContainer);