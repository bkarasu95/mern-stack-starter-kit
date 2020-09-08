import { authReducer } from './authenticate/reducers'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer
})

// export type RootState = ReturnType<typeof rootReducer>

export const configureStore = () => {
    return createStore(
        rootReducer
    );
};