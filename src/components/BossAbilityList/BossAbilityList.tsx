import { CustomTreeData, DataTypeProvider, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableColumnResizing, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { Button, Paper, StyleRulesCallback, Theme, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Add as AddIcon } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import { COOLDOWNTYPES } from 'src/constants/cooldownTypes';
import { CooldownType } from 'src/enums/cooldownType';
import { findById } from 'src/helpers/getGeneric';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import CooldownPicker from '../CooldownPicker/CooldownPicker';

export interface IBossAbilityListState {
  addCooldownVisibleMap: { [index: string]: boolean };
  columns: any[];
  defaultColumnWidths: any[];
}

export interface IBossAbilityListProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  focusedPlayerId: string;
  handleCooldownPickerChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  phases: Phase[];
  players: Player[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  cooldownTypeContainer: {
    display: 'flex',
  },
  cooldownTypeIcon: {
    padding: theme.spacing.unit / 2
  },
  row: {
    borderLeftWidth: '4px',
    borderLeftColor: 'transparent',
    borderLeftStyle: 'solid'
  },
  focusedAbilityRow: {
    borderLeftColor: theme.palette.secondary.main,
  },
  focusedCooldownRow: {
    borderLeftColor: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.95),
    '& td': {
      fontWeight: 'bold'
    }
  },
  table: {
    borderCollapse: 'collapse'
  }
});

class BossAbilityList extends React.Component<WithStyles<any> & IBossAbilityListProps, IBossAbilityListState> {
  public state = {
    columns: [
      { name: 'icon', title: 'Icon'},
      { name: 'label', title: 'Ability Name'},
      { name: 'timer', title: 'Time' },
      { name: 'cooldownTypes', title: 'Cooldown Types' },
      { name: 'addCooldown', title: ' ' },
      { name: 'cooldownPicker', title: ' ' }
    ],
    defaultColumnWidths: [
      { columnName: 'icon', width: 200 },
      { columnName: 'label', width: 200 },
      { columnName: 'timer', width: 100 },
      { columnName: 'cooldownTypes', width: 150 },
      { columnName: 'addCooldown', width: 100 },
      { columnName: 'cooldownPicker', width: 300 }
    ],
    addCooldownVisibleMap: {}
  }

  public getCooldownTypesComponent = (bossAbilityRow: any) => {
    const { classes } = this.props;
    const { row } = bossAbilityRow;
    const { cooldownTypes }: { cooldownTypes: CooldownType[] } = row;
    if (cooldownTypes) {
      const cooldownTypesComponent =
        <div className={classes.cooldownTypeContainer}>
          {cooldownTypes.map((ct, index) => {
            const detailsIndex = findById(ct, COOLDOWNTYPES);
            const details = COOLDOWNTYPES[detailsIndex];
            const { label, icon, } = details;
            return (
              <div key={index} className={classes.cooldownTypeIcon}>
                <Tooltip title={label}>
                  <img src={`${icon}.svg`} height={18} width={18} />
                </Tooltip>
              </div>
            )
          })}
        </div>
      return cooldownTypesComponent;
    }
    return null;
  }

  public getAbilityIconComponent = (bossAbilityRow: any) => {
    const { row } = bossAbilityRow;
    const { icon, label, spellId } = row;
    const iconURL = `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`;
    const iconURLAlt = `${label} Icon`;
    const wowheadTooltip = `http://www.wowhead.com/spell=${spellId}`;
    const abilityIconComponent =
      <a href={wowheadTooltip} rel="dd=16" target='_blank'><img src={iconURL} alt={iconURLAlt} /></a>
    return abilityIconComponent;
  }

  public getAddCooldownComponent = (bossAbilityRow: any) => {
    const { row } = bossAbilityRow;
    const { id } = row;
    if (row.hasOwnProperty('cooldownTypes')) {
      const addCooldownComponent =
        <Tooltip title='Assign Cooldown'>
          <Button variant='text' color='primary' onClick={() => this.toggleCooldownPicker(id)}>
            <AddIcon />
          </Button>
        </Tooltip>
      return addCooldownComponent;
    }
    return null;
  }

  public getCooldownPickerComponent = (bossAbilityRow: any) => {
    const { addCooldownVisibleMap } = this.state;
    const { handleCooldownPickerChange, players } = this.props;
    const { row } = bossAbilityRow;
    const { id, timer } = row;
    if (!addCooldownVisibleMap.hasOwnProperty(id)) {
      addCooldownVisibleMap[id] = false;
    }
    return row.hasOwnProperty('cooldownTypes') && addCooldownVisibleMap[id] === true ? (
      <CooldownPicker
        bossAbilityId={id}
        cooldowns={this.populateCooldownPicker(row)}
        handleChange={handleCooldownPickerChange}
        players={players}
        toggleVisible={this.toggleCooldownPicker}
        timer={timer}
      />
    ) : ( null );
  }

  public populateCooldownPicker = (bossAbility: BossAbility) => {
    const { id, cooldownTypes } = bossAbility;
    const { bossAbilities, cooldowns } = this.props;
    const ability = bossAbilities[findById(id, bossAbilities)];
    const newCooldowns: Cooldown[] = [];
    cooldowns.map(cooldown => {
      const { timers } = cooldown;
      let isOnCooldown = timers.length > 0 ? true : false;
      if (cooldownTypes.indexOf(cooldown.cooldownType) !== -1) {
        let usedCharges = 0;
        console.log(timers);
        timers.map(time => {
          console.log(time, ability.timer);
          const diff = Math.abs(time - ability.timer);
          // console.log(`Time since use: ${diff}`);
          if (diff < cooldown.cooldownTime) {
            // console.log(`Used within cooldown time, adding 1 to use count`);
            usedCharges += 1;
          }
        });
        console.log(cooldown.charges, usedCharges);
        if (cooldown.charges > usedCharges) {
          console.log(`[${cooldown.label}]`);
          console.log(`Number of charges left is greater than number of charges used`);
          isOnCooldown = false;
        }
        if (isOnCooldown === false) {          
          newCooldowns.push(cooldown);
        }
      }
    });
    return newCooldowns;
  }

  public getChildRows = (row: any, data: Array<BossAbility | Cooldown>) => {
    if (row) { 
      const childRows = data.filter(r => {
        if (r.hasOwnProperty('bossAbilities')) {
          const cooldownRow = r as Cooldown;
          const { bossAbilities } = cooldownRow;
          const result = bossAbilities.includes(row ? row.id : '');
          return result;
        }
        return false;
      });
      return childRows.length > 0 ? childRows : null;
    }
    else {
      return data.filter(r => r.hasOwnProperty('cooldownTypes'));
    }
  }

  public getRowComponent = (tableRowProps: Table.DataRowProps) => {
    const { cooldowns, classes, focusedPlayerId } = this.props;
    const { row } = tableRowProps;
    const { id } = row;
    const filteredCooldowns = cooldowns.filter(cd => cd.owner === focusedPlayerId);
    let abilityResult = false;
    let cooldownResult = false;
    for (const cd of filteredCooldowns) {
      if (cd.id === id) {
        cooldownResult = true;
        break;
      };
      if (cd.bossAbilities.includes(id)) {
        abilityResult = true;
        break;
      }
    }
    const rowClassesArray = [classes.row];
    if (abilityResult) { rowClassesArray.push(classes.focusedAbilityRow); }
    if (cooldownResult) { rowClassesArray.push(classes.focusedCooldownRow); }
    const rowClasses = classNames(rowClassesArray);

    return <Table.Row
      {...tableRowProps}
      className={rowClasses}
    />
  }

  public getTableComponent = (tableProps: any) => {
    const { classes } = this.props;
    return <Table.Table {...tableProps} className={classes.table} />
  }

  public toggleCooldownPicker = (id: string) => {
    const { addCooldownVisibleMap } = this.state;
    addCooldownVisibleMap[id] = !addCooldownVisibleMap[id];
    this.setState({ addCooldownVisibleMap });
  }

  public getRowId = (row: any) => row.id;

  public render() {
    const { columns, defaultColumnWidths } = this.state;
    const { bossAbilities, cooldowns } = this.props;
    const allRows = [...bossAbilities, ...cooldowns];
    const allIds = bossAbilities.map(ability => ability.id);
    return (
      <Paper>
        <Grid
          rows={allRows}
          columns={columns}
          getRowId={this.getRowId}
        >
          <TreeDataState defaultExpandedRowIds={allIds} />
          <DataTypeProvider
            for={['icon']}
            formatterComponent={this.getAbilityIconComponent}
          />
          <DataTypeProvider
            for={['addCooldown']}
            formatterComponent={this.getAddCooldownComponent}
          />
          <DataTypeProvider
            for={['cooldownPicker']}
            formatterComponent={this.getCooldownPickerComponent}
          />
          <DataTypeProvider
            for={['cooldownTypes']}
            formatterComponent={this.getCooldownTypesComponent}
          />
          <CustomTreeData            
            getChildRows={this.getChildRows}
          />
          <Table
            tableComponent={this.getTableComponent}
            rowComponent={this.getRowComponent}
          />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow /> 
          <TableTreeColumn for='icon' />
        </Grid>
      </Paper>
      // <List>
      //   <BossAbilityListHeader />
      //   {bossAbilities
      //     .filter(ba => ba.timer >= phaseStartTime && ba.timer < phaseEndTime)
      //     .map((bossAbility, index) => {
      //       const { cooldownTypes, icon, id, label, spellId, timer } = bossAbility;
      //       const assignedCooldowns = this.getAssignedCooldowns(id);
      //       return <BossAbilityListRow
      //         key={index}
      //         assignedCooldowns={assignedCooldowns}
      //         cooldowns={cooldowns}
      //         cooldownTypes={cooldownTypes}
      //         handleCooldownPickerChange={handleCooldownPickerChange}
      //         icon={icon}
      //         id={id}
      //         label={label}
      //         spellId={spellId}
      //         timer={timer}
      //         players={players}
      //         bossAbilities={bossAbilities}
      //       />
      //     })
      //   }
      // </List>
    );
  }
}

export default withStyles(styles)(BossAbilityList);
