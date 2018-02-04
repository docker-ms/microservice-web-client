export const WS_CONNECT = () => {
  return {
    type: 'WS_CONNECT'
  };
};

export const WS_SEND_MESSAGE = (message) => {
  return {
    type: 'WS_SEND_MESSAGE',
    message
  };
};

export const WS_RECEIVED_MESSAGE = (message) => {
  return {
    type: 'WS_RECEIVED_MESSAGE',
    message
  };
};


