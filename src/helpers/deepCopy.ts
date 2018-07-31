import { Boss } from "../classes/Boss";

interface IBossMap {
  [index: number]: Boss;
}

const deepCopy = (r: Boss | IBossMap): Boss | IBossMap => {
  return JSON.parse(JSON.stringify(r));
};

export { deepCopy };
