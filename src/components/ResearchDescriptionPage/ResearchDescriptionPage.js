import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import endpoints from "../endpoints";
import styled from 'styled-components';
import {Button, Form, Radio} from "antd";
import {
    EN,
    EN_AGREE_SHARE_INFO, EN_NO,
    EN_YES,
    IT,
    IT_AGREE_SHARE_INFO, IT_NO,
    IT_YES,
    RO,
    RO_AGREE_SHARE_INFO, RO_NO,
    RO_YES
} from "../constants";
import {useMediaQuery} from "react-responsive";

const TitleStyle = styled.div`
    text-align: center;
    font-family: Arial;
    font-size: 32px;
    margin-bottom: 50px;
`;

const formItemLayout = {
    wrapperCol: {
        offset: 10,
        span: 12
    }
};

const formItemMobileLayout = {
    wrapperCol: {
        span: 12
    }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const ResearchDescriptionPage = (props) => {

    const [context, setContext] = useState({
        research: {},
        questions: [],
        tests: [],
        testsQuestions: {}
    });

    const testsQuestions = {};

    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    });

    const actualFormItemLayout = isTabletOrMobileDevice ? formItemMobileLayout : formItemLayout;

    useEffect(() => {
        axios.get(endpoints.GET_RESEARCH + "/" + props.match.params.researchId)
            .then((response) => {
                if (response.data.status === 'OK') {
                    setContext({
                        research: response.data.research,
                        questions: response.data.genericResearchQuestions,
                        tests: response.data.tests,
                        testsQuestions: {}
                    });
                } else {
                    alert('Sorry, the research could not be retrieved');
                }
            })
            .catch(() => {
                alert('Sorry, the research could not be retrieved');
            });
    }, []);

    useEffect(() => {
        if (context.tests.length > 0) {
            for (let test of context.tests) {
                axios.get(endpoints.GET_TEST + "/" + test.id)
                    .then((response) => {
                        if (response.data.status === 'OK') {
                            testsQuestions[test.id] = response.data.rangeTestQuestions;

                            if (Object.keys(testsQuestions).length === context.tests.length) {
                                setContext({
                                    ...context,
                                    testsQuestions: testsQuestions
                                });
                            }

                        } else {
                            alert('Sorry, the questions could not be retrieved');
                        }
                    })
                    .catch(() => {
                        alert('Sorry, the questions could not be retrieved');
                    })
            }
        }
    }, [context.tests]);

    function bla() {
        debugger;
    }

    const onFinish = values => {
        if (values.agreement === 'yes') {
            props.history.push("/fillResearch", {context: context});
        } else {
            alert('In order to proceed, you have to agree to share this information');
        }
    };

    return (
        <div>
            <TitleStyle onClick={bla}>{context.research.title}</TitleStyle>
            <div style={{fontFamily: "Verdana", fontSize: 20}} dangerouslySetInnerHTML={{__html: context.research.fullDesc}}/>
            <Form
                name="form"
                onFinish={onFinish}
                {...actualFormItemLayout}
            >

                <Form.Item>
                    {RO === context.research.language && RO_AGREE_SHARE_INFO}
                    {IT === context.research.language && IT_AGREE_SHARE_INFO}
                    {EN === context.research.language && EN_AGREE_SHARE_INFO}
                </Form.Item>

                <Form.Item
                    name="agreement"
                    rules={[{
                        required: true,
                        message: "Please select an option"
                    }]}
                >
                    <Radio.Group>
                        <Radio value="yes">
                            {RO === context.research.language && RO_YES}
                            {IT === context.research.language && IT_YES}
                            {EN === context.research.language && EN_YES}
                        </Radio>

                        <Radio value="no">
                            {RO === context.research.language && RO_NO}
                            {IT === context.research.language && IT_NO}
                            {EN === context.research.language && EN_NO}
                        </Radio>
                    </Radio.Group>

                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDescriptionPage);