export default (data = '') => {
  data = data.replace('?', '');
  data = data.replace(/&/g, `","`);
  data = data.replace(/=/g, `":"`);
  return `{"${data}"}`;
};
