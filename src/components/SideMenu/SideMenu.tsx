import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Boss, BossType } from '../../classes/Boss';

interface IBossMap {
  [index: number]: Boss;
}

export interface ISideMenuProps {
  bosses: IBossMap;
  closeMenu: (() => void);
  currentBoss: BossType;
  handleChange: (id: number) => void;
  open: boolean;
  openMenu: (() => void);
  strategyId: string;
}

export interface ISideMenuState {
  placeholder?: string;
}

const drawerWidth = 280;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  avatar: {
    borderRadius: 0
  },
  drawer: {
    position: 'static'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  listItem: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  selected: {
    backgroundColor: lighten(theme.palette.primary.light, 0.75),
    borderRightWidth: theme.spacing.unit / 2,
    borderRightColor: theme.palette.primary.main,
    borderRightStyle: 'solid',
  },
  sideMenuContainer: {
    height: '100%'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class SideMenu extends React.Component<RouteComponentProps<any> & WithStyles<any> & ISideMenuProps, ISideMenuState> {
  public render() {
    const { bosses, classes, closeMenu, currentBoss, location, open, strategyId } = this.props;
    // console.log(bosses);
    // console.log(location);
    return (
      <Drawer
        open={open}
        variant='permanent'
        classes={{
          paper: classNames(classes.drawer, classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        {location.pathname !== '/' &&
          <div className={classes.sideMenuContainer}>
            <div className={classes.toolbar}>
              <IconButton onClick={closeMenu}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              {Object.keys(bosses).map((key, index) => {
                const boss = bosses[key];
                let iconURL = `https://wow.zamimg.com/images/wow/icons/large/achievement_nazmir_`;
                iconURL += boss.id === 0 ? 'zone' : `boss_${boss.icon}`;
                iconURL += '.jpg';
                const iconURLAlt = `${boss.label} Icon`;
                const linkString = `/${strategyId}/${boss.id}`;
                return (
                  <Link key={index} to={linkString}>
                    <ListItem 
                      className={classNames(classes.listItem, currentBoss === boss.id && classes.selected)}                
                      button={true}
                      id={boss.id}
                    >
                      <Avatar className={classes.avatar} src={iconURL} alt={iconURLAlt} />
                      <ListItemText primary={boss.label} secondary={boss.title} />
                    </ListItem>
                  </Link>
                )
              })}
            </List>
          </div>
        }
      </Drawer>
    );
  }
}

export default withRouter(withStyles(styles)(SideMenu));