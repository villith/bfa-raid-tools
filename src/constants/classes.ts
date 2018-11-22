import { WOWClass } from '../enums/WOWclass';
import { ArmorType } from '../enums/armorType';
import { CooldownType } from '../enums/cooldownType';
import { Role } from '../enums/role';
import { WOWSpec } from '../enums/WOWspec';
import { PrimaryStatType } from '../enums/primaryStatType';
import { WeaponType } from '../enums/weaponType';

interface IWOWClass {
  id: WOWClass,
  label: string;
  icon: string;
  classColor: string;
  armorType: ArmorType;
  specs: IWOWSpec[]
}

interface IWOWSpec {
  id: WOWSpec;
  name: string;
  icon: string;
  isMelee: boolean;
  role: Role;
  primaryStatType: PrimaryStatType;
  WOWClass: WOWClass;
  weaponTypes: WeaponType[];
  cooldowns: IWOWCooldown[]
}

interface IWOWCooldown {
  spellId: number;
  label: string;
  icon: string;
  cooldownType: CooldownType;
  cooldownTime: number;
  altCooldownTime: number | null;
  charges: number | null;
  WOWClass: WOWClass;
  WOWSpec: WOWSpec;
}

const CLASSES: IWOWClass[] = [
  {
    id: WOWClass.DEATH_KNIGHT,
    label: 'Death Knight',
    icon: 'class_deathknight',
    classColor: '#C41F3B',
    armorType: ArmorType.PLATE,
    specs: [
      {
        id: WOWSpec.BLOOD,
        name: 'Blood',
        icon: 'spell_deathknight_bloodpresence',
        isMelee: true,
        role: Role.TANK,
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.DEATH_KNIGHT,
        weaponTypes: [WeaponType.TWOHAND_AXE, WeaponType.TWOHAND_MACE, WeaponType.TWOHAND_SWORD],
        cooldowns: [
          {
            spellId: 48707,
            label: 'Anti-Magic Shell',
            icon: 'spell_shadow_antimagicshell',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 60,
            altCooldownTime: 45,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 49576,
            label: 'Death Grip',
            icon: 'spell_deathknight_strangulate',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 25,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 108199,
            label: "Gorefiend's Grasp",
            icon: 'ability_deathknight_aoedeathgrip',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 120,
            altCooldownTime: 90,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 114556,
            label: 'Purgatory',
            icon: 'inv_misc_shadowegg',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 240,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 61999,
            label: 'Raise Ally',
            icon: 'spell_shadow_deadofnight',
            cooldownType: CooldownType.BATTLE_RESURRECTION,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 55233,
            label: 'Vampiric Blood',
            icon: 'spell_shadow_lifedrain',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 90,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 194679,
            label: 'Rune Tap',
            icon: 'spell_deathknight_runetap',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 25,
            charges: 0,
            altCooldownTime: null,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 219809,
            label: 'Tombstone',
            icon: 'ability_fiegndead',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 60,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 48792,
            label: 'Icebound Fortitude',
            icon: 'spell_deathknight_iceboundfortitude',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.BLOOD,
          },
          {
            spellId: 49028,
            label: 'Dancing Rune Weapon',
            icon: 'inv_sword_07',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 120,
            altCooldownTime: null,
            charges: 1,
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
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.DEATH_KNIGHT,
        weaponTypes: [WeaponType.ONEHAND_AXE, WeaponType.ONEHAND_MACE, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 48707,
            label: 'Anti-Magic Shell',
            icon: 'spell_shadow_antimagicshell',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 60,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.FROST_DEATH_KNIGHT,
          },
          {
            spellId: 49576,
            label: 'Death Grip',
            icon: 'spell_deathknight_strangulate',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 25,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.FROST_DEATH_KNIGHT,
          },
          {
            spellId: 61999,
            label: 'Raise Ally',
            icon: 'spell_shadow_deadofnight',
            cooldownType: CooldownType.BATTLE_RESURRECTION,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
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
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.DEATH_KNIGHT,
        weaponTypes: [WeaponType.TWOHAND_AXE, WeaponType.TWOHAND_MACE, WeaponType.TWOHAND_SWORD],
        cooldowns: [
          {
            spellId: 48707,
            label: 'Anti-Magic Shell',
            icon: 'spell_shadow_antimagicshell',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 60,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.UNHOLY,
          },
          {
            spellId: 49576,
            label: 'Death Grip',
            icon: 'spell_deathknight_strangulate',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 25,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.UNHOLY,
          },
          {
            spellId: 61999,
            label: 'Raise Ally',
            icon: 'spell_shadow_deadofnight',
            cooldownType: CooldownType.BATTLE_RESURRECTION,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.DEATH_KNIGHT,
            WOWSpec: WOWSpec.UNHOLY,
          }
        ]
      }
    ]
  },
  {
    id: WOWClass.MAGE,
    label: 'Mage',
    icon: 'class_mage',
    classColor: '#69CCF0',
    armorType: ArmorType.CLOTH,
    specs: [
      {
        id: WOWSpec.ARCANE,
        name: 'Arcane',
        icon: 'spell_holy_magicalsentry',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.MAGE,
        weaponTypes: [WeaponType.DAGGER, WeaponType.WAND, WeaponType.OFFHAND, WeaponType.STAFF, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 45438,
            label: 'Ice Block',
            icon: 'spell_frost_frost',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MAGE,
            WOWSpec: WOWSpec.ARCANE,
          }
        ]
      },
      {
        id: WOWSpec.FIRE,
        name: 'Fire',
        icon: 'spell_fire_flamebolt',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.MAGE,
        weaponTypes: [WeaponType.DAGGER, WeaponType.WAND, WeaponType.OFFHAND, WeaponType.STAFF, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 86949,
            label: 'Cauterize',
            icon: 'spell_fire_rune',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 300,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MAGE,
            WOWSpec: WOWSpec.FIRE,
          },
          {
            spellId: 45438,
            label: 'Ice Block',
            icon: 'spell_frost_frost',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MAGE,
            WOWSpec: WOWSpec.FIRE,
          },
        ]
      },
      {
        id: WOWSpec.FROST_MAGE,
        name: 'Frost',
        icon: 'spell_frost_frostbolt02',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.MAGE,
        weaponTypes: [WeaponType.DAGGER, WeaponType.WAND, WeaponType.OFFHAND, WeaponType.STAFF, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 45438,
            label: 'Ice Block',
            icon: 'spell_frost_frost',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 600,
            altCooldownTime: 30,
            charges: 1,
            WOWClass: WOWClass.MAGE,
            WOWSpec: WOWSpec.FROST_MAGE,
          }
        ]
      }
    ]
  },
  {
    id: WOWClass.PRIEST,
    label: 'Priest',
    icon: 'class_priest',
    classColor: '#FFFFFF',
    armorType: ArmorType.CLOTH,
    specs: [
      {
        id: WOWSpec.DISCIPLINE,
        name: 'Discipline',
        icon: 'spell_holy_wordfortitude',
        isMelee: false,
        role: Role.HEALER,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.PRIEST,
        weaponTypes: [WeaponType.DAGGER, WeaponType.WAND, WeaponType.OFFHAND, WeaponType.STAFF, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 33206,
            label: 'Pain Suppression',
            icon: 'spell_holy_painsupression',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 240,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PRIEST,
            WOWSpec: WOWSpec.DISCIPLINE,
          },
          {
            spellId: 207946,
            label: "Light's Wrath",
            icon: 'inv_staff_2h_artifacttome_d_01',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 90,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PRIEST,
            WOWSpec: WOWSpec.DISCIPLINE,
          },
          {
            spellId: 62618,
            label: 'Power Word: Barrier',
            icon: 'spell_holy_powerwordbarrier',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PRIEST,
            WOWSpec: WOWSpec.DISCIPLINE,
          }
        ]
      },
      {
        id: WOWSpec.HOLY_PRIEST,
        name: 'Holy',
        icon: 'spell_holy_guardianspirit',
        isMelee: false,
        role: Role.HEALER,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.PRIEST,
        weaponTypes: [WeaponType.DAGGER, WeaponType.WAND, WeaponType.OFFHAND, WeaponType.STAFF, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 64843,
            label: 'Divine Hymn',
            icon: 'spell_holy_divinehymn',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PRIEST,
            WOWSpec: WOWSpec.HOLY_PRIEST,
          },
          {
            spellId: 47788,
            label: 'Guardian Spirit',
            icon: 'spell_holy_guardianspirit',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 240,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PRIEST,
            WOWSpec: WOWSpec.HOLY_PRIEST,
          }
        ]
      },
      {
        id: WOWSpec.SHADOW,
        name: 'Shadow',
        icon: 'spell_shadow_shadowwordpain',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.PRIEST,
        weaponTypes: [WeaponType.DAGGER, WeaponType.WAND, WeaponType.OFFHAND, WeaponType.STAFF, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 15286,
            label: 'Vampiric Embrace',
            icon: 'spell_shadow_unsummonbuilding',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PRIEST,
            WOWSpec: WOWSpec.SHADOW,
          }
        ]
      }
    ]
  },
  {
    id: WOWClass.ROGUE,
    label: 'Rogue',
    icon: 'class_rogue',
    classColor: '#FFF569',
    armorType: ArmorType.LEATHER,
    specs: [
      {
        id: WOWSpec.OUTLAW,
        name: 'Outlaw',
        icon: 'inv_sword_30',
        isMelee: true,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.AGILITY,
        WOWClass: WOWClass.ROGUE,
        weaponTypes: [WeaponType.FIST, WeaponType.ONEHAND_AXE, WeaponType.ONEHAND_MACE, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 31230,
            label: 'Cheat Death',
            icon: 'ability_rogue_cheatdeath',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.ROGUE,
            WOWSpec: WOWSpec.OUTLAW,
          },
          {
            spellId: 31224,
            label: 'Cloak of Shadows',
            icon: 'spell_shadow_nethercloak',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 90,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.ROGUE,
            WOWSpec: WOWSpec.OUTLAW,
          }
        ]
      },
      {
        id: WOWSpec.ASSASSINATION,
        name: 'Assassination',
        icon: 'ability_rogue_deadlybrew',
        isMelee: true,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.AGILITY,
        WOWClass: WOWClass.ROGUE,
        weaponTypes: [WeaponType.DAGGER],
        cooldowns: [
          {
            spellId: 31230,
            label: 'Cheat Death',
            icon: 'ability_rogue_cheatdeath',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.ROGUE,
            WOWSpec: WOWSpec.ASSASSINATION,
          },
          {
            spellId: 31224,
            label: 'Cloak of Shadows',
            icon: 'spell_shadow_nethercloak',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 90,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.ROGUE,
            WOWSpec: WOWSpec.ASSASSINATION,
          }
        ]
      },
      {
        id: WOWSpec.SUBTLETY,
        name: 'Subtlety',
        icon: 'ability_stealth',
        isMelee: true,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.AGILITY,
        WOWClass: WOWClass.ROGUE,
        weaponTypes: [WeaponType.DAGGER],
        cooldowns: [
          {
            spellId: 31230,
            label: 'Cheat Death',
            icon: 'ability_rogue_cheatdeath',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.ROGUE,
            WOWSpec: WOWSpec.SUBTLETY,
          },
          {
            spellId: 31224,
            label: 'Cloak of Shadows',
            icon: 'spell_shadow_nethercloak',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 90,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.ROGUE,
            WOWSpec: WOWSpec.SUBTLETY,
          }
        ]
      }
    ]
  },
  {
    id: WOWClass.SHAMAN,
    label: 'Shaman',
    icon: 'class_shaman',
    classColor: '#0070DE',
    armorType: ArmorType.MAIL,
    specs: [
      {
        id: WOWSpec.ELEMENTAL,
        name: 'Elemental',
        icon: 'spell_nature_lightning',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.SHAMAN,
        weaponTypes: [WeaponType.FIST, WeaponType.OFFHAND, WeaponType.DAGGER, WeaponType.ONEHAND_AXE, WeaponType.ONEHAND_MACE, WeaponType.SHIELD, WeaponType.STAFF, WeaponType.TWOHAND_AXE, WeaponType.TWOHAND_MACE],
        cooldowns: [
          // {
          //   id: 108281,
          //   label: 'Ancestral Guidance',
          //   icon: 'ability_shaman_ancestralguidance',
          //   cooldownType: CooldownType.HEALING,
          //   cooldownTime: 120
          // },
          // {
          //   id: 198103,
          //   label: 'Earth Elemental',
          //   icon: 'spell_nature_earthelemental_totem',
          //   cooldownTime: 300
          // },
          // {
          //   id: 51485,
          //   label: 'Earthgrab Totem',
          //   icon: 'spell_nature_stranglevines',
          //   cooldownTime: 30
          // },
          // {
          //   id: 192058,
          //   label: 'Lightning Surge Totem',
          //   icon: 'spell_nature_brilliance',
          //   cooldownTime: 45
          // },
          // {
          //   id: 20608,
          //   label: 'Reincarnation',
          //   icon: 'spell_shaman_improvedreincarnation',
          //   cooldownTime: 1800
          // },
          // {
          //   id: 196932,
          //   label: 'Voodoo Totem',
          //   icon: 'spell_totem_wardofdraining',
          //   cooldownTime: 30
          // },
          // {
          //   id: 192077,
          //   label: 'Wind Rush Totem',
          //   icon: 'ability_shaman_windwalktotem',
          //   cooldownTime: 120
          // }
        ]
      },
      {
        id: WOWSpec.ENHANCEMENT,
        name: 'Enhancement',
        icon: 'spell_nature_lightningshield',
        isMelee: true,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.AGILITY,
        WOWClass: WOWClass.SHAMAN,
        weaponTypes: [WeaponType.FIST, WeaponType.ONEHAND_AXE, WeaponType.ONEHAND_MACE],
        cooldowns: [
          // {
          //   id: 51485,
          //   label: 'Earthgrab Totem',
          //   icon: 'spell_nature_stranglevines',
          //   cooldownTime: 30
          // },
          // {
          //   id: 192058,
          //   label: 'Lightning Surge Totem',
          //   icon: 'spell_nature_brilliance',
          //   cooldownTime: 45
          // },
          // {
          //   id: 20608,
          //   label: 'Reincarnation',
          //   icon: 'spell_shaman_improvedreincarnation',
          //   cooldownTime: 1800
          // },
          // {
          //   id: 196932,
          //   label: 'Voodoo Totem',
          //   icon: 'spell_totem_wardofdraining',
          //   cooldownTime: 30
          // }
        ]
      },
      {
        id: WOWSpec.RESTORATION_SHAMAN,
        name: 'Restoration',
        icon: 'spell_nature_healingwavelesser',
        isMelee: false,
        role: Role.HEALER,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.SHAMAN,
        weaponTypes: [WeaponType.FIST, WeaponType.OFFHAND, WeaponType.DAGGER, WeaponType.ONEHAND_AXE, WeaponType.ONEHAND_MACE, WeaponType.SHIELD, WeaponType.STAFF, WeaponType.TWOHAND_AXE, WeaponType.TWOHAND_MACE],
        cooldowns: [
          // {
          //   id: 108281,
          //   label: 'Ancestral Guidance',
          //   icon: 'ability_shaman_ancestralguidance',
          //   cooldownType: CooldownType.HEALING,
          //   cooldownTime: 120
          // },
          // {
          //   id: 207399,
          //   label: 'Ancestral Protection Totem',
          //   icon: 'spell_nature_reincarnation',
          //   cooldownType: CooldownType.BATTLE_RESURRECTION,
          //   cooldownTime: 300
          // },
          // {
          //   id: 114052,
          //   label: 'Ascendance',
          //   icon: 'spell_fire_elementaldevastation',
          //   cooldownType: CooldownType.HEALING,
          //   cooldownTime: 180
          // },
          // {
          //   id: 51485,
          //   label: 'Earthgrab Totem',
          //   icon: 'spell_nature_stranglevines',
          //   cooldownTime: 30
          // },
          // {
          //   id: 108280,
          //   label: 'Healing Tide Totem',
          //   icon: 'ability_shaman_healingtide',
          //   cooldownType: CooldownType.HEALING,
          //   cooldownTime: 180
          // },
          // {
          //   id: 192058,
          //   label: 'Lightning Surge Totem',
          //   icon: 'spell_nature_brilliance',
          //   cooldownTime: 45
          // },
          // {
          //   id: 20608,
          //   label: 'Reincarnation',
          //   icon: 'spell_shaman_improvedreincarnation',
          //   cooldownTime: 1200
          // },
          // {
          //   id: 98008,
          //   label: 'Spirit Link Totem',
          //   icon: 'spell_shaman_spiritlink',
          //   cooldownType: CooldownType.HEALING,
          //   cooldownTime: 180
          // },
          // {
          //   id: 196932,
          //   label: 'Voodoo Totem',
          //   icon: 'spell_totem_wardofdraining',
          //   cooldownTime: 30
          // }
        ]
      }
    ]
  },
  {
    id: WOWClass.WARLOCK, 
    label: 'Warlock',
    icon: 'class_warlock',
    classColor: '#9482C9',
    armorType: ArmorType.CLOTH,
    specs: [
      {
        id: WOWSpec.AFFLICTION,
        name: 'Affliction',
        icon: 'spell_shadow_deathcoil',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.WARLOCK,
        weaponTypes: [WeaponType.DAGGER, WeaponType.OFFHAND, WeaponType.ONEHAND_SWORD, WeaponType.STAFF, WeaponType.WAND],
        cooldowns: [
          // {
          //   id: 20707,
          //   label: 'Soulstone',
          //   icon: 'spell_shadow_soulgem',
          //   cooldownType: CooldownType.BATTLE_RESURRECTION,
          //   cooldownTime: 600
          // }
        ]
      },
      {
        id: WOWSpec.DEMONOLOGY,
        name: 'Demonology',
        icon: 'spell_shadow_metamorphosis',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.WARLOCK,
        weaponTypes: [WeaponType.DAGGER, WeaponType.OFFHAND, WeaponType.ONEHAND_SWORD, WeaponType.STAFF, WeaponType.WAND],
        cooldowns: [
          // {
          //   id: 20707,
          //   label: 'Soulstone',
          //   icon: 'spell_shadow_soulgem',
          //   cooldownType: CooldownType.BATTLE_RESURRECTION,
          //   cooldownTime: 600
          // }
        ]
      },
      {
        id: WOWSpec.DESTRUCTION,
        name: 'Destruction',
        icon: 'spell_shadow_rainoffire',
        isMelee: false,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.WARLOCK,
        weaponTypes: [WeaponType.DAGGER, WeaponType.OFFHAND, WeaponType.ONEHAND_SWORD, WeaponType.STAFF, WeaponType.WAND],
        cooldowns: [
          // {
          //   id: 20707,
          //   label: 'Soulstone',
          //   icon: 'spell_shadow_soulgem',
          //   cooldownType: CooldownType.BATTLE_RESURRECTION,
          //   cooldownTime: 600
          // }
        ]
      }
    ]
  },
  {
    id: WOWClass.WARRIOR,
    label: 'Warrior',
    icon: 'class_warrior',
    classColor: '#C79C6E',
    armorType: ArmorType.PLATE,
    specs: [
      {
        id: WOWSpec.ARMS,
        name: 'Arms',
        icon: 'ability_warrior_savageblow',
        isMelee: true,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.WARRIOR,
        weaponTypes: [WeaponType.TWOHAND_AXE, WeaponType.TWOHAND_MACE, WeaponType.TWOHAND_SWORD],
        cooldowns: [
          {
            spellId: 97462,
            label: 'Commanding Shout',
            icon: 'ability_warrior_rallyingcry',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
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
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.WARRIOR,
        weaponTypes: [WeaponType.TWOHAND_AXE, WeaponType.TWOHAND_MACE, WeaponType.TWOHAND_SWORD],
        cooldowns: [
          {
            spellId: 97462,
            label: 'Commanding Shout',
            icon: 'ability_warrior_rallyingcry',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
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
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.WARRIOR,
        weaponTypes: [WeaponType.SHIELD, WeaponType.ONEHAND_AXE, WeaponType.ONEHAND_MACE, WeaponType.ONEHAND_SWORD],
        cooldowns: [
          {
            spellId: 1160,
            label: 'Demoralizing Shout',
            icon: 'ability_warrior_warcry',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 70,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          },
          {
            spellId: 12975,
            label: 'Last Stand',
            icon: 'spell_holy_ashestoashes',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 150,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          },
          {
            spellId: 871,
            label: 'Shield Wall',
            icon: 'ability_warrior_shieldwall',
            cooldownType: CooldownType.DEFENSIVE,
            cooldownTime: 200,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          },
          {
            spellId: 97462,
            label: 'Commanding Shout',
            icon: 'ability_warrior_rallyingcry',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.WARRIOR,
            WOWSpec: WOWSpec.PROTECTION_WARRIOR,
          }
        ]
      }
    ]
  },
  {
    id: WOWClass.MONK,
    label: 'Monk',
    icon: 'class_monk',
    classColor: '',
    armorType: ArmorType.LEATHER,
    specs: [
      {
        id: WOWSpec.BREWMASTER,
        name: 'Brewmaster',
        icon: 'spell_monk_brewmaster_spec',
        isMelee: true,
        role: Role.TANK,
        primaryStatType: PrimaryStatType.AGILITY,
        WOWClass: WOWClass.MONK,
        weaponTypes: [WeaponType.POLEARM, WeaponType.STAFF],
        cooldowns: [
          {
            spellId: 119381,
            label: 'Leg Sweep',
            icon: 'ability_monk_legsweep',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 45,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.BREWMASTER
          }
        ]
      },
      {
        id: WOWSpec.MISTWEAVER,
        name: 'Mistweaver',
        icon: 'spell_monk_mistweaver_spec',
        isMelee: false,
        role: Role.HEALER,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.MONK,
        weaponTypes: [WeaponType.STAFF, WeaponType.ONEHAND_MACE, WeaponType.ONEHAND_SWORD, WeaponType.OFFHAND],
        cooldowns: [
          {
            spellId: 119381,
            label: 'Leg Sweep',
            icon: 'ability_monk_legsweep',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 45,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.MISTWEAVER
          },
          {
            spellId: 116844,
            label: 'Ring of Peace',
            icon: 'spell_monk_ringofpeace',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 45,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.MISTWEAVER
          },
          {
            spellId: 198664,
            label: 'Invoke Chi-Ji, the Red Crane',
            icon: 'inv_pet_cranegod',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.MISTWEAVER
          },
          {
            spellId: 116849,
            label: 'Life Cocoon',
            icon: 'ability_monk_chicocoon',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.MISTWEAVER
          },
          {
            spellId: 115310,
            label: 'Revival',
            icon: 'spell_monk_revival',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.MISTWEAVER
          }
        ]
      },
      {
        id: WOWSpec.WINDWALKER,
        name: 'Windwalker',
        icon: 'spell_monk_windwalker_spec',
        isMelee: true,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.AGILITY,
        WOWClass: WOWClass.MONK,
        weaponTypes: [WeaponType.FIST, WeaponType.ONEHAND_SWORD, WeaponType.ONEHAND_MACE],
        cooldowns: [
          {
            spellId: 119381,
            label: 'Leg Sweep',
            icon: 'ability_monk_legsweep',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 45,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.WINDWALKER
          },
          {
            spellId: 116844,
            label: 'Ring of Peace',
            icon: 'spell_monk_ringofpeace',
            cooldownType: CooldownType.CROWD_CONTROL,
            cooldownTime: 45,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.MONK,
            WOWSpec: WOWSpec.WINDWALKER
          }
        ]
      }
    ]
  },
  {
    id: WOWClass.PALADIN,
    label: 'Paladin',
    icon: 'class_paladin',
    classColor: '',
    armorType: ArmorType.PLATE,
    specs: [
      {
        id: WOWSpec.HOLY_PALADIN,
        name: 'Holy',
        icon: 'spell_holy_holybolt',
        isMelee: false,
        role: Role.HEALER,
        primaryStatType: PrimaryStatType.INTELLECT,
        WOWClass: WOWClass.PALADIN,
        weaponTypes: [WeaponType.ONEHAND_SWORD, WeaponType.ONEHAND_MACE, WeaponType.SHIELD],
        cooldowns: [
          {
            spellId: 31821,
            label: 'Aura Mastery',
            icon: 'spell_holy_auramastery',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.HOLY_PALADIN
          },
          // AVENGING_WRATH: {
          //   id: 31842,
          //   label: 'Avenging Wrath2',
          //   icon: 'spell_holy_avenginewrath',
          //   cooldownType: CooldownType.HEALING,
          //   cooldownTime: 120
          // },
          {
            spellId: 1022,
            label: 'Blessing of Protection',
            icon: 'spell_holy_sealofprotection',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 300,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.HOLY_PALADIN
          },
          {
            spellId: 6940,
            label: 'Blessing of Sacrifice',
            icon: 'spell_holy_sealofsacrifice',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 150,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.HOLY_PALADIN
          },
          {
            spellId: 642,
            label: 'Divine Shield',
            icon: 'spell_holy_divineshield',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 300,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.HOLY_PALADIN
          },
          {
            spellId: 633,
            label: 'Lay on Hands',
            icon: 'spell_holy_layonhands',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.HOLY_PALADIN
          }
        ]
      },
      {
        id: WOWSpec.PROTECTION_PALADIN,
        name: 'Protection',
        icon: 'spell_holy_devotionaura',
        isMelee: true,
        role: Role.TANK,
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.PALADIN,
        weaponTypes: [WeaponType.ONEHAND_SWORD, WeaponType.ONEHAND_MACE, WeaponType.ONEHAND_AXE, WeaponType.SHIELD],
        cooldowns: [
          {
            spellId: 204150,
            label: 'Aegis of Light',
            icon: 'spell_holy_greaterblessingoflight',
            cooldownType: CooldownType.HEALING,
            cooldownTime: 180,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.PROTECTION_PALADIN
          },
          {
            spellId: 1022,
            label: 'Blessing of Protection',
            icon: 'spell_holy_sealofprotection',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 300,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.PROTECTION_PALADIN
          },
          {
            spellId: 6940,
            label: 'Blessing of Sacrifice',
            icon: 'spell_holy_sealofsacrifice',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 150,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.PROTECTION_PALADIN
          },
          {
            spellId: 204018,
            label: 'Blessing of Spellwarding',
            icon: 'spell_holy_blessingofprotection',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 165,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.PROTECTION_PALADIN
          },
          {
            spellId: 642,
            label: 'Divine Shield',
            icon: 'spell_holy_divineshield',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 285,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.PROTECTION_PALADIN
          },
          {
            spellId: 633,
            label: 'Lay on Hands',
            icon: 'spell_holy_layonhands',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.PROTECTION_PALADIN
          },
          {
            spellId: 31850,
            label: 'Ardent Defender',
            icon: 'spell_holy_ardentdefender',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 120,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.PROTECTION_PALADIN
          }
        ]
      },
      {
        id: WOWSpec.RETRIBUTION,
        name: 'Retribution',
        icon: 'spell_holy_auraoflight',
        isMelee: true,
        role: Role.DPS,
        primaryStatType: PrimaryStatType.STRENGTH,
        WOWClass: WOWClass.PALADIN,
        weaponTypes: [WeaponType.TWOHAND_AXE, WeaponType.TWOHAND_MACE, WeaponType.TWOHAND_SWORD],
        cooldowns: [
          {
            spellId: 1022,
            label: 'Blessing of Protection',
            icon: 'spell_holy_sealofprotection',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 300,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.RETRIBUTION
          },
          {
            spellId: 642,
            label: 'Divine Shield',
            icon: 'spell_holy_divineshield',
            cooldownType: CooldownType.IMMUNITY,
            cooldownTime: 300,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.RETRIBUTION
          },
          {
            spellId: 633,
            label: 'Lay on Hands',
            icon: 'spell_holy_layonhands',
            cooldownType: CooldownType.EXTERNAL,
            cooldownTime: 600,
            altCooldownTime: null,
            charges: 1,
            WOWClass: WOWClass.PALADIN,
            WOWSpec: WOWSpec.RETRIBUTION
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
  //       label: 'Havoc',
  //       icon: 'ability_demonhunter_specdps',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 179057,
  //           label: 'Chaos Nova',
  //           icon: 'spell_fire_felfirenova',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60,
  //           altCooldownTime: 40
  //         },
  //         {
  //           id: 196718,
  //           label: 'Darkness',
  //           icon: 'ability_demonhunter_darkness',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 196555,
  //           label: 'Netherwalk',
  //           icon: 'spell_warlock_demonsoul',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 120
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Vengeance',
  //       icon: 'ability_demonhunter_spectank',
  //       isMelee: true,
  //       role: Role.TANK,
  //       cooldowns: [
  //         {
  //           id: 235169,
  //           label: "Archimonde's Hatred Reborn",
  //           icon: 'spell_nature_elementalshields',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 85,
  //           charges: 0
  //         },
  //         {
  //           id: 202138,
  //           label: 'Sigil of Chains',
  //           icon: 'ability_demonhunter_sigilofchains',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 90
  //         },
  //         {
  //           id: 207684,
  //           label: 'Sigil of Misery',
  //           icon: 'ability_demonhunter_sigilofmisery',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60,
  //           altCooldownTime: 48
  //         },
  //         {
  //           id: 202137,
  //           label: 'Sigil of Silence',
  //           icon: 'ability_demonhunter_sigilofsilence',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60,
  //           altCooldownTime: 48
  //         },
  //         {
  //           id: 204021,
  //           label: 'Fiery Brand',
  //           icon: 'ability_demonhunter_fierybrand',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 60
  //         },
  //         {
  //           id: 209258,
  //           label: 'Last Resort',
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
  //       label: 'Balance',
  //       icon: 'spell_nature_starfall',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 29166,
  //           label: 'Innervate',
  //           icon: 'spell_nature_lightning',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180
  //         },
  //         {
  //           id: 20484,
  //           label: 'Rebirth',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 78675,
  //           label: 'Solar Beam',
  //           icon: 'ability_vehicle_sonicshockwave',
  //           cooldownType: CooldownType.CROWD_CONTROL,
  //           cooldownTime: 60
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Feral',
  //       icon: 'ability_druid_catform',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 20484,
  //           label: 'Rebirth',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 106898,
  //           label: 'Stampeding Roar',
  //           icon: 'spell_druid_stampedingroar_cat',
  //           cooldownType: CooldownType.MOVEMENT,
  //           cooldownTime: 120
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Guardian',
  //       icon: 'ability_racial_bearform',
  //       isMelee: true,
  //       role: Role.TANK,
  //       cooldowns: [
  //         {
  //           id: 20484,
  //           label: 'Rebirth',
  //           icon: 'spell_nature_reincarnation',
  //           cooldownType: CooldownType.BATTLE_RESURRECTION,
  //           cooldownTime: 600
  //         },
  //         {
  //           id: 77761,
  //           label: 'Stampeding Roar',
  //           icon: 'spell_druid_stamedingroar',
  //           cooldownType: CooldownType.MOVEMENT,
  //           cooldownTime: 120
  //         },
  //         {
  //           id: 235169,
  //           label: "Archimonde's Hatred Reborn",
  //           icon: 'spell_nature_elementalshields',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 85,
  //           charges: 0
  //         },
  //         {
  //           id: 61336,
  //           label: 'Survival Instincts',
  //           icon: 'ability_druid_tigersroar',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 180,
  //           altCooldownTime: 120,
  //           charges: 2
  //         },
  //         {
  //           id: 200851,
  //           label: 'Rage of the Sleeper',
  //           icon: 'inv_hand_1h_artifactursoc_d_01',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 90
  //         },
  //         {
  //           id: 22812,
  //           label: 'Barkskin',
  //           icon: 'spell_nature_stoneclawtotem',
  //           cooldownType: CooldownType.DEFENSIVE,
  //           cooldownTime: 54
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Restoration',
  //       icon: 'spell_nature_healingtouch',
  //       isMelee: false,
  //       role: Role.HEALER,
  //       cooldowns: [
  //         {
  //           id: 102342,
  //           label: 'Ironbark',
  //           icon: 'spell_druid_ironbark',
  //           cooldownType: CooldownType.EXTERNAL,
  //           cooldownTime: 90,
  //           altCooldownTime: 60
  //         },
  //         {
  //           id: 740,
  //           label: 'Tranquility',
  //           icon: 'spell_nature_tranquility',
  //           cooldownType: CooldownType.HEALING,
  //           cooldownTime: 180,
  //           altCooldownTime: 120
  //         },
  //         {
  //           id: 20484,
  //           label: 'Rebirth',
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
  //       label: 'Beast Mastery',
  //       icon: 'ability_hunter_bestialdiscipline',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 186265,
  //           label: 'Aspect of the Turtle',
  //           icon: 'ability_hunter_pet_turtle',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 180
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Marksmanship',
  //       icon: 'ability_hunter_focusedaim',
  //       isMelee: false,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 186265,
  //           label: 'Aspect of the Turtle',
  //           icon: 'ability_hunter_pet_turtle',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 180
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Survival',
  //       icon: 'ability_hunter_camouflage',
  //       isMelee: true,
  //       role: Role.DPS,
  //       cooldowns: [
  //         {
  //           id: 186265,
  //           label: 'Aspect of the Turtle',
  //           icon: 'ability_hunter_pet_turtle',
  //           cooldownType: CooldownType.IMMUNITY,
  //           cooldownTime: 180
  //         }
  //       ]
  //     }
  //   ]
  // }
];

export { CLASSES, IWOWClass };
