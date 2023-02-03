import { combineReducers } from "redux";
import clothesReducer from "./clothes/clothes.reducer";
import userReducer from "./user/user.reducer";

export const rootReducer = combineReducers({
  clothes:clothesReducer,
  user:userReducer,
});


