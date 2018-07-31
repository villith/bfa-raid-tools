import { WOWClass } from '../enums/WOWclass';
import { WOWSpec } from '../enums/WOWspec';
import { uuid } from '../helpers/createGuid';

class Player {
  public id: string;
  public playerName: string;
  public playerClass: WOWClass;
  public playerSpec: WOWSpec;

  constructor(playerName: string, playerClass: WOWClass, playerSpec: WOWSpec) {
    this.id = uuid();
    this.playerName = playerName;
    this.playerClass = playerClass;
    this.playerSpec = playerSpec;
  }
}

export { Player };
