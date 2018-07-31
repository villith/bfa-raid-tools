import { WOWClass } from "../enums/WOWclass";
import { WOWSpec } from "../enums/WOWspec";
import { Player } from "../classes/Player";

const testPlayers: Partial<Player>[] = [
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
    playerClass: WOWClass.SHAMAN,
    playerName: 'Trollonahic',
    playerSpec: WOWSpec.RESTORATION_SHAMAN
  },
  {
    playerClass: WOWClass.WARLOCK,
    playerName: 'Kaeravek',
    playerSpec: WOWSpec.DEMONOLOGY
  },
  {
    playerClass: WOWClass.WARLOCK,
    playerName: 'Soulmanrawr',
    playerSpec: WOWSpec.AFFLICTION,
  },
];

export { testPlayers };
