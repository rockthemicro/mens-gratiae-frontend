import React, {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    QTYPE_MULTIPLE_CHOICE,
    QTYPE_RANGE,
    QTYPE_SINGLE_CHOICE,
    QTYPE_TEXT,
    QTYPE_YES_NO
} from "../constants";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";

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

        let extraFields = [];
        let answerFields = {};

        if (
            !isNaN(props.question.numberOfOptions) &&
            props.question.numberOfOptions !== 0
        ) {
            extraFields.push({
                fieldType: "quantitySelector",
                questionType: props.question.type
            });

            for (let i = 0; i < props.question.numberOfOptions; i++) {
                extraFields.push({
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
        setExtraFields(extraFields);

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


    const onFinish = (values) => {
        props.editQuestionInvisible();
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
                        newType === QTYPE_SINGLE_CHOICE  ||
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
                            <Input.TextArea
                                rows={1}
                                placeholder={"Number of options"}
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