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

import { Boss } from '../../classes/Boss';
import { BossAntorus } from '../../enums/bossAntorus';
import { BossTomb } from '../../enums/bossTomb';
import { BossUldir } from '../../enums/bossUldir';

export interface ISideMenuProps {
  bosses: Boss[];
  closeMenu: (() => void);
  currentBoss: BossUldir | BossAntorus | BossTomb;
  open: boolean;
  openMenu: (() => void);
}

export interface ISideMenuState {
  placeholder?: string;
}

const drawerWidth = 280;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  avatar: {
    borderRadius: 0
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class SideMenu extends React.Component<WithStyles<any> & ISideMenuProps, ISideMenuState> {
  public render() {
    const { bosses, classes, closeMenu, currentBoss, open, openMenu } = this.props;
    return (
      <Drawer
        open={open}
        variant='permanent'
        classes={{
          paper: classNames(classes.drawer, classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={closeMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {bosses.map((boss, index) => {
            const iconURL = `https://wow.zamimg.com/images/wow/icons/large/achievement_nazmir_boss_${boss.icon}.jpg`;
            const iconURLAlt = `${boss.label} Icon`;
            return (
              <ListItem 
                key={index}
                className={classNames(classes.listItem, currentBoss === boss.id && classes.selected)}
                onMouseEnter={openMenu}
                button={true}
              >
                <Avatar className={classes.avatar} src={iconURL} alt={iconURLAlt} />
                <ListItemText primary={boss.label} secondary={boss.title} />
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideMenu)