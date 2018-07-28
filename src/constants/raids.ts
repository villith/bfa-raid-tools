import { Raid } from '../enums/raid';
import { BossUldir } from '../enums/bossUldir';
import { BossAntorus } from '../enums/bossAntorus';
import { BossTomb } from '../enums/bossTomb';
import { CooldownType } from '../enums/cooldownType';
import { Cooldown } from '../classes/Cooldown';
import { Player } from '../classes/Player';

type Boss = BossUldir | BossAntorus | BossTomb;

interface IRaid {
  id: Raid;
  label: string;
  bosses: IBoss[];
}

interface IBoss {
  id: Boss;
  label: string;
  title: string;
  icon: string;
  abilities: IBossAbility[];
  phases: IBossPhase[];
  roster?: Player[];
}

interface IBossAbility {
  id?: number;
  spellId: number;
  label: string;
  icon: string;
  cooldownTypes: CooldownType[];
  firstCast: number | undefined;
  cooldown: number;
  phases: number[];
  cooldowns?: Cooldown[];
}

interface IBossPhase {
  id: number;
  label: string;
  estimatedStartTime: number;
  startTime?: number;
  duration?: number;
  bossPercentage?: number;
}

const RAIDS: IRaid[] = [
  {
    id: Raid.ULDIR,
    label: 'Uldir',
    bosses: [
      {
        id: BossUldir.TALOC,
        label: 'Taloc',
        title: ' the Corrupted',
        icon: 'talocthecorrupted',
        abilities: [
          {
            spellId: 271224,
            label: 'Plasma Discharge',
            icon: 'inv_misc_boilingblood',
            cooldownTypes: [CooldownType.HEALING],            
            firstCast: 6,
            cooldown: 32,
            phases: [0, 2]
          },
          {
            spellId: 272582,
            label: 'Sanguine Static',
            icon: 'sha_ability_mage_firestarter_nightmare',
            cooldownTypes: [CooldownType.HEALING],
            firstCast: 20.5,
            cooldown: 61,
            phases: [0, 2]
          },
          {
            spellId: 271296,
            label: 'Cudgel of Gore',
            icon: 'inv_mace_2h_capturedtitanconstruct_d_01',
            cooldownTypes: [CooldownType.MOVEMENT],
            firstCast: 31.5,
            cooldown: 59,
            phases: [0, 2]
          },
          {
            spellId: 271728,
            label: 'Retrieve Cudgel',
            icon: 'inv_gauntlets_86',
            cooldownTypes: [CooldownType.MOVEMENT],
            firstCast: 53.5,
            cooldown: 59,
            phases: [0, 2]
          },
        ],
        phases: [
          {
            id: 0,
            label: 'Phase One',
            estimatedStartTime: 0,
            startTime: 0
          },
          {
            id: 1,
            label: 'Powered Down',
            estimatedStartTime: 120,
            bossPercentage: 60,
            duration: 88.8,
          },
          {
            id: 2,
            label: 'Phase Three',
            estimatedStartTime: 208.8,
          }
        ]
      },
      {
        id: BossUldir.MOTHER,
        label: 'MOTHER',
        title: '',
        icon: 'mother',
        abilities: [],
        phases: []
      },
      {
        id: BossUldir.FETID_DEVOURER,
        label: 'Fetid Devourer',
        title: '',
        icon: 'fetiddevourer',
        abilities: [],
        phases: []
      },
      {
        id: BossUldir.ZEKVOZ,
        label: 'Zek\'voz',
        title: 'Herald of N\'zoth',
        icon: 'zekvoz',
        abilities: [],
        phases: []
      },
      {
        id: BossUldir.VECTIS,
        label: 'Vectis',
        title: '',
        icon: 'bloodofghuun',
        abilities: [],
        phases: []
      },
      {
        id: BossUldir.ZUL,
        label: 'Zul',
        title: 'Reborn',
        icon: 'zul',
        abilities: [],
        phases: []
      },
      {
        id: BossUldir.MYTHRAX,
        label: 'Mythrax',
        title: 'the Unraveler',
        icon: 'mythraxtheunraveler',
        abilities: [],
        phases: []
      },
      {
        id: BossUldir.GHUUN,
        label: 'G\'huun',
        title: '',
        icon: 'ghuun',
        abilities: [],
        phases: []
      }, 
    ]
  }
];

export { RAIDS };