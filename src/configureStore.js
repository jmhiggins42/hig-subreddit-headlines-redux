import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import redditApp from "./reducers";

const loggerMiddleware = createLogger();

const configureStore = preLoadedState =>
  createStore(
    redditApp,
    preLoadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

export default configureStore;
