import React from "react";
import {connect} from "react-redux";
import 'antd/dist/antd.css';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const ResearchForm = () => {
    return (
        <div>

        </div>
    );
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(ResearchForm);