import clonning from '../component/utils/clonning';

export const measurementKeyValue = (data = {}) => {
  const newObj = [];
  for (const key of Object.keys(data)) {
    const { size, label } = data[key];
    if (size?.trim?.()) newObj.push({ msr_id: key, size, label });
  }
  return newObj;
};

export const designFiltering = (data = []) =>
  data.reduce((a, c) => {
    const obj = objToArray(c);
    if (obj) a.push(obj);
    return a;
  }, []);

export const objToArray = (data) => {
  let result;
  const group = data?.group;
  if (group) {
    const cloneData = clonning(data);
    const slicing = Object.keys(cloneData)?.slice?.(0, -1);
    const items = [];
    for (const item of slicing) {
      const { isCheck, ...rest } = cloneData[item];
      if (isCheck) items.push(rest);
    }
    if (items?.length) result = { group, items };
  }
  return result;
};
