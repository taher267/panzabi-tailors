export default (ers = []) => {
  if (!Array.isArray(ers)) return error(`Something going wrong!💥`);
  return ers.reduce((a, c) => {
    let {
      message,
      context: { key },
    } = c;
    a[key] = message?.replace?.(/"/g, '');
    return a;
  }, {});
};
