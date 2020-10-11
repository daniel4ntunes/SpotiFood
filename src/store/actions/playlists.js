export const loadingPlaylists = () => {
  return {
    type: "LOADING_PLAYLISTS",
  };
};

export const listPlaylists = (payload) => {
  return {
    type: "SUCCESS_PLAYLISTS",
    payload,
  };
};

export const failurePlaylists = (payload) => {
  return {
    type: "FAILURE_PLAYLISTS",
    payload,
  };
};

export const searchPlaylists = (payload) => {
  return {
    type: "SEARCH_PLAYLISTS",
    payload,
  };
};
