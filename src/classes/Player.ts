import { WOWClass } from '../enums/WOWclass';
import { WOWSpec } from '../enums/WOWspec';

class Player {
  public id: number;
  public playerName: string;
  public playerClass: WOWClass;
  public playerSpec: WOWSpec;

  constructor(id: number, playerName: string, playerClass: WOWClass, playerSpec: WOWSpec) {
    this.id = id;
    this.playerName = playerName;
    this.playerClass = playerClass;
    this.playerSpec = playerSpec;
  }
}

export { Player };
