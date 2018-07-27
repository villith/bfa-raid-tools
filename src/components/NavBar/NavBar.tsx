import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  StyleRulesCallback,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import * as React from 'react';

export interface INavBarProps {
  toggleSideMenu: (() => void);
}

export interface INavBarState {
  anchorElement: EventTarget & HTMLElement | undefined;
  loggedIn: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});
class NavBar extends React.Component<WithStyles<any> & INavBarProps, INavBarState> {
  public state = {
    anchorElement: undefined,
    loggedIn: false,
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ loggedIn: checked });
  };

  public handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorElement: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorElement: undefined });
  };

  public render() {
    const { anchorElement, loggedIn } = this.state;
    const { toggleSideMenu } = this.props;
    const open = Boolean(anchorElement);

    return (
      <div className='root'>
        <AppBar position='static'>
          <Toolbar>
            <IconButton color='inherit' aria-label='Menu' onClick={toggleSideMenu}>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit'>
              BFA Raid Tools
            </Typography>
            {loggedIn && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup='true'
                  onClick={this.handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorElement}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',                    
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                </Menu>
              </div>
            )}
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default withStyles(styles)(NavBar);
