import { combineReducers } from "redux";
import clothesReducer from "./clothes/clothes.reducer";
// import userReducer from "./user/user.reducer";
import closetReducer from "./closet/closet.reducer";


export const rootReducer = combineReducers({
  clothes:clothesReducer,
<<<<<<< HEAD
  // users: userReducer,
  closet: closetReducer,

=======
  user:userReducer,
>>>>>>> Feature/S08P12C106-185-FE-토큰-axios-요청
});


