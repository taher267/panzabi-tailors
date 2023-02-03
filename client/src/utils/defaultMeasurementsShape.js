import clonning from '../component/utils/clonning';

export default (data = [], key, selector) => {
  let newObje = {};
  for (const item of clonning(data)) {
    if (typeof selector === 'object') {
      let vals = {};
      for (const sel of selector || []) {
        vals[sel] = item[sel];
      }
      newObje[item[key]] = vals;
    } else {
      newObje[item[key]] = item[selector];
    }
  }
  return newObje;
};
