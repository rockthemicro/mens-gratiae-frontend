import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import configureStore from "./configureStore";
import {Provider} from 'react-redux';

const initialState = {
    simpleReducer: {
        result: 'first'
    },
    logInStatusReducer: {
        loggedIn: false
    },
    editQuestionReducer: {
        visible: false
    }
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={configureStore(initialState)}>
            <Root/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
