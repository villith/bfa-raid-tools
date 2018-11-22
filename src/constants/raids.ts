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
        raidId: Raid.ULDIR,
        label: 'Uldir',
        title: 'Halls of Control',
        icon: '',
        abilities: [],
        phases: []
      },
      {
        id: BossUldir.TALOC,
        raidId: Raid.ULDIR,
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
          {
            spellId: 275189,
            label: 'Hardened Arteries',
            icon: 'ability_rogue_sanguinaryvein',
            cooldownTypes: [CooldownType.HEALING, CooldownType.MOVEMENT],
            firstCast: 24,
            cooldown: 0,
            phases: [0, 2],
          },
          {
            spellId: 275205,
            label: 'Enlarged Heart',
            icon: 'inv_ragnaros_heart',
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
        raidId: Raid.ULDIR,
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
        raidId: Raid.ULDIR,
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
        raidId: Raid.ULDIR,
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
        raidId: Raid.ULDIR,
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
        raidId: Raid.ULDIR,
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
        raidId: Raid.ULDIR,
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
        raidId: Raid.ULDIR,
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