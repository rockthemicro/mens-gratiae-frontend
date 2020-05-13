import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const EditTestForm = (props) => {
    return (<div>sal</div>);

};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditTestForm);