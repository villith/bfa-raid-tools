import { List, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { BossAbility } from '../../classes/BossAbility';
import { Cooldown } from '../../classes/Cooldown';
import { Phase } from '../../classes/Phase';
import { Player } from '../../classes/Player';
import BossAbilityListRow from './BossAbilityListRow';

export interface IBossAbilityListProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  currentPhase: number;
  handleCooldownPickerChange: ((cooldownId: string, bossAbilityId: string, timer: number) => void);
  phases: Phase[];
  players: Player[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class BossAbilityList extends React.Component<WithStyles<any> & IBossAbilityListProps> {
  public getAssignedCooldowns = (bossAbilityId: string) => {
    console.dir(this.props.cooldowns);
    return this.props.cooldowns.filter(cooldown => cooldown.bossAbilities.indexOf(bossAbilityId) !== -1);
  }
  public render() {
    const { bossAbilities, cooldowns, currentPhase, handleCooldownPickerChange, players, phases } = this.props;
    const phaseStartTime = phases[phases.findIndex(p => p.id === currentPhase)].timer || 0;
    const phaseEndTime = currentPhase + 1 < phases.length
      ? phases[phases.findIndex(p => p.id === currentPhase + 1)].timer
      : 9999;
    return (
      <List>
        {/* <BossAbilityListHeader /> */}
        {bossAbilities
          .filter(ba => ba.timer >= phaseStartTime && ba.timer < phaseEndTime)
          .map((bossAbility, index) => {
            const { cooldownTypes, icon, id, label, spellId, timer } = bossAbility;
            const assignedCooldowns = this.getAssignedCooldowns(id);
            return <BossAbilityListRow
              key={index}
              assignedCooldowns={assignedCooldowns}
              cooldowns={cooldowns}
              cooldownTypes={cooldownTypes}
              handleCooldownPickerChange={handleCooldownPickerChange}
              icon={icon}
              id={id}
              label={label}
              spellId={spellId}
              timer={timer}
              players={players}
              bossAbilities={bossAbilities}
            />
          })
        }
      </List>
    );
  }
}

export default withStyles(styles)(BossAbilityList);
