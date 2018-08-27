import { BossAbility } from '../classes/BossAbility';
import { Phase } from '../classes/Phase';
import { BossUldir } from '../enums/bossUldir';
import { TalocEncounter } from './Taloc';

const buildBossAbilityList = (id: BossUldir, phases: Phase[], abilities: BossAbility[] = []) => {
  switch (id) {
    case BossUldir.TALOC:
      return TalocEncounter(phases, abilities);
    default:
      return [] as BossAbility[];
  }
};

export { buildBossAbilityList };
