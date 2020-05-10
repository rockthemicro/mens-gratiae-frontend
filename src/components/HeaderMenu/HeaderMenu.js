import React from "react";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Menu} from "antd";
import 'antd/dist/antd.css';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const HeaderMenu = (props) => {
    const handleHome = () => {
        props.history.push("/");
    };

    const handleAbout = () => {
        props.history.push("/about");
    };

    const handleResearch = () => {
        props.history.push("/research");
    };

    const handleContact = () => {
        props.history.push("/contact");
    };

    return (
        <Menu
            theme="dark" mode='horizontal'
            defaultSelectedKeys={['home']}
            style={{height: '100%', float: 'left', fontSize: '20px'}}
        >
            <Menu.Item key="home" onClick={handleHome}>Home</Menu.Item>
            <Menu.Item key="about" onClick={handleAbout}>About</Menu.Item>
            <Menu.Item key="research" onClick={handleResearch}>Research</Menu.Item>
            <Menu.Item key="contact" onClick={handleContact}>Contact</Menu.Item>
        </Menu>
    );
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(HeaderMenu);