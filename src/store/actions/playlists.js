export const loadingPlaylists = () => ({ type: "LOADING_PLAYLISTS" });

export const listPlaylists = (payload) => ({
  type: "SUCCESS_PLAYLISTS",
  payload,
});

export const failurePlaylists = (payload) => ({
  type: "FAILURE_PLAYLISTS",
  payload,
});

export const searchPlaylists = (payload) => ({
  type: "SEARCH_PLAYLISTS",
  payload,
});
