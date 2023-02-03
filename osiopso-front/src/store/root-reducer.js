import { combineReducers } from "redux";
import clothesReducer from "./clothes/clothes.reducer";
import closetReducer from "./closet/closet.reducer";

export const rootReducer = combineReducers({
  clothes: clothesReducer,
  closet: closetReducer,
});


