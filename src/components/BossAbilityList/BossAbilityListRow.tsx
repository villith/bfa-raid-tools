import {
  Button,
  StyleRulesCallback,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';

import { lighten } from '../../../node_modules/@material-ui/core/styles/colorManipulator';
import { Cooldown } from '../../classes/Cooldown';
import { Player } from '../../classes/Player';
import { CooldownType } from '../../enums/cooldownType';
import { secondsToMinutes } from '../../helpers/secondsToMinutes';
import CooldownListHeader from '../CooldownList/CooldownListHeader';
import CooldownPicker from '../CooldownPicker/CooldownPicker';
import { Aux } from '../winAux';

export interface IBossAbilityListRowProps {
  assignedCooldowns: Cooldown[];
  cooldowns: Cooldown[];
  cooldownTypes: CooldownType[];
  firstCast: number | undefined;
  handleCooldownPickerChange: ((event: any) => void);
  icon: string;
  id: number;
  label: string;
  players: Player[];
  spellId: number;
}

export interface IBossAbilityListRowState {
  addCooldownVisible: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  tableCell: {
    borderWidth: '0px'
  },
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
  }
});

class BossAbilityListRow extends React.Component<WithStyles<any> & IBossAbilityListRowProps, IBossAbilityListRowState> {
  public state = {
    addCooldownVisible: false
  }
  public toggleAddCooldown = () => {
    this.setState(prevState => ({ addCooldownVisible: !prevState.addCooldownVisible }));
  }
  public render() {
    const { assignedCooldowns, cooldowns, cooldownTypes, classes, handleCooldownPickerChange, firstCast, id, icon, label, spellId, players } = this.props;
    const iconURL = `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`;
    const iconURLAlt = `${label} Icon`;
    const wowheadTooltip = `http://www.wowhead.com/spell=${spellId}`;

    return (
      <Aux>
        <TableRow
          className={this.state.addCooldownVisible ? classes.highlighted : ''}   
          tabIndex={-1}
          key={id}
        >
          <TableCell className={classNames(classes.iconCell, classes.tableCell)}>
            <a href={wowheadTooltip} rel="dd=16" target='_blank'><img src={iconURL} alt={iconURLAlt} /></a>
          </TableCell>
          <TableCell className={classes.tableCell}><Typography>{label}</Typography></TableCell>
          { firstCast && <TableCell className={classes.tableCell} ><Typography>{secondsToMinutes(firstCast)}</Typography></TableCell> }
          <TableCell className={classes.tableCell} >
            <Button variant='flat' color='primary' onClick={this.toggleAddCooldown}>
              <AddIcon />
            </Button>
          </TableCell>
        </TableRow>
        {assignedCooldowns &&
          <Table>
            <CooldownListHeader />
            <TableBody>
              {assignedCooldowns.map((cooldown, index) => {
                return (
                  <TableRow
                    className={classes.tableRow}
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell padding='none' />
                    <TableCell>Test</TableCell>
                    <TableCell>TestTwo</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        }
        {this.state.addCooldownVisible && (
          <CooldownPicker
            players={players}
            assignedCooldowns={assignedCooldowns}
            cooldowns={cooldowns}
            cooldownTypes={cooldownTypes}
            handleChange={handleCooldownPickerChange}
          />
        )}
      </Aux>
    );
  }
}

export default withStyles(styles)(BossAbilityListRow);
