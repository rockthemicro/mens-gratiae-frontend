import React from "react";
import {connect} from "react-redux";
import 'antd/dist/antd.css';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    Button,
    Form,
    Radio,
    Select,
    Checkbox,
    Input
} from "antd";
import {QTYPE_MULTIPLE_CHOICE, QTYPE_RANGE, QTYPE_SINGLE_CHOICE, QTYPE_TEXT, QTYPE_YES_NO} from "../constants";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 8,
    },
};

const ResearchForm = () => {

    const defaultRequiredMessage = "Please select an answer";

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const data = [
        {
            type: "yes-no",
            question: "Va place pizza?",
            required: true,
            requiredMessage: "Please select an answer",
            yesText: "Da",
            noText:"Nu",
        },
        {
            type: "range",
            question: "Uneori cand sunt trist, ascult muzica",
            required: true,
            requiredMessage: "Va rugam, selectati un raspuns",
            range: 5,
            answers: {
                1: "Dezacord puternic",
                3: "Neutru",
                5: "Acord puternic",
            },
        },
        {
            type: "multipleChoice",
            question: "Imi place saaa",
            answers: [
                "The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles.",
                "B",
                "C",
                "D",
                "E",
                "F",
            ],
        },
        {
            type: "text",
            question: "Ce parere aveti de Tudor Gheorghe?",
        },
        {
            type: "singleChoice",
            question: "Cand ati fost ultima oara la un concert?",
            required: true,
            answers: [
                "1 an",
                "2 ani",
                "3 ani",
                "4 ani",
            ],
        }

    ];

    const getSelectOptions = (range, answers) => {
        let options = [];

        for (let i = 1; i <= range; i++) {
            if (answers[i] !== undefined) {
                let option = (
                    <Select.Option value={i.toString()}>{i.toString() + " " + answers[i]}</Select.Option>
                );
                options.push(option);
            } else {
                let option = (
                    <Select.Option value={i.toString()}>{i.toString()}</Select.Option>
                );
                options.push(option);
            }
        }
        return options;
    };

    const getCheckboxValues = (answers) => {
        let values = [];
        let size = answers.length;
        let br = (<br/>);

        for (let i = 0; i < size; i++) {
            let value = (
                <Checkbox value={i.toString()} style={{ lineHeight: '32px' }}>
                    {answers[i]}
                </Checkbox>
            );
            values.push(value);
            values.push(br);
        }

        return values;
    };

    const getRadioValues = (answers) => {
        let values = [];
        let size = answers.length;
        let br = (<br/>);

        for (let i = 0; i < size; i++) {
            let value = (
                <Radio value={i.toString()}>
                    {answers[i]}
                </Radio>
            );
            values.push(value);
            values.push(br);
        }

        return values;
    };

    const getRule = (required, requiredMessage) => {
        return {
            required: (required !== undefined && required === true),
            message: (requiredMessage !== undefined
                ? requiredMessage : defaultRequiredMessage)
        };
    };

    return (
        <div>
            <Form
                name="research_form"
                {...formItemLayout}
                onFinish={onFinish}
            >
                {data.map((element, index) =>
                    {
                        if (element.type === QTYPE_YES_NO) {
                            return (
                                <Form.Item
                                    name={index.toString()}
                                    label={element.question}
                                    rules={[
                                        getRule(element.required, element.requiredMessage)
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="yes">{element.yesText}</Radio>
                                        <Radio value="no">{element.noText}</Radio>
                                    </Radio.Group>

                                </Form.Item>
                            );

                        } else if (element.type === QTYPE_RANGE) {
                            return (
                                <Form.Item
                                    name={index.toString()}
                                    label={element.question}
                                    rules={[
                                        getRule(element.required, element.requiredMessage)
                                    ]}
                                    hasFeedback
                                    wrapperCol={{
                                        span: 3,
                                    }}
                                >
                                    <Select>
                                        {getSelectOptions(element.range, element.answers)}
                                    </Select>

                                </Form.Item>
                            );
                        } else if (element.type === QTYPE_MULTIPLE_CHOICE) {
                            return (
                                <Form.Item
                                    name={index.toString()}
                                    label={element.question}
                                    rules={[
                                        getRule(element.required, element.requiredMessage)
                                    ]}
                                >
                                    <Checkbox.Group>
                                        {getCheckboxValues(element.answers)}
                                    </Checkbox.Group>
                                </Form.Item>
                            );
                        } else if (element.type === QTYPE_TEXT) {
                            return (
                                <Form.Item
                                    name={index.toString()}
                                    label={element.question}
                                    rules={[
                                        getRule(element.required, element.requiredMessage)
                                    ]}
                                >
                                    <Input.TextArea rows={4}/>
                                </Form.Item>
                            );
                        } else if (element.type === QTYPE_SINGLE_CHOICE) {
                            return (
                                <Form.Item
                                    name={index.toString()}
                                    label={element.question}
                                    rules={[
                                        getRule(element.required, element.requiredMessage)
                                    ]}
                                >
                                    <Radio.Group>
                                        {getRadioValues(element.answers)}
                                    </Radio.Group>
                                </Form.Item>
                            );
                        } else {
                            return (
                                <div></div>
                            );
                        }
                    }
                )}

                <Form.Item
                    wrapperCol={{
                        span: 12,
                        offset: 6,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(ResearchForm);