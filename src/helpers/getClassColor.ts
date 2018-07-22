import { classes } from '../constants/classes';
import { WOWClass } from '../enums/WOWclass';

const getClassInfo = (wc: WOWClass) => {
  const r = classes.find(c => c.id === wc);
  return r && r || classes[0];
};

const getClassColor = (wc: WOWClass) => {
  const r = getClassInfo(wc);
  return r && r.classColor;
};

export { getClassInfo, getClassColor };
