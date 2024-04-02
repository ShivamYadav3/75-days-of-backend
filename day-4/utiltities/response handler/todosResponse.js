export const createResponse = (data, message) => {
  return {
    data,
    meta: {
      message,
    },
  };
};
