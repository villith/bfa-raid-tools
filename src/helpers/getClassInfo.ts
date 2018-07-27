import { CLASSES } from '../constants/classes';
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

export { getClassInfo, getClassColor, getRoleIcon, getSpecInfo };
