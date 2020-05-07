import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

const ContentDiv = styled.div`
    background: #fff;
    padding: 24px;
    //min-height: 280px;
`;

const Logo = styled.div`
    width: 90px;
    height: 60px;
    margin: 0 50px 0 0;
    float: left;
`;

const CustomHeader = styled.div`
    box-shadow: 0 2px 15px 0 rgba(0,0,0,1);
    z-index: 10;
`;

const Root = () => (
    <div>
        <Layout className="layout" style={{height: "100vh"}}>
            <CustomHeader>
                <Header>
                    <Logo>
                        <img src={require('./resources/head.png')} alt="" style={{ height: "100%", width: "100%" }}/>
                    </Logo>
                    <Menu
                        theme="dark" mode='horizontal'
                        defaultSelectedKeys={['home']}
                        style={{height: '100%', float: 'left', fontSize: '20px'}}
                    >
                        <Menu.Item key="home">Home</Menu.Item>
                        <Menu.Item key="about">About</Menu.Item>
                        <Menu.Item key="tests">Tests</Menu.Item>
                        <Menu.Item key="contact">Contact</Menu.Item>
                    </Menu>

                    <div style={{float: 'right',width:'150px', fontSize: '17px'}}>
                        <div style={{width:'50%',float:"left",color:"white"}}>Login</div>
                        <div style={{width:'50%',float:"right",color:"white"}}>Register</div>
                    </div>
                </Header>
            </CustomHeader>

            <Content style={{padding: '50px 50px 0px'}}>
                <ContentDiv>
                    <Router>
                        <Route exact path="/" component={App}/>
                        <Route exact path="/login" component={Login}/>
                    </Router>
                </ContentDiv>
            </Content>

            <Footer style={{textAlign: "center"}}>
                email: cristina.ciuluvica@gmail.com
            </Footer>
        </Layout>
    </div>
);

export default Root;