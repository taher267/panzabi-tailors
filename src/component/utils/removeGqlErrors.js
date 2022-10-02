function error(name, errs, setErrors) {
  let newErr = { ...errs };
  delete newErr[name];
  return setErrors(newErr);
}

export default error;
