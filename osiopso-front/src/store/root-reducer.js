import { combineReducers } from "redux";
import clothesReducer from "./clothes/clothes.reducer";

export const rootReducer = combineReducers({
  clothes: clothesReducer,
});


