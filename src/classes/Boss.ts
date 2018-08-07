import { BossUldir } from '../enums/bossUldir';
import { BossAbility } from './BossAbility';
import { Cooldown } from './Cooldown';
import { Phase } from './Phase';

type BossType = BossUldir | 'home';

interface IBossMap {
  [index: number]: Boss;
}

class Boss {
  public id: BossType;
  public label: string;
  public title: string;
  public icon: string;
  public abilities: BossAbility[];
  public cooldowns: Cooldown[];
  public phases: Phase[];

  constructor(id: BossType, label: string, title: string, icon: string,
    abilities: BossAbility[], cooldowns: Cooldown[], phases: Phase[]
  ) {
    this.id = id;
    this.label = label;
    this.title = title;
    this.icon = icon;
    this.abilities = abilities;
    this.cooldowns = cooldowns;
    this.phases = phases;
  }
}

export { Boss, BossType, IBossMap };
