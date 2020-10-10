import { authReducer } from "./authenticate/reducers";
import { combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import { resultReducer } from './result/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  result: resultReducer
});

// export type RootState = ReturnType<typeof rootReducer>

export const configureStore = () => {
  return createStore(rootReducer);
};
