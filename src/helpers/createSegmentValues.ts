import { IDefaultSegmentMap, ISegmentValue } from "../components/SegmentBar/SegmentBarContainer";

const createSegmentValues = (values: IDefaultSegmentMap) => {
  const colors = [
    'red',
    'green',
    'yellow',
  ];

  let totalValue = 0;
  const keys = Object.keys(values);
  keys.map(key => {
    const segmentValue: ISegmentValue = values[key];
    totalValue += segmentValue.count;
  });
  const segments = [];
  const createSegment = (value: ISegmentValue, index: number) => {
    const segment: ISegmentValue = {
      color: value.color || colors[index],
      count: value.count,
      label: value.label,
      width: (value.count / totalValue) * 100,
    };
    return segment;
  }

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = values[key];
    segments.push(createSegment(value, i));
  }

  return segments;
}

export { createSegmentValues };