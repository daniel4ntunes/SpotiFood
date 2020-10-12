const INITIAL_STATE = {
  playlists: [],
  loading: true,
  error: null,
};

const playlists = (state = INITIAL_STATE, action) => {
  const reducers = {
    LOADING_PLAYLISTS: {
      ...state,
      loading: true,
      error: null,
    },
    SUCCESS_PLAYLISTS: {
      ...state,
      playlists: action.payload,
      loading: false,
      error: null,
    },
    FAILURE_PLAYLISTS: {
      ...state,
      playlists: [],
      loading: false,
      error: action.payload,
    },
    SEARCH_PLAYLISTS: {
      ...state,
      text: action.payload,
    },
    default: state,
  };

  return reducers[action.type] || reducers.default;
};

export default playlists;
