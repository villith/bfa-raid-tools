import {
  Button,
  Grid,
  List,
  ListItem,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import * as React from 'react';

import { lighten } from '@material-ui/core/styles/colorManipulator';
import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Player } from '../../classes/Player';
import { CooldownType } from '../../enums/cooldownType';
import { getClassInfo } from '../../helpers/getClassInfo';
import { findById } from '../../helpers/getGeneric';
import { getPlayerById } from '../../helpers/getPlayer';
import { secondsToMinutes } from '../../helpers/secondsToMinutes';
import CooldownPicker from '../CooldownPicker/CooldownPicker';
import { Aux } from '../winAux';

export interface IBossAbilityListRowProps {
  assignedCooldowns: Cooldown[];
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  cooldownTypes: CooldownType[];
  handleCooldownPickerChange: ((cooldownId: string, bossAbilityId: string, timer: number) => void);
  icon: string;
  id: string;
  label: string;
  players: Player[];
  spellId: number;
  timer: number;
}

export interface IBossAbilityListRowState {
  addCooldownVisible: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  iconCell: {
    paddingRight: '16px',
    paddingLeft: '16px',
    textAlign: 'center',
  },
  highlighted: {
    backgroundColor: lighten(theme.palette.primary.light, 0.95),
    borderLeftWidth: theme.spacing.unit / 2,
    borderLeftColor: theme.palette.primary.main,
    borderLeftStyle: 'solid',
  },
  cooldownRow: {
  }
});

class BossAbilityListRow extends React.Component<WithStyles<any> & IBossAbilityListRowProps, IBossAbilityListRowState> {
  public state = {
    addCooldownVisible: false
  }
  public toggleAddCooldown = () => {
    this.setState(prevState => ({ addCooldownVisible: !prevState.addCooldownVisible }));
  }
  public populateCooldownPicker = () => {
    const ability = this.props.bossAbilities[findById(this.props.id, this.props.bossAbilities)];
    const newCooldowns: Cooldown[] = [];
    const cooldowns = [ ...this.props.cooldowns ];
    cooldowns.map(cooldown => {
      if (this.props.cooldownTypes.indexOf(cooldown.cooldownType) !== -1) {
        const { timers } = cooldown;
        let isOnCooldown = timers.length > 0 ? true : false;
        if (cooldown.hasOwnProperty('charges')) {
          if (cooldown.charges! < 1) {
            isOnCooldown = true;
          }
          else {
            let onCooldownCount = 0;
            timers.map(time => {
              const diff = Math.abs(time - ability.timer);
              if (diff < cooldown.cooldownTime) {
                console.log('')
                onCooldownCount += 1;
              }
            });
            if (onCooldownCount < cooldown.charges!) {
              isOnCooldown = false;
            }
          }
        }
        else {
          let onCooldownCount = 0;
          timers.map(time => {
            const diff = Math.abs(time - ability.timer);
            if (diff < cooldown.cooldownTime) {
              onCooldownCount += 1;
            }
          });
          if (onCooldownCount === 0) {
            isOnCooldown = false;
          }
        }
        if (isOnCooldown === false) {
          newCooldowns.push(cooldown);
        }
      }
    });
    return newCooldowns;
  }
  public render() {
    const { assignedCooldowns,  classes, handleCooldownPickerChange, id, icon, label, timer, spellId, players } = this.props;
    const iconURL = `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`;
    const iconURLAlt = `${label} Icon`;
    const wowheadTooltip = `http://www.wowhead.com/spell=${spellId}`;

    return (
      <ListItem
        className={this.state.addCooldownVisible ? classes.highlighted : ''}   
        key={id}
      >
        <Grid className={classes.root} container={true} alignItems='center'>
          <Aux className={this.state.addCooldownVisible ? classes.highlighted : ''}>
            <Grid item={true} xs={2}>
              <a href={wowheadTooltip} rel="dd=16" target='_blank'><img src={iconURL} alt={iconURLAlt} /></a>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography>{label}</Typography>
            </Grid>
            <Grid item={true} xs={2}>
              <Typography>{secondsToMinutes(timer)}</Typography>
            </Grid>
            <Grid item={true} xs={2}>
              <Button variant='flat' color='primary' onClick={this.toggleAddCooldown}>
                  <AddIcon />
              </Button>
            </Grid>
          </Aux>
          <Grid item={true} xs={12}>
            {this.state.addCooldownVisible && (
              <CooldownPicker
                cooldowns={this.populateCooldownPicker()}
                players={players}
                bossAbilityId={id}
                handleChange={handleCooldownPickerChange}
                toggleVisible={this.toggleAddCooldown}
                timer={timer}
              />
            )}
          </Grid>
          <Grid item={true} xs={12}>
            <List>
              {assignedCooldowns.length > 0 &&
                assignedCooldowns.map((cooldown, index) => {
                  const { playerName, playerClass } = getPlayerById(cooldown.owner, players) as Player;
                  const classInfo = getClassInfo(playerClass);
                  const wowheadCooldownTooltip = `http://www.wowhead.com/spell=${cooldown.spellId}`;
                  const cooldownIconURL = `https://wow.zamimg.com/images/wow/icons/medium/${cooldown.icon}.jpg`;
                  return (
                    <ListItem
                      className={classes.cooldownRow}
                      key={index}>
                      <a href={wowheadCooldownTooltip} target='_blank'> <img src={cooldownIconURL}/></a>
                      <Typography style={{ color: classInfo.classColor }}>{cooldown.name} - {playerName}</Typography>
                    </ListItem>
                  )
                })
              }
            </List>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}

export default withStyles(styles)(BossAbilityListRow);
