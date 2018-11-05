import { BossUldir } from '../enums/bossUldir';
import { WOWClass } from '../enums/WOWclass';
import { WOWSpec } from '../enums/WOWspec';
import { uuid } from '../helpers/createGuid';
import { getSpecInfo } from '../helpers/getClassInfo';
import { Cooldown } from './Cooldown';

interface IPlayerBossMap {
  [index: number]: boolean;
}

enum PlayerListType {
  ALL,
  BOSS_ROSTER
}

class Player {
  public id: string = uuid();
  public playerName: string;
  public playerClass: WOWClass;
  public playerSpec: WOWSpec;
  public bosses: IPlayerBossMap;
  public cooldowns: Cooldown[];

  constructor(playerName: string, playerClass: WOWClass, playerSpec: WOWSpec) {
    this.playerName = playerName;
    this.playerClass = playerClass;
    this.playerSpec = playerSpec;
    this.bosses = this.buildBossMap();
    this.cooldowns = this.buildCooldowns();
  }

  public buildCooldowns() {
    const cooldowns: Cooldown[] = [];    
    const specInfo = getSpecInfo(this.playerClass, this.playerSpec);
    specInfo!.cooldowns.map(cooldown => cooldowns.push(
      new Cooldown(
        cooldown.spellId,
        cooldown.label,
        cooldown.icon,
        cooldown.cooldownType,
        cooldown.cooldownTime,
        cooldown.WOWClass,
        cooldown.WOWSpec,
        this.id,
        cooldown.altCooldownTime,
        cooldown.charges || 0,
      )
    ));
    return cooldowns;
  }

  public buildBossMap() {
    const bosses: IPlayerBossMap = {};
    Object.keys(BossUldir).filter(b => Number(b)).map(boss => {
      bosses[boss] = false;
    });
    bosses[0] = true;
    return bosses;
  }
}

export { Player, PlayerListType };
