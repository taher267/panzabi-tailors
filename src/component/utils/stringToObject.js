/**
 * This is only applycable only react hook form validarion maker
 */
export default (str = '') => {
  let newStr = str;
  if (str && str.endsWith('∂')) {
    newStr = newStr.slice(0, -1);
  }
  let rules = {};
  if (newStr?.length) {
    for (const iter of newStr.split(/∂|∎/)) {
      const arrs = iter?.split(/→|←/);
      if (arrs?.length === 3 && /[A-Za-z]/.test(arrs[0])) {
        if (arrs[0] === 'pattern') {
          const validate = (val) => {
            const msg = arrs[2];
            if (!val?.toString()?.match(new RegExp(arrs[1]))) return msg;
          };
          rules = {
            ...rules,
            validate,
          };
        } else {
          if (!arrs[2]) {
            console.log({ [arrs[0]]: arrs[1] === 'true' ? true : arrs[1] });
            rules = {
              ...rules,
              [arrs[0]]: arrs[1] === 'true' ? true : arrs[1],
            };
          } else {
            rules = {
              ...rules,
              [arrs[0]]: { value: arrs[1], message: arrs[2] },
            };
          }

          // console.log(rules);
        }
      }
      if (arrs?.length === 2 && /[A-Za-z]/.test(arrs[0])) {
        rules = {
          ...rules,
          [arrs[0]]: arrs[1],
        };
      }
    }
  }
  return rules;
};
