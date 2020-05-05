import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {connect} from 'react-redux';
import simpleAction from '../../actions/simpleAction';

const mapStateToProps = state => ({
    simpleReducer: state.simpleReducer
});

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

const App = (props) => {

    const action = (event) => {
        props.simpleAction();
    };

    return (
        <div className="App">

            <button onClick={action}>blabla</button>
            <pre>
                {
                    JSON.stringify(props)
                }
            </pre>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
