import { authReducer } from "./authenticate/reducers";
import { combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
});

// export type RootState = ReturnType<typeof rootReducer>

export const configureStore = () => {
  return createStore(rootReducer);
};
