export default (msg, statusCode = 500) => {
  const e = new Error(msg || `Nothing found 👽`);
  e.status = statusCode;
  return e;
};
