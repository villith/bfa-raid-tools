import { PermissionRole } from 'src/enums/permissionRole';

import { IBossMap } from './Boss';
import { Player } from './Player';

interface IStrategyDescriptors {
  id: string;
  title: string;
  description: string;
}

interface IBooleanMap { [index: string]: boolean };

interface IPermissionsMap { [index: string]: PermissionRole };

class Strategy {
  public id: string;
  public title: string;
  public description: string;
  public bosses: IBossMap;
  public players: Player[];
  public admins: IBooleanMap;
  public officers?: IBooleanMap;
  public members?: IBooleanMap;
  public guests?: IBooleanMap;

  constructor(id: string, title: string, description: string, admins: IBooleanMap, officers?: IBooleanMap,
    members?: IBooleanMap, guests?: IBooleanMap, bosses?: IBossMap, players?: Player[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.bosses = bosses || {} as IBossMap;
    this.players = players || [] as Player[];    
    this.admins = admins;
    this.officers = officers || {} as IBooleanMap;
    this.members = members || {} as IBooleanMap;
    this.guests = guests || {} as IBooleanMap;
  }
}

export { Strategy, IStrategyDescriptors, IBooleanMap, IPermissionsMap };
