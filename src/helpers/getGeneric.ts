const findById = (id: string | number, array: any[]) => {
  let index = -1;
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const findBySpellId = (id: number, array: any[]) => {
  let index = -1;
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.spellId === id) {
      index = i;
      break;
    }
  }
  return index;
};

const findAllById = (id: string | number, array: any[]) => {
  const indexes = [];
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.id === id) {
      indexes.push(i);
    }
  }
  return indexes;
};

const findByOwner = (ownerId: string, array: any[]) => {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    if (obj.owner === ownerId) {
      index = i;
    }
  }
  return index;
};

const findAllByOwner = (ownerId: string, array: any[]) => {
  const indexes = [];
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.owner === ownerId) {
      indexes.push(i);
    }
  }
  return indexes;
};

const findUnique = (ownerId: string, id: string, array: any[]) => {
  let index = -1;
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.id === id && obj.owner === ownerId) {
      index = i;
    }
  }
  return index;
};

export { findById, findBySpellId, findAllById, findByOwner, findAllByOwner, findUnique }
