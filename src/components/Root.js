import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import App from './App';

const Root = ({store}) => (
    <Router>
      <Route path="/" component={App} />
    </Router>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;