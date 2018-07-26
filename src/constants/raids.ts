import { Raid } from '../enums/raid';
import { BossUldir } from '../enums/bossUldir';
import { BossAntorus } from '../enums/bossAntorus';
import { BossTomb } from '../enums/bossTomb';
import { CooldownType } from '../enums/cooldownType';

type Boss = BossUldir | BossAntorus | BossTomb;

interface IRaid {
  id: Raid;
  label: string;
  bosses: IBoss[];
}

interface IBoss {
  id: Boss;
  label: string;
  icon: string;
  abilities: IBossAbility[];
}

interface IBossAbility {
  id: number;
  label: string;
  icon: string;
  cooldownTypes: CooldownType[];
  firstCast: number | null;
  cooldown: number;
}
const RAIDS: IRaid[] = [
  {
    id: Raid.ULDIR,
    label: 'Uldir',
    bosses: [
      {
        id: BossUldir.TALOC,
        label: 'Taloc',
        icon: 'boss-taloc',
        abilities: [
          {
            id: 244761,
            label: 'Annihilation',
            icon: 'ability_warlock_backdraftgreen',
            cooldownTypes: [CooldownType.HEALING],            
            firstCast: 8,
            cooldown: 32,
          }
        ],
      }, 
    ]
  }
];

export { RAIDS };