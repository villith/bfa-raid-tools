import { WOWClass } from '../enums/WOWclass';
import { CooldownType } from '../enums/cooldownType';
import { Role } from '../enums/role';
import { WOWSpec } from '../enums/WOWspec';

interface IWOWClass {
  id: WOWClass,
  label: string;
  icon: string;
  classColor: string;
  specs: IWOWSpec[]
}

interface IWOWSpec {
  id: WOWSpec;
  name: string;
  icon: string;
  isMelee: boolean;
  role: Role;
  WOWClass: WOWClass;
  cooldowns: IWOWCooldown[]
}

interface IWOWCooldown {
  spellId: number;
  name: string;
  icon: string;
  cooldownType: CooldownType;
  cooldownTime: number;
  altCooldownTime?: number;
  charges?: number;
  WOWClass: WOWClass;
  WOWSpec: WOWSpec;
}

const classes: IWOWClass[] = [
  {
    id: WOWClass.DEATH_KNIGHT,
    label: 'Death Knight',
    icon: 'class_deathknight',
    classColor: '#C41F3B',
    specs: [
      {
        id: WOWSpec.BLOOD,
        name: 'Blood',
        icon: 'spell_deathknight_bloodpresence',
        isMelee: true,
        role: Role.TANK,
        WOWClass: WOWClass.DEATH_KNIGHT,
        cooldowns: [
          {
            spellId: 48707,
            name: 'Anti-Magic Shell',
            icon: 'spell_shadow_antimagicshell',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 60,
            altCooldownTime: 45,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 49576,
            name: 'Death Grip',
            icon: 'spell_deathknight_strangulate',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 25,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 108199,
            name: "Gorefiend's Grasp",
            icon: 'ability_deathknight_aoedeathgrip',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 120,
            altCooldownTime: 90,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 114556,
            name: 'Purgatory',
            icon: 'inv_misc_shadowegg',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 240,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 61999,
            name: 'Raise Ally',
            icon: 'spell_shadow_deadofnight',
            cooldownType: CooldownType.BATTLE_RESURRECTION,
            cooldownTime: 600,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 55233,
            name: 'Vampiric Blood',
            icon: 'spell_shadow_lifedrain',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 90,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 194679,
            name: 'Rune Tap',
            icon: 'spell_deathknight_runetap',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 25,
            charges: 0,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 219809,
            name: 'Tombstone',
            icon: 'ability_fiegndead',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 60,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 48792,
            name: 'Icebound Fortitude',
            icon: 'spell_deathknight_iceboundfortitude',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 180,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 49028,
            name: 'Dancing Rune Weapon',
            icon: 'inv_sword_07',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 120,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          }
        ]
      },
      {
        id: WOWSpec.FROST_DEATH_KNIGHT,
        name: 'Frost',
        icon: 'spell_deathknight_frostpresence',
        isMelee: true,
        role: Role.DPS,
        WOWClass: WOWClass.DEATH_KNIGHT,
        cooldowns: [
          {
            spellId: 48707,
            name: 'Anti-Magic Shell',
            icon: 'spell_shadow_antimagicshell',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 60,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.FROST_DEATH_KNIGHT,
          },
          {
            spellId: 49576,
            name: 'Death Grip',
            icon: 'spell_deathknight_strangulate',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 25,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.FROST_DEATH_KNIGHT,
          },
          {
            spellId: 61999,
            name: 'Raise Ally',
            icon: 'spell_shadow_deadofnight',
            cooldownType: CooldownType.BATTLE_RESURRECTION,
            cooldownTime: 600,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.FROST_DEATH_KNIGHT,
          }
        ]
      },
      {
        id: WOWSpec.UNHOLY,
        name: 'Unholy',
        icon: 'spell_deathknight_unholypresence',
        isMelee: true,
        role: Role.DPS,
        WOWClass: WOWClass.DEATH_KNIGHT,
        cooldowns: [
          {
            spellId: 48707,
            name: 'Anti-Magic Shell',
            icon: 'spell_shadow_antimagicshell',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 60,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.UNHOLY,
          },
          {
            spellId: 49576,
            name: 'Death Grip',
            icon: 'spell_deathknight_strangulate',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 25,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.UNHOLY,
          },
          {
            spellId: 61999,
            name: 'Raise Ally',
            icon: 'spell_shadow_deadofnight',
            cooldownType: CooldownType.BATTLE_RESURRECTION,
            cooldownTime: 600,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.UNHOLY,
          }
        ]
      }
    ]
  },
  // {
  //   id: WOWClass.DEMON_HUNTER,
  //   label: 'Demon Hunter',
  //   specs: [
  //     {
  //       name: 'Havoc',
  //       icon: 'ability_demonhunter_specdps',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 179057,
  //           name: 'Chaos Nova',
  //           icon: 'spell_fire_felfirenova',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60,
  //           altCooldownTime: 40
  //         },
  //         {
  //           id: 196718,
  //           name: 'Darkness',
  //           icon: 'ability_demonhunter_darkness',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 196555,
  //           name: 'Netherwalk',
  //           icon: 'spell_warlock_demonsoul',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 120
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Vengeance',
  //       icon: 'ability_demonhunter_spectank',
  //       isMelee: true,
  //       role: Role.TANK,
  //       cooldowns: [
  //         {
  //           id: 235169,
  //           name: "Archimonde's Hatred Reborn",
  //           icon: 'spell_nature_elementalshields',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 85,
  //           charges: 0
  //         },
  //         {
  //           id: 202138,
  //           name: 'Sigil of Chains',
  //           icon: 'ability_demonhunter_sigilofchains',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 90
  //         },
  //         {
  //           id: 207684,
  //           name: 'Sigil of Misery',
  //           icon: 'ability_demonhunter_sigilofmisery',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60,
  //           altCooldownTime: 48
  //         },
  //         {
  //           id: 202137,
  //           name: 'Sigil of Silence',
  //           icon: 'ability_demonhunter_sigilofsilence',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60,
  //           altCooldownTime: 48
  //         },
  //         {
  //           id: 204021,
  //           name: 'Fiery Brand',
  //           icon: 'ability_demonhunter_fierybrand',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 60
  //         },
  //         {
  //           id: 209258,
  //           name: 'Last Resort',
  //           icon: 'inv_glaive_1h_artifactaldorchi_d_06',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 480
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: WOWClass.DRUID,
  //   label: 'Druid',
  //   specs: [
  //     {
  //       name: 'Balance',
  //       icon: 'spell_nature_starfall',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 29166,
  //           name: 'Innervate',
  //           icon: 'spell_nature_lightning',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 20484,
  //           name: 'Rebirth',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 78675,
  //           name: 'Solar Beam',
  //           icon: 'ability_vehicle_sonicshockwave',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Feral',
  //       icon: 'ability_druid_catform',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 20484,
  //           name: 'Rebirth',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 106898,
  //           name: 'Stampeding Roar',
  //           icon: 'spell_druid_stampedingroar_cat',
  //           cooldownType: CooldownType.MOVEMENT,
  //           cooldownTime: 120
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Guardian',
  //       icon: 'ability_racial_bearform',
  //       isMelee: true,
  //       role: Role.TANK,
  //       cooldowns: [
  //         {
  //           id: 20484,
  //           name: 'Rebirth',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 77761,
  //           name: 'Stampeding Roar',
  //           icon: 'spell_druid_stamedingroar',
  //           cooldownType: CooldownType.MOVEMENT,
  //           cooldownTime: 120
  //         },
  //         {
  //           id: 235169,
  //           name: "Archimonde's Hatred Reborn",
  //           icon: 'spell_nature_elementalshields',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 85,
  //           charges: 0
  //         },
  //         {
  //           id: 61336,
  //           name: 'Survival Instincts',
  //           icon: 'ability_druid_tigersroar',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 180,
  //           altCooldownTime: 120,
  //           charges: 2
  //         },
  //         {
  //           id: 200851,
  //           name: 'Rage of the Sleeper',
  //           icon: 'inv_hand_1h_artifactursoc_d_01',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 90
  //         },
  //         {
  //           id: 22812,
  //           name: 'Barkskin',
  //           icon: 'spell_nature_stoneclawtotem',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 54
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Restoration',
  //       icon: 'spell_nature_healingtouch',
  //       isMelee: false,
  //       role: Role.HEALER,
  //       cooldowns: [
  //         {
  //           id: 102342,
  //           name: 'Ironbark',
  //           icon: 'spell_druid_ironbark',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 90,
  //           altCooldownTime: 60
  //         },
  //         {
  //           id: 740,
  //           name: 'Tranquility',
  //           icon: 'spell_nature_tranquility',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180,
  //           altCooldownTime: 120
  //         },
  //         {
  //           id: 20484,
  //           name: 'Rebirth',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         },
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: WOWClass.HUNTER,
  //   label: 'Hunter',
  //   specs: [
  //     {
  //       name: 'Beast Mastery',
  //       icon: 'ability_hunter_bestialdiscipline',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 186265,
  //           name: 'Aspect of the Turtle',
  //           icon: 'ability_hunter_pet_turtle',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 180
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Marksmanship',
  //       icon: 'ability_hunter_focusedaim',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 186265,
  //           name: 'Aspect of the Turtle',
  //           icon: 'ability_hunter_pet_turtle',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 180
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Survival',
  //       icon: 'ability_hunter_camouflage',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 186265,
  //           name: 'Aspect of the Turtle',
  //           icon: 'ability_hunter_pet_turtle',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 180
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: WOWClass.MAGE,
  //   label: 'Mage',
  //   specs: [
  //     {      
  //       name: 'Arcane',
  //       icon: 'spell_holy_magicalsentry',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 45438,
  //           name: 'Ice Block',
  //           icon: 'spell_frost_frost',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 600
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Fire',
  //       icon: 'spell_fire_flamebolt',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 86949,
  //           name: 'Cauterize',
  //           icon: 'spell_fire_rune',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 45438,
  //           name: 'Ice Block',
  //           icon: 'spell_frost_frost',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 600
  //         }
  //       ]
  //     },
  //     {     
  //       name: 'Frost',
  //       icon: 'spell_frost_frostbolt02',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 45438,
  //           name: 'Ice Block',
  //           icon: 'spell_frost_frost',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 600,
  //           altCooldownTime: 30
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   name: 'Monk',
  //   specs: {
  //     BREWMASTER: {
  //       id: 0,
  //       name: 'Brewmaster',
  //       icon: 'spell_monk_brewmaster_spec',
  //       isMelee: true,
  //       role: Role.TANK,
  //       cooldowns: [
  //         {
  //           id: 119381,
  //           name: 'Leg Sweep',
  //           icon: 'ability_monk_legsweep',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 45
  //         },
  //         {
  //           id: 235169,
  //           name: "Archimonde's Hatred Reborn",
  //           icon: 'spell_nature_elementalshields',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 85,
  //           charges: 0
  //         }
  //       ]
  //     },
  //     MISTWEAVER: {
  //       id: 1,
  //       name: 'Mistweaver',
  //       icon: 'spell_monk_mistweaver_spec',
  //       isMelee: false,
  //       role: Role.HEALER,
  //       cooldowns: [
  //         {
  //           id: 119381,
  //           name: 'Leg Sweep',
  //           icon: 'ability_monk_legsweep',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 45
  //         },
  //         {
  //           id: 116844,
  //           name: 'Ring of Peace',
  //           icon: 'spell_monk_ringofpeace',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 45
  //         },
  //         {
  //           id: 198664,
  //           name: 'Invoke Chi-Ji, the Red Crane',
  //           icon: 'inv_pet_cranegod',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 116849,
  //           name: 'Life Cocoon',
  //           icon: 'ability_monk_chicocoon',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 115310,
  //           name: 'Revival',
  //           icon: 'spell_monk_revival',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         }
  //       ]
  //     },
  //     WINDWALKER: {
  //       id: 2,
  //       name: 'Windwalker',
  //       icon: 'spell_monk_windwalker_spec',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 119381,
  //           name: 'Leg Sweep',
  //           icon: 'ability_monk_legsweep',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 45
  //         },
  //         {
  //           id: 116844,
  //           name: 'Ring of Peace',
  //           icon: 'spell_monk_ringofpeace',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 45
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   name: 'Paladin',
  //   specs: {
  //     HOLY: {
  //       id: 0,
  //       name: 'Holy',
  //       icon: 'spell_holy_holybolt',
  //       isMelee: false,
  //       role: Role.HEALER,
  //       cooldowns: [
  //         {
  //           id: 31821,
  //           name: 'Aura Mastery',
  //           icon: 'spell_holy_auramastery',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         // AVENGING_WRATH: {
  //         //   id: 31842,
  //         //   name: 'Avenging Wrath2',
  //         //   icon: 'spell_holy_avenginewrath',
  //         //   cooldownType: CooldownType.HEALING,
  //         //   cooldownTime: 120
  //         // },
  //         {
  //           id: 1022,
  //           name: 'Blessing of Protection',
  //           icon: 'spell_holy_sealofprotection',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 6940,
  //           name: 'Blessing of Sacrifice',
  //           icon: 'spell_holy_sealofsacrifice',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 150
  //         },
  //         {
  //           id: 642,
  //           name: 'Divine Shield',
  //           icon: 'spell_holy_divineshield',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 633,
  //           name: 'Lay on Hands',
  //           icon: 'spell_holy_layonhands',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 600
  //         }
  //       ]
  //     },
  //     PROTECTION: {
  //       id: 1,
  //       name: 'Protection',
  //       icon: 'spell_holy_devotionaura',
  //       isMelee: true,
  //       role: Role.TANK,
  //       cooldowns: [
  //         {
  //           id: 235169,
  //           name: "Archimonde's Hatred Reborn",
  //           icon: 'spell_nature_elementalshields',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 85,
  //           charges: 0
  //         },
  //         {
  //           id: 204150,
  //           name: 'Aegis of Light',
  //           icon: 'spell_holy_greaterblessingoflight',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 1022,
  //           name: 'Blessing of Protection',
  //           icon: 'spell_holy_sealofprotection',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 6940,
  //           name: 'Blessing of Sacrifice',
  //           icon: 'spell_holy_sealofsacrifice',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 150
  //         },
  //         {
  //           id: 204018,
  //           name: 'Blessing of Spellwarding',
  //           icon: 'spell_holy_blessingofprotection',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 165
  //         },
  //         {
  //           id: 642,
  //           name: 'Divine Shield',
  //           icon: 'spell_holy_divineshield',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 285
  //         },
  //         {
  //           id: 633,
  //           name: 'Lay on Hands',
  //           icon: 'spell_holy_layonhands',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 209202,
  //           name: 'Eye of Tyr',
  //           icon: 'inv_shield_1h_artifactnorgannon_d_01',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 60
  //         },
  //         {
  //           id: 31850,
  //           name: 'Ardent Defender',
  //           icon: 'spell_holy_ardentdefender',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 120
  //         }
  //       ]
  //     },
  //     RETRIBUTION: {
  //       id: 2,
  //       name: 'Retribution',
  //       icon: 'spell_holy_auraoflight',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 1022,
  //           name: 'Blessing of Protection',
  //           icon: 'spell_holy_sealofprotection',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 642,
  //           name: 'Divine Shield',
  //           icon: 'spell_holy_divineshield',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 633,
  //           name: 'Lay on Hands',
  //           icon: 'spell_holy_layonhands',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 600
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   name: 'Priest',
  //   specs: {
  //     DISCIPLINE: {
  //       id: 0,
  //       name: 'Discipline',
  //       icon: 'spell_holy_wordfortitude',
  //       isMelee: false,
  //       role: Role.HEALER,
  //       cooldowns: [
  //         {
  //           id: 33206,
  //           name: 'Pain Suppression',
  //           icon: 'spell_holy_painsupression',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 240
  //         },
  //         {
  //           id: 207946,
  //           name: "Light's Wrath",
  //           icon: 'inv_staff_2h_artifacttome_d_01',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 90
  //         },
  //         {
  //           id: 62618,
  //           name: 'Power Word: Barrier',
  //           icon: 'spell_holy_powerwordbarrier',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         }
  //       ]
  //     },
  //     HOLY: {
  //       id: 1,
  //       name: 'Holy',
  //       icon: 'spell_holy_guardianspirit',
  //       isMelee: false,
  //       role: Role.HEALER,
  //       cooldowns: [
  //         {
  //           id: 64843,
  //           name: 'Divine Hymn',
  //           icon: 'spell_holy_divinehymn',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 47788,
  //           name: 'Guardian Spirit',
  //           icon: 'spell_holy_guardianspirit',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 240
  //         }
  //       ]
  //     },
  //     SHADOW: {
  //       id: 2,
  //       name: 'Shadow',
  //       icon: 'spell_shadow_shadowwordpain',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 15286,
  //           name: 'Vampiric Embrace',
  //           icon: 'spell_shadow_unsummonbuilding',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   name: 'Shaman',
  //   specs: {
  //     ELEMENTAL: {
  //       id: 0,
  //       name: 'Elemental',
  //       icon: 'spell_nature_lightning',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 108281,
  //           name: 'Ancestral Guidance',
  //           icon: 'ability_shaman_ancestralguidance',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 120
  //         },
  //         {
  //           id: 198103,
  //           name: 'Earth Elemental',
  //           icon: 'spell_nature_earthelemental_totem',
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 51485,
  //           name: 'Earthgrab Totem',
  //           icon: 'spell_nature_stranglevines',
  //           cooldownTime: 30
  //         },
  //         {
  //           id: 192058,
  //           name: 'Lightning Surge Totem',
  //           icon: 'spell_nature_brilliance',
  //           cooldownTime: 45
  //         },
  //         {
  //           id: 20608,
  //           name: 'Reincarnation',
  //           icon: 'spell_shaman_improvedreincarnation',
  //           cooldownTime: 1800
  //         },
  //         {
  //           id: 196932,
  //           name: 'Voodoo Totem',
  //           icon: 'spell_totem_wardofdraining',
  //           cooldownTime: 30
  //         },
  //         {
  //           id: 192077,
  //           name: 'Wind Rush Totem',
  //           icon: 'ability_shaman_windwalktotem',
  //           cooldownTime: 120
  //         }
  //       ]
  //     },
  //     ENHANCEMENT: {
  //       id: 1,
  //       name: 'Enhancement',
  //       icon: 'spell_nature_lightningshield',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 51485,
  //           name: 'Earthgrab Totem',
  //           icon: 'spell_nature_stranglevines',
  //           cooldownTime: 30
  //         },
  //         {
  //           id: 192058,
  //           name: 'Lightning Surge Totem',
  //           icon: 'spell_nature_brilliance',
  //           cooldownTime: 45
  //         },
  //         {
  //           id: 20608,
  //           name: 'Reincarnation',
  //           icon: 'spell_shaman_improvedreincarnation',
  //           cooldownTime: 1800
  //         },
  //         {
  //           id: 196932,
  //           name: 'Voodoo Totem',
  //           icon: 'spell_totem_wardofdraining',
  //           cooldownTime: 30
  //         }
  //       ]
  //     },
  //     RESTORATION: {
  //       id: 2,
  //       name: 'Restoration',
  //       icon: 'spell_nature_healingwavelesser',
  //       isMelee: false,
  //       role: Role.HEALER,
  //       cooldowns: [
  //         {
  //           id: 108281,
  //           name: 'Ancestral Guidance',
  //           icon: 'ability_shaman_ancestralguidance',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 120
  //         },
  //         {
  //           id: 207399,
  //           name: 'Ancestral Protection Totem',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 300
  //         },
  //         {
  //           id: 114052,
  //           name: 'Ascendance',
  //           icon: 'spell_fire_elementaldevastation',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 51485,
  //           name: 'Earthgrab Totem',
  //           icon: 'spell_nature_stranglevines',
  //           cooldownTime: 30
  //         },
  //         {
  //           id: 108280,
  //           name: 'Healing Tide Totem',
  //           icon: 'ability_shaman_healingtide',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 192058,
  //           name: 'Lightning Surge Totem',
  //           icon: 'spell_nature_brilliance',
  //           cooldownTime: 45
  //         },
  //         {
  //           id: 20608,
  //           name: 'Reincarnation',
  //           icon: 'spell_shaman_improvedreincarnation',
  //           cooldownTime: 1200
  //         },
  //         {
  //           id: 98008,
  //           name: 'Spirit Link Totem',
  //           icon: 'spell_shaman_spiritlink',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 196932,
  //           name: 'Voodoo Totem',
  //           icon: 'spell_totem_wardofdraining',
  //           cooldownTime: 30
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   name: 'Rogue',
  //   specs: {
  //     OUTLAW: {
  //       id: 0,
  //       name: 'Outlaw',
  //       icon: 'inv_sword_30',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 31230,
  //           name: 'Cheat Death',
  //           icon: 'ability_rogue_cheatdeath',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 31224,
  //           name: 'Cloak of Shadows',
  //           icon: 'spell_shadow_nethercloak',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 90
  //         }
  //       ]
  //     },
  //     ASSASSINATION: {
  //       id: 1,
  //       name: 'Assassination',
  //       icon: 'ability_backstab',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 31230,
  //           name: 'Cheat Death',
  //           icon: 'ability_rogue_cheatdeath',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 31224,
  //           name: 'Cloak of Shadows',
  //           icon: 'spell_shadow_nethercloak',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 90
  //         }
  //       ]
  //     },
  //     SUBTLETY: {
  //       id: 2,
  //       name: 'Subtlety',
  //       icon: 'ability_stealth',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 31230,
  //           name: 'Cheat Death',
  //           icon: 'ability_rogue_cheatdeath',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 31224,
  //           name: 'Cloak of Shadows',
  //           icon: 'spell_shadow_nethercloak',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 90
  //         }
  //       ]
  //     }
  //   }
  // },
  // {
  //   name: 'Warlock',
  //   specs: {
  //     AFFLICTION: {
  //       id: 0,
  //       name: 'Affliction',
  //       icon: 'spell_shadow_deathcoil',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 20707,
  //           name: 'Soulstone',
  //           icon: 'spell_shadow_soulgem',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         }
  //       ]
  //     },
  //     DEMONOLOGY: {
  //       id: 1,
  //       name: 'Demonology',
  //       icon: 'spell_shadow_metamorphosis',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 20707,
  //           name: 'Soulstone',
  //           icon: 'spell_shadow_soulgem',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         }
  //       ]
  //     },
  //     DESTRUCTION: {
  //       id: 2,
  //       name: 'Destruction',
  //       icon: 'spell_shadow_rainoffire',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 20707,
  //           name: 'Soulstone',
  //           icon: 'spell_shadow_soulgem',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         }
  //       ]
  //     }
  //   }
  // },
  {
    id: WOWClass.WARRIOR,
    label: 'Warrior',
    icon: 'class_warrior',
    classColor: '#C79C6E',
    specs: [
      {
        id: WOWSpec.ARMS,
        name: 'Arms',
        icon: 'ability_warrior_savageblow',
        isMelee: true,
        role: Role.DPS,
        WOWClass: WOWClass.WARRIOR,
        cooldowns: [
          {
            spellId: 97462,
            name: 'Commanding Shout',
            icon: 'ability_warrior_rallyingcry',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.ARMS,
          }
        ]
      },
      {
        id: WOWSpec.FURY,
        name: 'Fury',
        icon: 'ability_warrior_innerrage',
        isMelee: true,
        role: Role.DPS,
        WOWClass: WOWClass.WARRIOR,
        cooldowns: [
          {
            spellId: 97462,
            name: 'Commanding Shout',
            icon: 'ability_warrior_rallyingcry',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.FURY,
          }
        ]
      },
      {
        id: WOWSpec.PROTECTION_WARRIOR,
        name: 'Protection',
        icon: 'inv_shield_06',
        isMelee: true,
        role: Role.TANK,
        WOWClass: WOWClass.WARRIOR,
        cooldowns: [
          {
            spellId: 235169,
            name: "Archimonde's Hatred Reborn",
            icon: 'spell_nature_elementalshields',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 85,
            charges: 0,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          },
          {
            spellId: 1160,
            name: 'Demoralizing Shout',
            icon: 'ability_warrior_warcry',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 70,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          },
          {
            spellId: 12975,
            name: 'Last Stand',
            icon: 'spell_holy_ashestoashes',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 150,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          },
          {
            spellId: 871,
            name: 'Shield Wall',
            icon: 'ability_warrior_shieldwall',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 200,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          },
        ]
      }
    ]
  },
];

export { classes };
