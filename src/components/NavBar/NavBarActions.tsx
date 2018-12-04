import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface INavBarActionsProps {
  placeholder?: string;
}

export interface INavBarActionsState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  actions: {
    display: 'flex'
  }
});

class NavBarActions extends React.Component<WithStyles<any> & INavBarActionsProps, INavBarActionsState> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.actions}>
        {this.props.children}
        {/* <div className={classes.action}>
          <Tooltip title='Show Strategy List'>
            <IconButton
              color='inherit'
              aria-label='test'
              onClick={this.showStrategyList}
            >
              <AppIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.action}>
          <Tooltip title='Import'>
            <IconButton
              color='inherit'
              aria-label='Import'
              onClick={toggleImportStateDialog}
              disabled={true}
            >
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.action}>
          <Tooltip title='Export'>
            <IconButton
              color='inherit'
              aria-label='Export'
              onClick={toggleExportStateDialog}
              disabled={true}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip> */}
      </div>
    );
  }
}

export default withStyles(styles)(NavBarActions)