
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage, // define which storage to use
};


function setReddits(state = [], action) {
  switch (action.type) {
    case "SET_REDDITS":
      return (state = action.value);
    case "ADD_TO_REDDITS":
      return (state = state.push(action.value));
    default:
      return state;
  }
}
function setPosts(state = [], action) {
  switch (action.type) {
    case "SET_POSTS":
      return (state = action.value);
    case "PUSH_TO_POSTS":
      return (state = state.push(action.value));
    case "ADD_TO_POSTS":
      return (state = state
        .concat(action.value));
    default:
      return state;
  }
}
function setComments(state = [], action) {
  switch (action.type) {
    case "SET_COMMENTS":
      return (state = action.value);
    case "ADD_TO_COMMENTS":
            return (state = state
              .concat(action.value)
              .filter((item, index) => state.indexOf(item) === index));
    default:
      return state;
  }
}

const reducer = combineReducers({
  reddits: setReddits,
  posts: setPosts,
  comments: setComments,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export { store, persistor };
