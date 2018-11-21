import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { Player } from '../../classes/Player';
import { BossUldir } from '../../enums/bossUldir';
import { Raid } from '../../enums/raid';
import { getClassInfo, getSpecInfo } from '../../helpers/getClassInfo';
import { getBossInfo } from '../../helpers/getRaidInfo';

export interface IConfirmPlayerDeleteProps {
  open: boolean;
  players: Player[];
  deletePlayers: () => void;
  selected: string[];
  closeDialog: () => void;
}

export interface IConfirmPlayerDeleteState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  avatar: {
    borderRadius: 0,
  },
  icon: {
    borderRadius: '50%',
    height: 28
  },
  item: {
    display: 'flex'
  }
});

class ConfirmPlayerDelete extends React.Component<WithStyles<any> & IConfirmPlayerDeleteProps, IConfirmPlayerDeleteState> {
  public getBossMap = () => {
    const { selected, players } = this.props;
    const selectedPlayers = players.filter(player => selected.indexOf(player.id) !== -1);
    const bossMap: { [index: number]: Player[] } = {};
    selectedPlayers.map(player => {
      Object.keys(player.bosses).map(boss => {
        if (player.bosses[boss] === true) {
          if (bossMap.hasOwnProperty(boss)) {
            bossMap[boss].push(player);
          }
          else {
            bossMap[boss] = []
            bossMap[boss].push(player);
          }
        }
      });
    });
    console.dir(bossMap);
    return bossMap;
  }
  public render() {
    const { classes, closeDialog, deletePlayers, open } = this.props;
    const bossMap = open ? this.getBossMap() : {};
    return (
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle>CONFIRM DELETE PLAYERS</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Some of the selected players are assigned to boss rosters.<br/>
            Deleting these players will remove them and their cooldowns from these fights:
          </DialogContentText>
          {Object.keys(bossMap).map(key => {
              const keyInt = parseInt(key, 10);
              const bossRoster: Player[] = bossMap[key];
              const boss = getBossInfo(Raid.ULDIR, keyInt as BossUldir);
              const iconURL = `https://wow.zamimg.com/images/wow/icons/large/achievement_nazmir_boss_${boss.icon}.jpg`;
              console.log(iconURL);
              return (
                keyInt > 0 ? (
                  <Grid container={true} className={classes.root} key={key}>
                    <Grid item={true} xs={12} className={classes.item}>
                      <Avatar className={classes.avatar} src={iconURL} />
                      <Typography variant='h6'>{boss.label}</Typography>
                    </Grid>
                    {bossRoster.map((player, index) => {
                      const classInfo = getClassInfo(player.playerClass);
                      const specInfo = getSpecInfo(player.playerClass, player.playerSpec);
                      return (
                        <Grid item={true} xs={12} key={index} className={classes.item}>
                          <img className={classes.icon} src={`classIcons/${classInfo.icon}.jpg`} />
                          <img className={classes.icon} src={`classIcons/${specInfo.icon}.jpg`} />
                          <Typography>{player.playerName}</Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : ( null )
              )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={deletePlayers} color='secondary'>
            Delete Players
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmPlayerDelete)