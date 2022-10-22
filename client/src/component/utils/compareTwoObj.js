import _ from 'lodash';
/**
 * @oldData
 */
export default (oldData, newData) => {
  let newObj = {};
  let noChange = false;
  const bugs = {};
  for (const i of Object.keys(newData)) {
    newObj[i] = oldData[i] || '';
  }
  if (_.isEqual(newObj, newData)) {
    for (const i of Object.keys(newData)) {
      bugs[i] = `Nothing to be changed`;
    }
    noChange = true;
  }
  //   console.log(newObj, newData);
  return { noChange, bugs };
};
