import { BossType } from '../classes/Boss';
import { RAIDS } from '../constants/raids';
import { Raid } from '../enums/raid';


const getRaidInfo = (wr: Raid) => {
  const r = RAIDS.find(raid => raid.id === wr);
  return r && r || RAIDS[0];
};

const getBossInfo = (wr: Raid, wb: BossType) => {
  const raidInfo = getRaidInfo(wr);
  const r = raidInfo.bosses.find(b => b.id === wb);
  return r && r || raidInfo.bosses[0];
};

export { getBossInfo, getRaidInfo };
