
import React from 'react';
import {connect} from 'react-redux';
import logInStatusAction from "../../actions/logInStatusAction";
import logOutStatusAction from "../../actions/logOutStatusAction";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const mapStateToProps = state => ({
    logInStatusReducer: state.logInStatusReducer
});

const mapDispatchToProps = dispatch => ({
    logInStatusAction: () => dispatch(logInStatusAction),
    logOutStatusAction: () => dispatch(logOutStatusAction)
});

const AccountButtons = (props) => {

    const handleLogin = () => {
        props.history.push("/login");
    };

    const handleRegister = () => {
        alert("register");
    };

    const handleLogout = () => {
        alert("logout");
    };

    return (
        <div style={{float: 'right',width:'150px', fontSize: '17px'}}>
            { props.logInStatusReducer.loggedIn === false &&
                <div>
                    <div
                        style={{cursor: 'pointer', width: '50%', float: "left", color: "white"}}
                        onClick={handleLogin}
                    >
                        Login
                    </div>

                    <div
                        style={{cursor: 'pointer', width:'50%',float:"right",color:"white"}}
                        onClick={handleRegister}
                    >
                        Register
                    </div>
                </div>
            }
            { props.logInStatusReducer.loggedIn === true &&
                <div
                    style={{cursor: 'pointer', width: '50%', float: "right", color: "white"}}
                    onClick={handleLogout}
                >
                    Log Out
                </div>
            }
        </div>
    );
};

AccountButtons.propTypes = {
    logInStatusReducer: PropTypes.object.isRequired
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AccountButtons);
