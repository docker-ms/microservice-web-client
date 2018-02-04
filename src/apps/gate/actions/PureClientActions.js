export const ALERT_USER = (msgType, msg) => {
  return {
    type: 'ALERT_USER',
    msgType, msg
  };
};

export const GATHER_USER_CREDENTIAL = (parentPath, k, v) => {
  return {
    type: 'GATHER_USER_CREDENTIAL',
    parentPath, k, v
  };
};

export const REDIRECT_TO = (url) => {
  return {
    type: 'REDIRECT_TO',
    url
  };
};

export const LSYNC_DATA_COMING = (data) => {
  return {
    type: 'LSYNC_DATA_COMING',
    data
  };
};


