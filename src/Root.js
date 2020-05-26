import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import {Layout} from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import AccountButtons from "./components/AccountButtons";
import HeaderMenu from "./components/HeaderMenu";
import About from "./components/About";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Home from "./components/Home";
import ResearchForm from "./components/ResearchForm";
import EditResearchForm from "./components/EditResearchForm";
import EditTestForm from "./components/EditTestForm";
import TestForm from "./components/TestForm";
import ResearchDescriptionPage from "./components/ResearchDescriptionPage";

const {Header, Content, Footer} = Layout;

const ContentDiv = styled.div`
    background: #fff;
    padding: 24px;
    height: 100%;
    overflow: auto;
    position: relative;
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
        <Router>
            <Layout className="layout" style={{height: "100vh"}}>
                <CustomHeader>
                    <Header>
                        <Logo>
                            <img src={require('./resources/head.png')} alt="" style={{height: "100%", width: "100%"}}/>
                        </Logo>

                        <HeaderMenu/>

                        <AccountButtons/>
                    </Header>
                </CustomHeader>

                <Content style={{padding: '3% 15% 0%'}}>
                    <ContentDiv>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/research" component={Research}/>
                        <Route exact path="/contact" component={Contact}/>

                        <Route exact path="/login" component={Login}/>

                        <Route exact path="/editResearch" component={EditResearchForm}/>
                        <Route exact path="/editTest" component={EditTestForm}/>

                        <Route exact path="/fillResearch" component={ResearchForm}/>
                        <Route exact path="/fillTest" component={TestForm}/>
                        <Route exact path="/researchDescription/:researchId" component={ResearchDescriptionPage}/>
                    </ContentDiv>
                </Content>

                <Footer style={{textAlign: "center"}}>
                    email: cristina.ciuluvica@gmail.com
                </Footer>
            </Layout>
        </Router>
    </div>
);

export default Root;