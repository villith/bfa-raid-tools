import { CooldownType } from '../enums/cooldownType';
import { WOWClass } from '../enums/WOWclass';
import { WOWSpec } from '../enums/WOWspec';

class Cooldown {
  public spellId: number;
  public name: string;
  public icon: string;
  public cooldownType: CooldownType;
  public cooldownTime: number;
  public altCooldownTime?: number;
  public charges?: number;
  public cdClass: WOWClass;
  public cdSpec: WOWSpec;
  public owner: number;

  constructor(spellId: number, name: string, icon: string, cooldownType: CooldownType,
    cooldownTime: number, cdClass: WOWClass, cdSpec: WOWSpec, owner: number,
    altCooldownTime?: number, charges?: number)
  {
    this.spellId = spellId;
    this.name = name;
    this.icon = icon;
    this.cooldownType = cooldownType;
    this.cooldownTime = cooldownTime;
    this.altCooldownTime = altCooldownTime;
    this.charges = charges;
    this.cdClass = cdClass;
    this.cdSpec = cdSpec;
    this.owner = owner;
  }
}

export { Cooldown };
