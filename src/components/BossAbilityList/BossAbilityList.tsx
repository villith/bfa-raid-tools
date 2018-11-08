import { CustomTreeData, DataTypeProvider, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableColumnResizing, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { Button, Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import * as React from 'react';
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
  handleCooldownPickerChange: (cooldownId: string, bossAbilityId: string, timer: number) => void;
  phases: Phase[];
  players: Player[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class BossAbilityList extends React.Component<WithStyles<any> & IBossAbilityListProps, IBossAbilityListState> {
  public state = {
    columns: [
      { name: 'icon', title: 'Icon'},
      { name: 'label', title: 'Ability Name'},
      { name: 'timer', title: 'Time' },
      { name: 'addCooldown', title: ' ' },
      { name: 'cooldownPicker', title: ' ' }
    ],
    defaultColumnWidths: [
      { columnName: 'icon', width: 200 },
      { columnName: 'label', width: 200 },
      { columnName: 'timer', width: 100 },
      { columnName: 'addCooldown', width: 100 },
      { columnName: 'cooldownPicker', width: 300 }
    ],
    addCooldownVisibleMap: {}
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
    console.log(id);
    const addCooldownComponent =
      // tslint:disable-next-line:jsx-no-lambda
      <Button variant='flat' color='primary' onClick={() => this.toggleCooldownPicker(id)}>
        <AddIcon />
      </Button>
    return addCooldownComponent;
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

  public toggleCooldownPicker = (id: string) => {
    const { addCooldownVisibleMap } = this.state;
    addCooldownVisibleMap[id] = !addCooldownVisibleMap[id];
    this.setState({ addCooldownVisibleMap });
  }

  public getRowId = (row: any) => row.id;

  public render() {
    const { columns, defaultColumnWidths } = this.state;
    const { bossAbilities, cooldowns, currentPhase, phases } = this.props;
    const phaseStartTime = phases[phases.findIndex(p => p.id === currentPhase)].timer || 0;
    const phaseEndTime = currentPhase + 1 < phases.length
      ? phases[phases.findIndex(p => p.id === currentPhase + 1)].timer
      : 9999;
    const filteredBossAbilities = bossAbilities
      .filter(ba => ba.timer >= phaseStartTime && ba.timer < phaseEndTime)
      .sort((a, b) => a.timer - b.timer);
    const allRows = [...filteredBossAbilities, ...cooldowns];
    const allIds = filteredBossAbilities.map(ability => ability.id);
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
          <CustomTreeData            
            getChildRows={this.getChildRows}
          />
          <Table />
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
