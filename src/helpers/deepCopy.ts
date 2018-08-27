const deepCopy = (r: any): any => {
  return JSON.parse(JSON.stringify(r));
};

export { deepCopy };
