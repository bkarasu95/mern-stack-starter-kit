import { combineReducers, createStore, applyMiddleware } from "redux";
import productsReducer from "./products/reducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  products: productsReducer,
});

declare global {
  interface Window {
    INITIAL_STATE: any;
  }
}

let state = typeof window != "undefined" ? window.INITIAL_STATE : {};

export const store = createStore(rootReducer, state, applyMiddleware(thunk));
