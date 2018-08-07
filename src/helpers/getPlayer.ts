import { Player } from "../classes/Player";
import { WOWClass } from "../enums/WOWclass";
import { WOWSpec } from "../enums/WOWspec";

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

export { getPlayerById, getPlayerIndexById, getPlayerByPlayerName, getPlayersByClass, getPlayersBySpec };
