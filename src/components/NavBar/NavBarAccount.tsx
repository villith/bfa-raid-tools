import { Button, Menu, MenuItem, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AuthDialogState } from '../Dialogs/Authentication';
import { Aux } from '../winAux';

export interface INavBarAccountProps {
  anchorEl: HTMLElement | undefined;
  handleClick: (event: any) => void;
  handleClose: () => void;
  handleSignOut: () => Promise<void>;
  toggleAuthDialog: (authDialogState: AuthDialogState) => void;
  user: firebase.User | null;
}

export interface INavBarAccountState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  accountMenuButton: {
    color: 'white'
  },
  outlined: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: 'white',
    borderColor: 'white'
  },
});

class NavBarAccount extends React.Component<WithStyles<any> & INavBarAccountProps, INavBarAccountState> {
  public render() {
    const { anchorEl, classes, handleClick, handleClose, handleSignOut, toggleAuthDialog, user } = this.props;
    return (
      (!user || user && user.isAnonymous) ? (
        <Aux>
          <Button variant='outlined' className={classes.outlined} onClick={() => toggleAuthDialog('signIn')}>Log In</Button>
          <Button variant='outlined' className={classes.outlined} onClick={() => toggleAuthDialog('signUp')}>Sign Up</Button>
        </Aux>
      ) : (
        <div className={classes.userAccount}>
          <Button className={classes.accountMenuButton} onClick={handleClick}>{user.displayName}  &#9660; {user.uid}</Button>
          <Menu
            id='accountOptions-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to='profile'><MenuItem>Profile</MenuItem></Link>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            <Link to='settings'><MenuItem>Settings</MenuItem></Link>
          </Menu>
        </div>
      )
    );
  }
}

export default withStyles(styles)(NavBarAccount);
