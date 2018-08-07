import { BossType } from "../classes/Boss";
import { Player } from "../classes/Player";

const getPlayersByBoss = (boss: BossType, players: Player[]) => {
  return players.filter(p => p.bosses[boss] === true);
};

const filterPlayersByBoss = (boss: BossType, players: Player[]) => {
  return players.filter(p => p.bosses[boss] === false);
};

export { getPlayersByBoss, filterPlayersByBoss };
