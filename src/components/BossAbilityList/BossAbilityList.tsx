import { CustomTreeData, DataTypeProvider, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { Button, Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';

export interface IBossAbilityListState {
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
      { name: 'addCooldown', title: '' }
    ],
    defaultColumnWidths: [
      { columnName: 'icon', width: 100 },
      { columnName: 'label', width: 300 },
      { columnName: 'timer', width: 100 }
    ],
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
      <Button variant='flat' color='primary'>
        <AddIcon />
      </Button>
    return addCooldownComponent;
  }

  public getChildRows = (row: any, data: Array<BossAbility | Cooldown>) => {
    if (row) { 
      const childRows = data.filter(r => {
        if (r.hasOwnProperty('bossAbilities')) {
          const cooldownRow = r as Cooldown;
          const { bossAbilities } = cooldownRow;
          const result = bossAbilities.includes(row ? row.id : '');
          console.log(result);
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

  public getRowId = (row: any) => row.id;

  public render() {
    const { columns } = this.state;
    const { bossAbilities, cooldowns } = this.props;
    // const phaseStartTime = phases[phases.findIndex(p => p.id === currentPhase)].timer || 0;
    // const phaseEndTime = currentPhase + 1 < phases.length
    //   ? phases[phases.findIndex(p => p.id === currentPhase + 1)].timer
    //   : 9999;
    return (
      <Paper>
        <Grid
          rows={[...bossAbilities, ...cooldowns]}
          columns={columns}
          getRowId={this.getRowId}
        >
          <TreeDataState />
          <DataTypeProvider
            for={['icon']}
            formatterComponent={this.getAbilityIconComponent}
          />
          <DataTypeProvider
            for={['addCooldown']}
            formatterComponent={this.getAddCooldownComponent}
          />
          <CustomTreeData            
            getChildRows={this.getChildRows}
          />
          <Table />
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
