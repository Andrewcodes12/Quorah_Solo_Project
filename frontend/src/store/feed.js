// Define Action Types as Constants
const LOAD_FEED = 'feed/loadFeed';

// Define Action Creators
const loadFeed = (feed) => ({
  type: LOAD_FEED,
  feed,
});

// Define Thunks
export const getFeed = () => async (dispatch) => {
  const response = await fetch('/api/feed');
  const feed = await response.json();
  dispatch(loadFeed(feed));
};

// Define an initial state
const initialState = {};

// Define a reducer
const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FEED:
      const newState = { ...state };
      action.feed.forEach(feed => {
        newState[feed.id] = feed;
      });
      return newState;
    default:
      return state;
  }
};

// Export the reducer
export default feedReducer;
