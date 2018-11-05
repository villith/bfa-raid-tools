import { Select, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import * as React from 'react';

import { Cooldown } from '../../classes/Cooldown';
import { Player } from '../../classes/Player';
import { getClassInfo } from '../../helpers/getClassInfo';
import { getPlayerById } from '../../helpers/getPlayer';

export interface ICooldownPickerProps {
  bossAbilityId: string;
  cooldowns: Cooldown[];
  handleChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  players: Player[];
  toggleVisible: () => void;
  timer: number;
}

export interface ICooldownPickerState {
  selectedCooldown: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  tableRow: {
    backgroundColor: lighten(theme.palette.primary.light, 0.95),
    borderLeftWidth: theme.spacing.unit / 2,
    borderLeftColor: theme.palette.primary.main,
    borderLeftStyle: 'solid',
  },
  tableCell: {
    borderWidth: '0px'
  }
});

class CooldownPicker extends React.Component<WithStyles<any> & ICooldownPickerProps, ICooldownPickerState> {
  public state = {
    selectedCooldown: ''
  }

  public handleSelectChange = (event: any) => {
    const cooldownId = event.target.value;
    this.setState({ selectedCooldown: cooldownId }, () => {
      this.props.handleChange(cooldownId, this.props.bossAbilityId, this.props.timer);
      this.props.toggleVisible();
    });    
  }

  public render() {
    const { selectedCooldown } = this.state;
    const { cooldowns, players } = this.props;
    return (
      <Select
        native={true}
        displayEmpty={true}
        onChange={this.handleSelectChange}
        value={selectedCooldown}
      >
        <option key='empty' value='' disabled={true}>Select Cooldown to Add</option>
        {cooldowns.map((cooldown, index) => {
          const { playerName, playerClass } = getPlayerById(cooldown.owner, players) as Player;
          const classInfo = getClassInfo(playerClass);
          return (
            <option key={index} style={{ color: classInfo.classColor }} value={cooldown.id}>
              {cooldown.label} - {playerName}
            </option>
          )
        })}
      </Select>
    );
  }
}

export default withStyles(styles)(CooldownPicker)