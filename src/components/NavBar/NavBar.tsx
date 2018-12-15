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
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface INavBarProps {
  sideMenuOpen: boolean;
  importOpen: boolean;
  exportOpen: boolean;
  strategyTitle: string;
  toggleSideMenu: () => void;
}

export interface INavBarState {
  placeholder?: string;
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
  hidden: {
    visibility: 'hidden'
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

class NavBar extends React.Component<RouteComponentProps<any> & WithStyles<any> & INavBarProps, INavBarState> {
  public getNavBarText = () => {
    const { strategyTitle } = this.props;
    let titleString = 'BFA Raid Tools';
    if (strategyTitle !== '') {
      titleString += ` - ${strategyTitle}`;
    }
    return titleString;
  }
  public render() {
    // console.log('NAVBAR RENDER');
    const { classes, location, sideMenuOpen, toggleSideMenu } = this.props;
    const navBarText = this.getNavBarText();
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
              className={classNames(classes.menuButton, sideMenuOpen && classes.hide, location.pathname === '/' && classes.hidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.flex}>
              {navBarText} 
            </Typography>
            {this.props.children}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default withRouter(withStyles(styles)(NavBar));
