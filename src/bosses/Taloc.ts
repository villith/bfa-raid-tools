import { BossAbility, IBossAbility } from '../classes/BossAbility';
import { Phase } from '../classes/Phase';
import { RAIDS } from '../constants/raids';
import { BossUldir } from '../enums/bossUldir';
import { Raid } from '../enums/raid';
import { findById, findBySpellId } from '../helpers/getGeneric';

const raidId = Raid.ULDIR;
const bossId = BossUldir.TALOC;
const bosses = RAIDS[findById(raidId, RAIDS)].bosses;
const boss = bosses[findById(bossId, bosses)];

enum SpellId {
  PLASMA_DISCHARGE = 271224,
  CUDGEL_OF_GORE = 271296,
  RETRIEVE_CUDGEL = 271728,
  ENLARGED_HEART = 275205,
  CLOGGED_ARTERIES = 275189,
}

const bossAbilities: { [index: number]: IBossAbility } = {};

const { abilities } = boss;

const buildBossAbility = (id: SpellId) => {
  const bossAbility = boss.abilities[findBySpellId(id, abilities)];
  bossAbilities[bossAbility.spellId] = bossAbility;  
};

const TalocEncounter = (phases: Phase[], existingAbilities: BossAbility[]) => {
  const bossAbilityList: BossAbility[] = [];

  const plasmaDischarge = bossAbilities[SpellId.PLASMA_DISCHARGE];
  const cudgelOfGore = bossAbilities[SpellId.CUDGEL_OF_GORE];
  const retrieveCudgel = bossAbilities[SpellId.RETRIEVE_CUDGEL];
  const enlargedHeart = bossAbilities[SpellId.ENLARGED_HEART];
  const cloggedArteries = bossAbilities[SpellId.CLOGGED_ARTERIES];

  const pOne = phases[0];
  const pOneTimer = pOne.timer;
  const pOneAC: { [index: number]: number } = {};

  const pTwo = phases[1];
  const pTwoTimer = pTwo.timer;
  const pTwoAC: { [index: number]: number } = {};

  const pThree = phases[2];
  const pThreeTimer = pThree.timer;
  const pThreeAC: { [index: number]: number } = {};

  Object.keys(bossAbilities).map(key => {
    pOneAC[key] = 0;
    pTwoAC[key] = 0
    pThreeAC[key] = 0
  });
  
  // PHASE 1

  if (existingAbilities.length > 0) {
    existingAbilities.map(ability => {
      if (phaseWindow(pOneTimer, pTwoTimer, ability.timer)) {
        bossAbilityList.push(createExisitingBossAbility(ability, ability.timer));
        pOneAC[ability.spellId] += 1;
      }
    });
  }
  else {
    bossAbilityList.push(createNewBossAbility(plasmaDischarge, plasmaDischarge.firstCast!));
    pOneAC[plasmaDischarge.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(cudgelOfGore, cudgelOfGore.firstCast!));
    pOneAC[cudgelOfGore.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(retrieveCudgel, retrieveCudgel.firstCast!));
    pOneAC[retrieveCudgel.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(enlargedHeart, enlargedHeart.firstCast!));
    pOneAC[enlargedHeart.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(cloggedArteries, cloggedArteries.firstCast!));
    pOneAC[cloggedArteries.spellId] += 1;

    // PHASE 2 - Begins at 60%

    if (existingAbilities.length > 0) {
      existingAbilities.map(ability => {
        if (phaseWindow(pTwoTimer, pThreeTimer, ability.timer)) {
          bossAbilityList.push(createExisitingBossAbility(ability, ability.timer));
          pTwoAC[ability.spellId] += 1;
        }
      });
    }

    // PHASE 3 - Begins 88.8 seconds after Phase 2
    
    if (existingAbilities.length > 0) {
      existingAbilities.map(ability => {
        if (phaseWindow(pThreeTimer, 9999, ability.timer)) {
          bossAbilityList.push(createExisitingBossAbility(ability, ability.timer));
          pThreeAC[ability.spellId] += 1;
        }
      });
    }

    bossAbilityList.push(createNewBossAbility(plasmaDischarge, plasmaDischarge.firstCast! + pThreeTimer));
    pOneAC[plasmaDischarge.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(cudgelOfGore, cudgelOfGore.firstCast! + pThreeTimer));
    pOneAC[cudgelOfGore.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(retrieveCudgel, retrieveCudgel.firstCast! + pThreeTimer));
    pOneAC[retrieveCudgel.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(enlargedHeart, enlargedHeart.firstCast! + pThreeTimer));
    pOneAC[enlargedHeart.spellId] += 1;

    bossAbilityList.push(createNewBossAbility(cloggedArteries, cloggedArteries.firstCast! + pThreeTimer));
    pOneAC[cloggedArteries.spellId] += 1;
  }
  return bossAbilityList;
};

const createNewBossAbility = (ability: IBossAbility, timer: number) => {
  const newAbility = new BossAbility(
    ability.spellId,
    ability.label,
    ability.icon,
    ability.cooldownTypes,
    timer
  );

  return newAbility;
};

const createExisitingBossAbility = (ability: BossAbility, timer: number) => {
  const existingAbility = new BossAbility(
    ability.spellId,
    ability.label,
    ability.icon,
    ability.cooldownTypes,
    timer,
    ability.id
  );

  return existingAbility;
};

const phaseWindow = (pOne: number, pTwo: number, timer: number) => {
  return timer >= pOne && timer < pTwo;
};

abilities.map(ability => buildBossAbility(ability.spellId));


export { TalocEncounter };

