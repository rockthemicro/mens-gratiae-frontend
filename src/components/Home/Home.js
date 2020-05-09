import React from 'react';
import {connect} from 'react-redux';
import simpleAction from '../../actions/simpleAction';

const mapStateToProps = state => ({
    simpleReducer: state.simpleReducer
});

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

const Home = (props) => {

    const action = (event) => {
        props.simpleAction();
    };

    return (
        <div>

            <button onClick={action}>blabla</button>
            <pre>
                {
                    JSON.stringify(props)
                }
            </pre>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
