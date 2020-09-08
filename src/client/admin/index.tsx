import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { configureStore } from './store';
import { Provider } from 'react-redux';

export const store = configureStore();

render(
    <BrowserRouter basename="/admin">
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("app")
);
