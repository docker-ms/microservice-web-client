export const HTTP_AUTH = (userCredential) => {
  return {
    type: 'HTTP_AUTH',
    userCredential
  };
};

export const HTTP_LSYNC = () => {
  return {
    type: 'HTTP_LSYNC'
  };
};


