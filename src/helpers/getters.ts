import { IBooleanMap, Strategy } from 'src/classes/Strategy';

import { BossType } from '../classes/Boss';
import { Player } from '../classes/Player';
import { CLASSES } from '../constants/classes';
import { RAIDS } from '../constants/raids';
import { Raid } from '../enums/raid';
import { Role } from '../enums/role';
import { WOWClass } from '../enums/WOWclass';
import { WOWSpec } from '../enums/WOWspec';

const getClassInfo = (wc: WOWClass) => {
  const r = CLASSES.find(c => c.id === wc);
  return r && r || CLASSES[0];
};

const getClassColor = (wc: WOWClass) => {
  const r = getClassInfo(wc);
  return r && r.classColor;
};

const getSpecInfo = (wc: WOWClass, ws: WOWSpec) => {
  const r = getClassInfo(wc);
  return r.specs.find(s => s.id === ws) || r.specs[0];
};

const getRoleIcon = (role: Role, isMelee: boolean) => {
  let roleIcon = 'role-';
  switch (role) {
    case Role.DPS:
      isMelee ? roleIcon += 'melee-dps.png' : roleIcon += 'ranged-dps.png';
      break;
    case Role.HEALER:
      roleIcon += 'healer.png';
      break;
    case Role.TANK:
      roleIcon += 'tank.png';
      break;
    default:
      break;
  }
  return roleIcon;
};

const getRaidInfo = (wr: Raid) => {
  const r = RAIDS.find(raid => raid.id === wr);
  return r && r || RAIDS[0];
};

const getBossInfo = (wr: Raid, wb: BossType) => {
  const raidInfo = getRaidInfo(wr);
  const r = raidInfo.bosses.find(b => b.id === wb);
  return r && r || raidInfo.bosses[0];
};

const getPlayerIndexById = (id: string | undefined, players: Player[]) => {
  let index = -1;
  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    if (player.id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const getPlayerById = (id: string | undefined, players: Player[]) => {
  const r = players.find(player => player.id === id);
  return r || undefined;
};

const getPlayerByPlayerName = (playerName: string, players: Player[]) => {
  const r = players.find(player => player.playerName === playerName);
  return r || undefined;
};

const getPlayersByClass = (wc: WOWClass, players: Player[]) => {
  const r: Player[] = [];
  players.map(player => player.playerClass === wc && r.push(player));
  return r;
};

const getPlayersBySpec = (ws: WOWSpec, players: Player[]) => {
  const r: Player[] = [];
  players.map(player => player.playerSpec === ws && r.push(player));
  return r;
};

const getPermissionBoolean = (uid: string, strategy: Strategy, roles: string[]) => {
  const { admins, officers, members, guests } = strategy;
  const roleMap = {
    'admins': admins,
    'officers': officers,
    'members': members,
    'guests': guests
  };
  let canEdit = false;
  
  const checkPermissionGroup = (group: IBooleanMap) => {
    if (group) {
      Object.keys(group).map(x => x === uid && (group[x] === true) && (canEdit = true));
    }
  };

  roles.map(role => checkPermissionGroup(roleMap[role]));
  return canEdit;  
}

export { getBossInfo, getRaidInfo, getPermissionBoolean, getPlayerById, getPlayerIndexById, getPlayerByPlayerName, getPlayersByClass, getPlayersBySpec, getClassInfo, getClassColor, getRoleIcon, getSpecInfo };
