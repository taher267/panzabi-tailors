export default function (name, errs, setErrors) {
  let newErr = { ...errs };
  delete newErr[name];
  return setErrors(newErr);
}
