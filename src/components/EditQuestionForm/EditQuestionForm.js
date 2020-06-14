import React, {useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, Select} from "antd";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    QTYPE_MULTIPLE_CHOICE, QTYPE_NUMBER,
    QTYPE_RANGE,
    QTYPE_SINGLE_CHOICE,
    QTYPE_TEXT,
    QTYPE_YES_NO
} from "../constants";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";
import endpoints from '../endpoints';
import axios from 'axios';

const mapStateToProps = state => ({
    editQuestionReducer: state.editQuestionReducer,
});

const mapDispatchToProps = dispatch => ({
    editQuestionInvisible: () => dispatch(editQuestionInvisibleAction())
});

const EditQuestionForm = (props) => {

    const [form] = Form.useForm();

    const [extraFields, setExtraFields] = useState([]);

    const initiateFormWithProps = () => {
        form.setFieldsValue({
            question: props.question.question,
            type: props.question.type
        });

        let newExtraFields = [];
        let answerFields = {};

        if (
            !isNaN(props.question.numberOfOptions) &&
            props.question.numberOfOptions !== 0
        ) {
            newExtraFields.push({
                fieldType: "quantitySelector",
                questionType: props.question.type
            });

            for (let i = 0; i < props.question.numberOfOptions; i++) {
                newExtraFields.push({
                    fieldType: "answerField",
                    answerName: "answerField" + i.toString(),
                    answerIndex: i,
                });

                answerFields["answerField" + i.toString()] = props.question.options[i];
            }
        }

        /*
        generate the (empty) fields representing the question's number of
        possible answers and the answer fields
         */
        setExtraFields(newExtraFields);

        /* fill the fields generated above with setExtraFields */
        form.setFieldsValue({
            quantitySelector: props.question.numberOfOptions,
            ...answerFields
        });
    };

    useEffect(() => {
        setExtraFields([]);
        form.resetFields();

        initiateFormWithProps();
    }, [props.question]);

    const calculateOptions = values => {
        let options = [];
        for (let i = 0; i < values.quantitySelector; i++) {
            options.push(values['answerField'+i]);
        }

        return options;
    };

    const createQuestion = values => {
        const data = {
            question: values.question,
            type: values.type,
            researchId: props.research.id,
            numberOfOptions: values.quantitySelector,
            options: calculateOptions(values)
        };

        axios.post(endpoints.CREATE_GENERIC_RESEARCH_QUESTION, data)
            .then((response) => {
                if (response.data.status !== 'OK') {
                    alert('Something went wrong while creating generic question');
                }
            })
            .catch(() => {
                alert('Something went wrong while creating generic question');
            })
            .finally(() => {
                props.editQuestionInvisible();
                props.history.push("/editResearch", {
                    research: {...props.research}
                });
            })
    };

    const updateQuestion = values => {
        const data = {
            id: props.question.id,
            question: values.question,
            type: values.type,
            researchId: props.research.id,
            numberOfOptions: values.quantitySelector,
            options: calculateOptions(values)
        };

        axios.put(endpoints.UPDATE_GENERIC_RESEARCH_QUESTION, data)
            .then((response) => {
                if (response.data.status !== 'OK') {
                    alert('Something went wrong while updating generic question');
                }
            })
            .catch(() => {
                alert('Something went wrong while updating generic question');
            })
            .finally(() => {
                props.editQuestionInvisible();
                props.history.push("/editResearch", {
                    research: {...props.research}
                });
            })
    };

    const onFinish = (values) => {
        if (!props.question.id) {
            createQuestion(values);
        } else {
            updateQuestion(values);
        }
    };

    const onReset = () => {
        setExtraFields([]);
        form.resetFields();

        initiateFormWithProps();
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            name="edit_question_form"
            onValuesChange={(changedValues, allValues) => {
                if (changedValues.hasOwnProperty("type")) {
                    let newType = changedValues["type"];

                    if (newType === QTYPE_RANGE ||
                        newType === QTYPE_SINGLE_CHOICE ||
                        newType === QTYPE_MULTIPLE_CHOICE) {

                        setExtraFields([
                            {
                                fieldType: "quantitySelector",
                                questionType: newType,
                            },
                        ]);
                    } else {
                        setExtraFields([]);
                    }

                } else if (changedValues.hasOwnProperty("quantitySelector")) {
                    let quantity = changedValues["quantitySelector"];

                    if (isNaN(quantity) === false) {
                        let answerFields = [];
                        quantity = parseInt(quantity);

                        for (let i = 0; i < quantity; i++) {
                            answerFields.push({
                                fieldType: "answerField",
                                answerName: "answerField" + i.toString(),
                                answerIndex: i,
                            });
                        }

                        let newExtraFields = [extraFields[0]];
                        newExtraFields.push(...answerFields);

                        setExtraFields(newExtraFields);
                    }
                }
            }}
        >

            <Form.Item>
                Write A Question
            </Form.Item>

            <Form.Item
                name="question"
                rules={[
                    {
                        required: true,
                        message: "Please write a question",
                    }
                ]}
            >
                <Input.TextArea rows={4}/>
            </Form.Item>

            <Form.Item>
                Select Question Type
            </Form.Item>

            <Form.Item
                name="type"
                rules={[
                    {
                        required: true,
                        message: "Please choose a question type",
                    }
                ]}
            >
                <Select allowClear>
                    <Select.Option value={QTYPE_YES_NO}>{QTYPE_YES_NO}</Select.Option>
                    <Select.Option value={QTYPE_RANGE}>{QTYPE_RANGE}</Select.Option>
                    <Select.Option value={QTYPE_SINGLE_CHOICE}>{QTYPE_SINGLE_CHOICE}</Select.Option>
                    <Select.Option value={QTYPE_MULTIPLE_CHOICE}>{QTYPE_MULTIPLE_CHOICE}</Select.Option>
                    <Select.Option value={QTYPE_TEXT}>{QTYPE_TEXT}</Select.Option>
                    <Select.Option value={QTYPE_NUMBER}>{QTYPE_NUMBER}</Select.Option>
                </Select>

            </Form.Item>

            {extraFields.map((extraField, index) => {
                if (extraField.fieldType === "quantitySelector") {
                    return (
                        <Form.Item
                            name="quantitySelector"
                            rules={[
                                {
                                    required: true,
                                    message: "Please add how many options you want to have",
                                }
                            ]}
                            key={index.toString()}
                        >
                            <InputNumber
                                placeholder={"Number of options"}
                                min={0}
                                style={{width: "100%"}}
                            />
                        </Form.Item>
                    );

                } else if (extraField.fieldType === "answerField") {
                    return (
                        <Form.Item
                            name={extraField.answerName}
                            rules={[
                                {
                                    required: true,
                                    message: "Please fill this field",
                                }
                            ]}
                            key={index.toString()}
                        >
                            <Input.TextArea
                                rows={1}
                                placeholder={"Option number "
                                + (extraField.answerIndex + 1).toString()}
                            />
                        </Form.Item>
                    );
                } else {
                    return (<div></div>);
                }
            })}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

                <Button style={{margin: '0 0 0 20px'}} htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(EditQuestionForm);