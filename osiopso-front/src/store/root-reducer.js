import { combineReducers } from "redux";
import clothesReducer from "./clothes/clothes.reducer";
import userReducer from "./user/user.reducer";
import closetReducer from "./closet/closet.reducer";
import ootdReducer from "./ootd/ootd.reducer";


export const rootReducer = combineReducers({
  clothes:clothesReducer,
  closet: closetReducer,
  user: userReducer,
  ootd: ootdReducer
});


