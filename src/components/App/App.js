import React from 'react';
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

    const goToLogin = (event) => {
        props.history.push("/login");
    };

    return (
        <div className="App">

            <button onClick={action}>blabla</button>
            <button onClick={goToLogin}>login</button>
            <pre>
                {
                    JSON.stringify(props)
                }
            </pre>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
