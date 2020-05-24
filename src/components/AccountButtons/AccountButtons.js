
import React from 'react';
import {connect} from 'react-redux';
import logOutStatusAction from "../../actions/logOutStatusAction";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const mapStateToProps = state => ({
    logInStatusReducer: state.logInStatusReducer
});

const mapDispatchToProps = dispatch => ({
    logOutStatusAction: () => dispatch(logOutStatusAction())
});

const AccountButtons = (props) => {

    const handleLogin = () => {
        props.history.push("/login");
    };

    const handleRegister = () => {
        alert("register");
    };

    const handleLogout = () => {
        props.logOutStatusAction();
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
                        hidden={true}
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

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AccountButtons);
