import clonning from './clonning';
export default (data = []) => {
  return clonning?.(data)?.reduce(
    (a, c) => {
      if (c?.type?.includes('1')) a?.up?.push?.(c);
      if (c?.type?.includes('2')) a?.down?.push?.(c);
      return a;
    },
    { up: [], down: [] }
  );
};
