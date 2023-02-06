import { combineReducers } from "redux";
import clothesReducer from "./clothes/clothes.reducer";
// import userReducer from "./user/user.reducer";
import closetReducer from "./closet/closet.reducer";


export const rootReducer = combineReducers({
  clothes:clothesReducer,
  // users: userReducer,
  closet: closetReducer,

});


