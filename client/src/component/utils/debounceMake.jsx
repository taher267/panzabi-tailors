import React, { useCallback } from 'react';

const debounceMake = () => {
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };
  const handleChange = (d) => {
    console.log(d.target?.value);
  };
  const optimized = useCallback(debounce(handleChange), []);
  return (
    <div>
      <input type="text" onChange={optimized} />
    </div>
  );
};

export default debounceMake;
