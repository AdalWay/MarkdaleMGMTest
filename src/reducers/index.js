import { combineReducers } from "redux";
import btcReducer from "./bitcoinReducer";

export default combineReducers({
  post: btcReducer
});
