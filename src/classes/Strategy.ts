import { PermissionRole } from '../enums/permissionRole';
import { IBossMap } from './Boss';
import { Player } from './Player';

interface IPermissionMap {
  [PermissionRole.ADMIN]: string[],
  [PermissionRole.OFFICER]: string[],
  [PermissionRole.MEMBER]: string[],
  [PermissionRole.GUEST]: string[],
}

interface IStrategy {
  id: string | null;
  title: string;
  description: string;
  bosses: IBossMap;
  players: Player[];
  users: IPermissionMap;
}

class Strategy {
  public id: string | null;
  public title: string;
  public description: string;
  public bosses: IBossMap;
  public players: Player[];
  public users: IPermissionMap;

  constructor(id: string | null, title: string, description: string, bosses: IBossMap, 
    players: Player[], users: IPermissionMap) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.bosses = bosses;
    this.players = players;
    this.users = users;
  }
}

export { Strategy, IStrategy, IPermissionMap };
