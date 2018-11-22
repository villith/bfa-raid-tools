import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  StyleRulesCallback,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import {
  Apps as AppIcon,
  Face as FaceIcon,
  Menu as MenuIcon,
  SaveAlt as SaveAltIcon,
  Share as ShareIcon,
} from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';

import { Aux } from '../winAux';

export interface INavBarProps {
  sideMenuOpen: boolean;
  importOpen: boolean;
  exportOpen: boolean;
  handleSignOut: (() => void);
  toggleSideMenu: (() => void);
  toggleImportStateDialog: (() => void);
  toggleExportStateDialog: (() => void);
  toggleAuthDialog: (() => void);
  selectNewStrategy: ((id: string | null) => void);
  user: firebase.User | null;
}

export interface INavBarState {
  anchorEl: HTMLElement | undefined;
  loggedIn: boolean;
}

const drawerWidth = 280;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  action: {
    marginLeft: theme.spacing.unit / 4,
    marginRight: theme.spacing.unit / 4,
  },
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
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  avatarIcon: {
    width: 48,
    height: 48
  },
  divider: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  outlined: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: 'white',
    borderColor: 'white'
  },
  root: {
    position: 'static'
  }
});
class NavBar extends React.Component<WithStyles<any> & INavBarProps, INavBarState> {
  public state = {
    anchorEl: undefined,
    loggedIn: false,
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ loggedIn: checked });
  };

  public showStrategyList = () => {
    this.props.selectNewStrategy(null);
  }

  public handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  public handleClose = () => {
    this.setState({ anchorEl: undefined });
  }

  public render() {
    const { classes, handleSignOut, sideMenuOpen, toggleAuthDialog, toggleSideMenu, toggleImportStateDialog, toggleExportStateDialog, user } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position='absolute'
          className={classNames(classes.appBar, sideMenuOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!sideMenuOpen}>
            <IconButton
              color='inherit'
              aria-label='Menu'
              onClick={toggleSideMenu}
              className={classNames(classes.menuButton, sideMenuOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.flex}>
              BFA Raid Tools
            </Typography>
            <div className={classes.action}>
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
              </Tooltip>
            </div>
            <div className={classes.divider}>|</div>
            {!user || user && user.isAnonymous && (
              <Aux>
                <Button variant='outlined' className={classes.outlined} onClick={toggleAuthDialog}>Log In</Button>
                <Button variant='outlined' className={classes.outlined} onClick={toggleAuthDialog}>Sign Up</Button>
              </Aux>
            )}
            {user && !user.isAnonymous &&
              <Aux>
                <Avatar className={classNames(classes.avatar, classes.outlined)}>
                  <FaceIcon className={classes.avatarIcon} />
                </Avatar>
                <Button 
                  variant='outlined'
                  className={classes.outlined}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </Aux>
            }
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
