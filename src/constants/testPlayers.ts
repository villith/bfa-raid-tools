import { WOWClass } from "../enums/WOWclass";
import { WOWSpec } from "../enums/WOWspec";
import { Player } from "../classes/Player";

const testPlayers: Player[] = [
  {
    id: 0,
    playerClass: WOWClass.WARRIOR,
    playerName: 'Manmoth',
    playerSpec: WOWSpec.FURY,
  },
  {
    id: 1,
    playerClass: WOWClass.MAGE,
    playerName: 'Mikestrahan',
    playerSpec: WOWSpec.FIRE,
  },
  {
    id: 2,
    playerClass: WOWClass.WARRIOR,
    playerName: 'Goldeen',
    playerSpec: WOWSpec.PROTECTION_WARRIOR,
  },
  {
    id: 3,
    playerClass: WOWClass.ROGUE,
    playerName: 'Lilnugg',
    playerSpec: WOWSpec.OUTLAW,
  },
  {
    id: 4,
    playerClass: WOWClass.PRIEST,
    playerName: 'Gpz',
    playerSpec: WOWSpec.DISCIPLINE,
  },
  {
    id: 5,
    playerClass: WOWClass.SHAMAN,
    playerName: 'Manmooth',
    playerSpec: WOWSpec.ELEMENTAL
  },
  {
    id: 6,
    playerClass: WOWClass.SHAMAN,
    playerName: 'Trollonahic',
    playerSpec: WOWSpec.RESTORATION_SHAMAN
  },
  {
    id: 7,
    playerClass: WOWClass.WARLOCK,
    playerName: 'Kaeravek',
    playerSpec: WOWSpec.DEMONOLOGY
  },
  {
    id: 8,
    playerClass: WOWClass.WARLOCK,
    playerName: 'Soulmanrawr',
    playerSpec: WOWSpec.AFFLICTION,
  },
];

export { testPlayers };
