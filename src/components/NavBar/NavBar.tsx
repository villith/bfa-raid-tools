import {
  AppBar,
  IconButton,
  StyleRulesCallback,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';

export interface INavBarProps {
  open: boolean;
  toggleSideMenu: (() => void);
}

export interface INavBarState {
  loggedIn: boolean;
}

const drawerWidth = 280;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  root: {},
});
class NavBar extends React.Component<WithStyles<any> & INavBarProps, INavBarState> {
  public state = {
    loggedIn: false,
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ loggedIn: checked });
  };

  public render() {
    const { classes, open, toggleSideMenu } = this.props;

    return (
      <div className='root'>
        <AppBar
          position='absolute'
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open}>
            <IconButton 
              color='inherit'
              aria-label='Menu'
              onClick={toggleSideMenu}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit'>
              BFA Raid Tools
            </Typography>
            {/* {loggedIn && (
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
            )} */}
            {/* <Button color='inherit'>Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default withStyles(styles)(NavBar);
