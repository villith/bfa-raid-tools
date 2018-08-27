import { IBoss } from '../classes/Boss';
import { BossUldir } from '../enums/bossUldir';
import { CooldownType } from '../enums/cooldownType';
import { Raid } from '../enums/raid';

interface IRaid {
  id: Raid;
  label: string;
  bosses: IBoss[];
}

const RAIDS: IRaid[] = [
  {
    id: Raid.ULDIR,
    label: 'Uldir',
    bosses: [
      {
        id: BossUldir.HOME,
        label: 'Uldir',
        title: 'Halls of Control',
        icon: '',
        abilities: [],
        phases: []
      },
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
            cooldownTypes: [CooldownType.HEALING, CooldownType.DEFENSIVE],
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
            cooldownTypes: [CooldownType.MOVEMENT, CooldownType.IMMUNITY],
            firstCast: 53.5,
            cooldown: 59,
            phases: [0, 2]
          },
          {
            spellId: 275189,
            label: 'Clogged Arteries',
            icon: '',
            cooldownTypes: [CooldownType.HEALING, CooldownType.MOVEMENT],
            firstCast: 24,
            cooldown: 0,
            phases: [0, 2],
          },
          {
            spellId: 275205,
            label: 'Enlarged Heart',
            icon: '',
            cooldownTypes: [CooldownType.DEFENSIVE, CooldownType.EXTERNAL, CooldownType.HEALING],
            firstCast: 25,
            cooldown: 0,
            phases: [0, 2],
          }
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
        id: BossUldir.FETID_DEVOURER,
        label: 'Fetid Devourer',
        title: '',
        icon: 'fetiddevourer',
        abilities: [],
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
        id: BossUldir.ZEKVOZ,
        label: 'Zek\'voz',
        title: 'Herald of N\'zoth',
        icon: 'zekvoz',
        abilities: [],
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
        id: BossUldir.VECTIS,
        label: 'Vectis',
        title: '',
        icon: 'bloodofghuun',
        abilities: [],
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
        id: BossUldir.ZUL,
        label: 'Zul',
        title: 'Reborn',
        icon: 'zul',
        abilities: [],
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
        id: BossUldir.MYTHRAX,
        label: 'Mythrax',
        title: 'the Unraveler',
        icon: 'mythraxtheunraveler',
        abilities: [],
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
        id: BossUldir.GHUUN,
        label: 'G\'huun',
        title: '',
        icon: 'ghuun',
        abilities: [],
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
    ]
  }
];

export { RAIDS };