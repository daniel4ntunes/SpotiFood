const INITIAL_STATE = {
  playlists: [],
  loading: true,
  error: null,
};

const playlists = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING_PLAYLISTS":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SUCCESS_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload,
        loading: false,
        error: null,
      };
    case "FAILURE_PLAYLISTS":
      return {
        ...state,
        playlists: [],
        loading: false,
        error: action.payload,
      };
    case "SEARCH_PLAYLISTS":
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export default playlists;
