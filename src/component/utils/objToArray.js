export default (data = {}, remove = []) => {
  let newObj = { ...data };
  let arr = [];
  for (const del of remove) {
    delete newObj?.[del];
  }

  for (const key of Object.keys(newObj)) {
    arr.push({ [key]: newObj?.[key] });
  }
  return arr;
};
