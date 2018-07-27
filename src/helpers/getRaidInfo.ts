import { RAIDS } from '../constants/raids';
import { BossAntorus } from '../enums/bossAntorus';
import { BossTomb } from '../enums/bossTomb';
import { BossUldir } from '../enums/bossUldir';
import { Raid } from '../enums/raid';


const getRaidInfo = (wr: Raid) => {
  const r = RAIDS.find(raid => raid.id === wr);
  return r && r || RAIDS[0];
};

const getBossInfo = (wr: Raid, wb: BossAntorus | BossTomb | BossUldir) => {
  const raidInfo = getRaidInfo(wr);
  const r = raidInfo.bosses.find(b => b.id === wb);
  return r && r || raidInfo.bosses[0];
};

export { getBossInfo, getRaidInfo };
