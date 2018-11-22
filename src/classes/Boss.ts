import { buildBossAbilityList } from '../bosses';
import { BossUldir } from '../enums/bossUldir';
import { Raid } from '../enums/raid';
import { getBossInfo } from '../helpers/getRaidInfo';
import { BossAbility, IBossAbility } from './BossAbility';
import { Cooldown } from './Cooldown';
import { IPhase, Phase } from './Phase';
import { Player } from './Player';

type BossType = BossUldir;

interface IBossMap {
  [index: number]: Boss;
}

interface IBoss {
  id: BossType;
  raidId: Raid;
  label: string;
  title: string;
  icon: string;
  abilities: IBossAbility[];
  phases: IPhase[];
  roster?: Player[];
  cooldowns?: Cooldown[];
}

class Boss {
  public id: BossType;
  public raidId: Raid;
  public label: string;
  public title: string;
  public icon: string;
  public abilities: BossAbility[];
  public cooldowns: Cooldown[] = [];
  public phases: Phase[];

  constructor(id: BossType, raidId: Raid, label: string, title: string, icon: string) {
    this.id = id;
    this.raidId = raidId;
    this.label = label;
    this.title = title;
    this.icon = icon;
    this.phases = this.buildPhaseList();
    this.abilities = buildBossAbilityList(this.id, this.phases)
  }

  public buildPhaseList = () => {
    const newPhases: Phase[] = [];
    const bossInfo = getBossInfo(Raid.ULDIR, this.id);
    bossInfo.phases.map((phase, index) => newPhases.push(
      new Phase(
        index,
        phase.label,
        phase.estimatedStartTime,
      )
    ));
    return newPhases;
  }
}

export { Boss, BossType, IBoss, IBossMap };
