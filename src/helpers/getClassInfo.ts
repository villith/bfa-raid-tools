import { CLASSES } from '../constants/classes';
import { Role } from '../enums/role';
import { WOWClass } from '../enums/WOWclass';

const getClassInfo = (wc: WOWClass) => {
  const r = CLASSES.find(c => c.id === wc);
  return r && r || CLASSES[0];
};

const getClassColor = (wc: WOWClass) => {
  const r = getClassInfo(wc);
  return r && r.classColor;
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

export { getClassInfo, getClassColor, getRoleIcon };
