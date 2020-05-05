import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';
import Login from './Login';

const Root = () => (
    <Router>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={Login}/>
    </Router>
);

export default Root;