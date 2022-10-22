export default (str) => {
  // .replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)status:ACTIVE,template:template-01
  let newStr = '';
  if (str) {
    newStr = str.slice(-1) === ',' ? str.slice(0, -1) : str;
    newStr = newStr.replace(/\b(:|,)\b/g, (key) => `"${key}"`);
  }
  let adding = `{"${newStr}"}`;
  try {
    return JSON.parse(adding);
  } catch (e) {
    return false;
  }
};
