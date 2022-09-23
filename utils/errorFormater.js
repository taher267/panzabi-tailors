export default (message, status = 400) => {
  return {
    status,
    errors: {
      success: false,
      message,
    },
  };
};
