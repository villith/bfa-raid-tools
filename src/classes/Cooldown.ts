import { CooldownType } from '../enums/cooldownType';
import { WOWClass } from '../enums/WOWclass';
import { WOWSpec } from '../enums/WOWspec';
import { uuid } from '../helpers/createGuid';

/**
 *
 *
 * @class Cooldown
 */
class Cooldown {
  public id: string = uuid();
  public spellId: number;
  public name: string;
  public icon: string;
  public cooldownType: CooldownType;
  public cooldownTime: number;
  public altCooldownTime: number | null;
  public charges: number | null;
  public cdClass: WOWClass;
  public cdSpec: WOWSpec;
  public owner: string;
  public bossAbilities: string[] = [];
  public timers: number[] = [];

  /**
   * Creates an instance of Cooldown.
   * @param {number} spellId
   * @param {string} name
   * @param {string} icon
   * @param {CooldownType} cooldownType
   * @param {number} cooldownTime
   * @param {WOWClass} cdClass
   * @param {WOWSpec} cdSpec
   * @param {string} owner
   * @param {number} [altCooldownTime]
   * @param {number} [charges]
   * @memberof Cooldown
   */
  constructor(spellId: number, name: string, icon: string, cooldownType: CooldownType,
    cooldownTime: number, cdClass: WOWClass, cdSpec: WOWSpec, owner: string,
    altCooldownTime: number | null, charges: number | null)
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
