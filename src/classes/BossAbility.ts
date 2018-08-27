import { CooldownType } from '../enums/cooldownType';
import { uuid } from '../helpers/createGuid';

class BossAbility {
  public id: string;
  public spellId: number;
  public label: string;
  public icon: string;
  public cooldownTypes: CooldownType[];
  public timer: number;

  constructor(spellId: number, label: string, icon: string, cooldownTypes: CooldownType[], timer: number, id?: string) {
    this.spellId = spellId;
    this.label = label;
    this.icon = icon;
    this.cooldownTypes = cooldownTypes;    
    this.timer = timer;
    this.id = id || uuid();
  }
}

interface IBossAbility {
  spellId: number;
  label: string;
  icon: string;
  cooldownTypes: CooldownType[];
  firstCast: number | null;
  cooldown: number;
  phases: number[];
}

export { BossAbility, IBossAbility };
