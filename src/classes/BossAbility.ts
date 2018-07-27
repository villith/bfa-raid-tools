import { CooldownType } from '../enums/cooldownType';
import { Cooldown } from './Cooldown';

class BossAbility {
  public id: number;
  public spellId: number;
  public label: string;
  public icon: string;
  public cooldownTypes: CooldownType[];
  public cooldown: number;
  public firstCast?: number;
  public cooldowns: Cooldown[];

  constructor(id: number, spellId: number, label: string, icon: string,
    cooldownTypes: CooldownType[], cooldown: number, cooldowns: Cooldown[],
    firstCast?: number
  ) {
    this.id = id;
    this.spellId = spellId;
    this.label = label;
    this.icon = icon;
    this.cooldownTypes = cooldownTypes;    
    this.cooldown = cooldown;
    this.cooldowns = cooldowns;
    this.firstCast = firstCast;
  }
}

export { BossAbility };
