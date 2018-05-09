import { combineReducers } from "redux";
import selectedSubreddit from "./selectedSubreddit";
import postsBySubreddit from "./postsBySubreddit";

const redditApp = combineReducers({ postsBySubreddit, selectedSubreddit });

export default redditApp;
