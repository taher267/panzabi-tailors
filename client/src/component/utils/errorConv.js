// export const errorFormat = (e) => {
//   const exc = e?.graphQLErrors?.[0]?.extensions;
//   if (exc?.errors) return exc.errors;
//   return {
//     message:
//       exc?.errors?.message || e?.message?.length
//         ? e?.message
//         : `Internal fetching error`,
//   };
// };

export const errorFormat = (e) => {
  const exc = e?.graphQLErrors?.[0]?.extensions;
  return {
    message: exc?.errors?.message || exc?.message || `Internal fetching error`,
    errors: exc?.errors,
  };
};
