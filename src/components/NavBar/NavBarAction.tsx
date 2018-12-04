import { IconButton, StyleRulesCallback, Theme, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface INavBarActionProps {
  title: string;
  onClick: () => void;
  iconComponent: JSX.Element;
}

export interface INavBarActionState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  action: {
    paddingLeft: theme.spacing.unit / 4,
    paddingRight: theme.spacing.unit / 4,
  },
  actionButton: {
    color: 'white'
  }
});

class NavBarAction extends React.Component<WithStyles<any> & INavBarActionProps, INavBarActionState> {
  public render() {
    const { classes, title, onClick, iconComponent } = this.props;
    return (
      <div className={classes.action}>
        <Tooltip title={title}>
          <IconButton
            aria-label={title}
            onClick={onClick}
            className={classes.actionButton}
          >
            {iconComponent}
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(styles)(NavBarAction)