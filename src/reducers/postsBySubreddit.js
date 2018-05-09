import { REQUEST_POSTS, GET_POSTS, INVALIDATE_SUBREDDIT } from "../actions";

const posts = (
  state = { isFetching: false, didInvalidate: false, items: [] },
  action
) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, { didInvalidate: true });

    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case GET_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });

    default:
      return state;
  }
};

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case GET_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });

    default:
      return state;
  }
};

export default postsBySubreddit;
