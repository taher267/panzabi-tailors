export default (message) => {
  return {
    errors: {
      success: false,
      message,
    },
  };
};
