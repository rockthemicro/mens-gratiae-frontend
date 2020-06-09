import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import 'antd/dist/antd.css';
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
import {
    EN, EN_NO,
    EN_REQUIRED_MESSAGE, EN_YES, IT, IT_NO, IT_REQUIRED_MESSAGE, IT_YES,
    QTYPE_MULTIPLE_CHOICE,
    QTYPE_RANGE,
    QTYPE_SINGLE_CHOICE,
    QTYPE_TEXT,
    QTYPE_YES_NO, RO, RO_NO, RO_REQUIRED_MESSAGE, RO_YES
} from "../constants";
import {useMediaQuery} from "react-responsive";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const formItemLayout = {
    wrapperCol: {
        span: 8,
        offset: 10,
    },
};


const formItemMobileLayout = {
    wrapperCol: {
        span: 8,
    },
};

const ResearchForm = (props) => {

    const defaultRequiredMessage = "Please select an answer";

    const [questions, setQuestions] = useState([]);

    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    });

    const actualFormItemLayout = isTabletOrMobileDevice ? formItemMobileLayout : formItemLayout;

    const translate = language => {
        if (language === EN) {
            return {
                requiredMessage: EN_REQUIRED_MESSAGE,
                yesText: EN_YES,
                noText: EN_NO
            }
        } else if (language === RO) {
            return {
                requiredMessage: RO_REQUIRED_MESSAGE,
                yesText: RO_YES,
                noText: RO_NO
            }
        } else if (language === IT) {
            return {
                requiredMessage: IT_REQUIRED_MESSAGE,
                yesText: IT_YES,
                noText: IT_NO
            }
        }
    };

    useEffect(() => {
        if (props.location.state.context !== undefined) {

            if (props.location.state.context.questions.length === 0) {
                return onFinish({});
            }

            const translations = translate(props.location.state.context.research.language);
            const newQuestions = props.location.state.context.questions.map(question => {
                return {
                    ...question,
                    required: true,
                    ...translations
                }
            });
            setQuestions(newQuestions);
        }
    }, [props.location.state.context]);


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
                <Checkbox value={i.toString()} style={{lineHeight: '32px'}}>
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

    const onFinish = (values) => {
        const answers = {};
        for (const questionId of Object.keys(values)) {
            answers[questionId] = Array.isArray(values[questionId]) ? values[questionId] : [values[questionId]];
        }

        const submission = {
            researchId: props.location.state.context.research.id,
            genericResearchQuestionAnswers: answers,
            rangeTestQuestionAnswers: {}
        };

        let newContext = {
            ...props.location.state.context,
            submission: submission,
            selectedTest: 0
        };

        if (isTabletOrMobileDevice) {
            props.history.push("/fillMobileTest", {
                context: newContext
            });
        } else {
            props.history.push("/fillTest", {
                context: newContext
            });
        }
    };

    return (
        <div>
            <Form
                name="research_form"
                {...actualFormItemLayout}
                onFinish={onFinish}
            >
                {questions.map((element) => {
                        if (element.type === QTYPE_YES_NO) {
                            return (
                                <div>
                                    <Form.Item>
                                        {element.question}
                                    </Form.Item>

                                    <Form.Item
                                        name={element.id}
                                        rules={[
                                            getRule(element.required, element.requiredMessage)
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value="yes">{element.yesText}</Radio>
                                            <Radio value="no">{element.noText}</Radio>
                                        </Radio.Group>

                                    </Form.Item>
                                </div>
                            );

                        } else if (element.type === QTYPE_RANGE) {
                            return (
                                <div>
                                    <Form.Item>
                                        {element.question}
                                    </Form.Item>

                                    <Form.Item
                                        name={element.id}
                                        rules={[
                                            getRule(element.required, element.requiredMessage)
                                        ]}
                                        hasFeedback
                                        wrapperCol={{
                                            span: 3,
                                        }}
                                    >
                                        <Select>
                                            {getSelectOptions(element.numberOfOptions, element.options)}
                                        </Select>

                                    </Form.Item>
                                </div>
                            );
                        } else if (element.type === QTYPE_MULTIPLE_CHOICE) {
                            return (
                                <div>
                                    <Form.Item>
                                        {element.question}
                                    </Form.Item>

                                    <Form.Item
                                        name={element.id}
                                        rules={[
                                            getRule(element.required, element.requiredMessage)
                                        ]}
                                    >
                                        <Checkbox.Group>
                                            {getCheckboxValues(element.options)}
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            );
                        } else if (element.type === QTYPE_TEXT) {
                            return (
                                <div>
                                    <Form.Item>
                                        {element.question}
                                    </Form.Item>

                                    <Form.Item
                                        name={element.id}
                                        rules={[
                                            getRule(element.required, element.requiredMessage)
                                        ]}
                                    >
                                        <Input.TextArea rows={4}/>
                                    </Form.Item>
                                </div>
                            );
                        } else if (element.type === QTYPE_SINGLE_CHOICE) {
                            return (
                                <div>
                                    <Form.Item>
                                        {element.question}
                                    </Form.Item>

                                    <Form.Item
                                        name={element.id}
                                        rules={[
                                            getRule(element.required, element.requiredMessage)
                                        ]}
                                    >
                                        <Radio.Group>
                                            {getRadioValues(element.options)}
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            );
                        } else {
                            return (
                                <div></div>
                            );
                        }
                    }
                )}

                <Form.Item
                    {...actualFormItemLayout}
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