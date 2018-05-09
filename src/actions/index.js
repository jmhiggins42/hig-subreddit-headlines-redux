import axios from "axios";

/* Fetch Actions */
export const REQUEST_POSTS = "REQUEST_POSTS";
export const GET_POSTS = "GET_POSTS";

/* Subreddit Actions */
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

/* Action Creators */
export const requestPosts = subreddit => {
  return { type: REQUEST_POSTS, subreddit };
};

// NOTE: json received from www.reddit.com/r/${subreddit}.json
const getPosts = (subreddit, json) => {
  return {
    type: GET_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
};

export const selectSubreddit = subreddit => {
  return { type: SELECT_SUBREDDIT, subreddit };
};

export const invalidateSubreddit = subreddit => {
  return { type: INVALIDATE_SUBREDDIT, subreddit };
};

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit));
  return axios
    .get(`https://www.reddit.com/r/${subreddit}.json`)
    .then(
      response => response.data,
      err => console.log("An error occured", err)
    )
    .then(json => dispatch(getPosts(subreddit, json)));
};

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];

  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
};

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit));
  }
};
