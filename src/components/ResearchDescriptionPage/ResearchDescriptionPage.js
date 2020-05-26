import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import endpoints from "../endpoints";
import styled from 'styled-components';
import {Button, Form, Radio} from "antd";

const TitleStyle = styled.div`
    margin: 0 auto;
    
`;

const formItemLayout = {
    wrapperCol: {
        offset: 10,
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
            <div>{context.research.fullDesc}</div>
            <Form
                name="form"
                onFinish={onFinish}
                {...formItemLayout}
            >

                <Form.Item>
                    Sunteti de acord cu furnizarea datelor dumneavoastra?
                </Form.Item>

                <Form.Item
                    name="agreement"
                    rules={[{
                        required: true,
                        message: "Please select an option"
                    }]}
                >
                    <Radio.Group>
                        <Radio value="yes">DA</Radio>
                        <Radio value="no">NU</Radio>
                    </Radio.Group>

                </Form.Item>

                <Form.Item
                    wrapperCol={{offset: 10}}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDescriptionPage);