import { WOWClass } from "../enums/WOWclass";
import { WOWSpec } from "../enums/WOWspec";
import { Player } from "../classes/Player";

const testPlayers: Player[] = [
  {
    playerClass: WOWClass.WARRIOR,
    playerName: 'Manmoth',
    playerSpec: WOWSpec.FURY,
  },
  {
    playerClass: WOWClass.MAGE,
    playerName: 'Mikestrahan',
    playerSpec: WOWSpec.FIRE,
  },
  {
    playerClass: WOWClass.WARRIOR,
    playerName: 'Goldeen',
    playerSpec: WOWSpec.PROTECTION_WARRIOR,
  },
  {
    playerClass: WOWClass.ROGUE,
    playerName: 'Lilnugg',
    playerSpec: WOWSpec.OUTLAW,
  },
  {
    playerClass: WOWClass.PRIEST,
    playerName: 'Gpz',
    playerSpec: WOWSpec.DISCIPLINE,
  },
  {
    playerClass: WOWClass.SHAMAN,
    playerName: 'Manmooth',
    playerSpec: WOWSpec.ELEMENTAL
  },
  {
    playerClass: WOWClass.MONK,
    playerName: 'Inefficient',
    playerSpec: WOWSpec.WINDWALKER
  },
  {
    playerClass: WOWClass.MAGE,
    playerName: 'Danskin',
    playerSpec: WOWSpec.FROST_MAGE
  },
  {
    playerClass: WOWClass.PALADIN,
    playerName: 'Oohhyyeeaahhzz',
    playerSpec: WOWSpec.PROTECTION_PALADIN,
  },
  {
    playerClass: WOWClass.DEATH_KNIGHT,
    playerName: 'TestBlood',
    playerSpec: WOWSpec.BLOOD
  },
  {
    playerClass: WOWClass.DEATH_KNIGHT,
    playerName: 'TestFrostDK',
    playerSpec: WOWSpec.FROST_DEATH_KNIGHT
  },
  {
    playerClass: WOWClass.DEATH_KNIGHT,
    playerName: 'TestUnholy',
    playerSpec: WOWSpec.UNHOLY
  },
  {
    playerClass: WOWClass.MAGE,
    playerName: 'TestArcane',
    playerSpec: WOWSpec.ARCANE
  },
  {
    playerClass: WOWClass.PRIEST,
    playerName: 'TestHolyPriest',
    playerSpec: WOWSpec.HOLY_PRIEST
  },
  {
    playerClass: WOWClass.PRIEST,
    playerName: 'TestShadow',
    playerSpec: WOWSpec.SHADOW
  },
  {
    playerClass: WOWClass.ROGUE,
    playerName: 'TestAssassination',
    playerSpec: WOWSpec.ASSASSINATION
  },
  {
    playerClass: WOWClass.ROGUE,
    playerName: 'TestSubtlety',
    playerSpec: WOWSpec.SUBTLETY
  },
  {
    playerClass: WOWClass.SHAMAN,
    playerName: 'TestRestorationShaman',
    playerSpec: WOWSpec.RESTORATION_SHAMAN
  },
  {
    playerClass: WOWClass.SHAMAN,
    playerName: 'TestEnhancement',
    playerSpec: WOWSpec.ENHANCEMENT
  },
  {
    playerClass: WOWClass.WARLOCK,
    playerName: 'TestAffliction',
    playerSpec: WOWSpec.AFFLICTION
  },
  {
    playerClass: WOWClass.WARLOCK,
    playerName: 'TestDemonology',
    playerSpec: WOWSpec.DEMONOLOGY
  },
  {
    playerClass: WOWClass.WARLOCK,
    playerName: 'TestDestruction',
    playerSpec: WOWSpec.DESTRUCTION
  },
  {
    playerClass: WOWClass.WARRIOR,
    playerName: 'TestArms',
    playerSpec: WOWSpec.ARMS
  },
  {
    playerClass: WOWClass.MONK,
    playerName: 'TestMistweaver',
    playerSpec: WOWSpec.MISTWEAVER
  },
  {
    playerClass: WOWClass.MONK,
    playerName: 'TestBrewmaster',
    playerSpec: WOWSpec.BREWMASTER
  },
  {
    playerClass: WOWClass.PALADIN,
    playerName: 'TestRetribution',
    playerSpec: WOWSpec.RETRIBUTION
  },
  {
    playerClass: WOWClass.PALADIN,
    playerName: 'TestHolyPaladin',
    playerSpec: WOWSpec.HOLY_PALADIN
  },
].map(player => new Player(player.playerName, player.playerClass, player.playerSpec));

export { testPlayers };
