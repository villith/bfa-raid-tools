import { BossAntorus } from '../enums/bossAntorus';
import { BossTomb } from '../enums/bossTomb';
import { BossUldir } from '../enums/bossUldir';
import { BossAbility } from './BossAbility';
import { Phase } from './Phase';
import { Player } from './Player';

type BossType = BossUldir | BossAntorus | BossTomb;

class Boss {
  public id: BossType;
  public label: string;
  public title: string;
  public icon: string;
  public abilities: BossAbility[];
  public phases: Phase[];
  public roster: Player[];

  constructor(id: BossType, label: string, title: string, icon: string,
    abilities: BossAbility[], phases: Phase[], roster: Player[]
  ) {
    this.id = id;
    this.label = label;
    this.title = title;
    this.icon = icon;
    this.abilities = abilities;
    this.phases = phases;
    this.roster = roster;
  }
}

export { Boss };
