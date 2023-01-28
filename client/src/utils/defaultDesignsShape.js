import clonning from '../component/utils/clonning';

export default (data) => {
  let newObj = {};
  for (const designsGroup of clonning(data)) {
    if (designsGroup?.group && designsGroup?.items?.length) {
      const { group, items } = designsGroup;
      let groupping = {};
      for (const { dsn_id, desc } of items) {
        groupping[dsn_id] = desc;
        // groupping[dsn_id] = { dsn_id, desc };
      }
      newObj[group] = groupping;
    }
  }
  // console.log(newObj, data);
  return newObj;
};
