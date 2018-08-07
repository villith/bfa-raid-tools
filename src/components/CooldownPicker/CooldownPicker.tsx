import { Select, StyleRulesCallback, TableCell, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Cooldown } from '../../classes/Cooldown';
import { Player } from '../../classes/Player';
import { CooldownType } from '../../enums/cooldownType';
import { getClassInfo, getSpecInfo } from '../../helpers/getClassInfo';
import { getPlayerById } from '../../helpers/getPlayer';

export interface ICooldownPickerProps {
  assignedCooldowns: Cooldown[];
  cooldowns: Cooldown[];
  cooldownTypes: CooldownType[];
  handleChange: ((event: any) => void);
  players: Player[];
}

export interface ICooldownPickerState {
  placeholder?: string;
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
  public render() {
    const { classes, cooldowns, handleChange, players } = this.props;
    return (
      <TableRow className={classes.tableRow}>
        <TableCell className={classes.tableCell} />
        <TableCell className={classes.tableCell}>
          <Select
            native={true}
            onChange={handleChange}
          >
            {cooldowns.map((cooldown, index) => {
              const { playerName, playerClass, playerSpec } = getPlayerById(cooldown.owner, players) as Player;
              const classInfo = getClassInfo(playerClass);
              const specInfo = getSpecInfo(playerClass, playerSpec);
              return (
                <option key={index} style={{ color: classInfo.classColor }} value={cooldown.id}>
                  <img src={`classIcons/${cooldown.icon}`} />{cooldown.name} - <img src={`classIcons/${specInfo.icon}`} /> {playerName}
                </option>
              )
            })}
          </Select>
        </TableCell>
        <TableCell className={classes.tableCell} />
        <TableCell className={classes.tableCell} />
      </TableRow>
    );
  }
}

export default withStyles(styles)(CooldownPicker)