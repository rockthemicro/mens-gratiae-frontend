import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Form, Input} from "antd";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";
import axios from "axios";
import endpoints from "../endpoints";

const mapStateToProps = state => ({
    editQuestionReducer: state.editQuestionReducer,
});

const mapDispatchToProps = dispatch => ({
    editQuestionInvisible: () => dispatch(editQuestionInvisibleAction())
});

const EditTestQuestionForm = (props) => {
    const [form] = Form.useForm();

    const initiateFormWithProps = () => {
        form.setFieldsValue({
            question: props.question.question,
        });
    };

    useEffect(() => {
        form.resetFields();

        initiateFormWithProps();
    }, [props.question]);

    const createQuestion = values => {
        const data = {
            testId: props.test.id,
            question: values.question,
        };

        axios.post(endpoints.CREATE_TEST_QUESTION, data)
            .then((response) => {
                if (response.data.status !== 'OK') {
                    alert('Something went wrong while creating question');
                }
            })
            .catch(() => {
                alert('Something went wrong while creating question')
            })
            .finally(() => {
                props.editQuestionInvisible();
                props.history.push("/editTest", {
                    test: {...props.test},
                    research: props.research
                });
            })

    };

    const updateQuestion = values => {
        const data = {
            testId: props.test.id,
            question: values.question,
            id: props.question.id
        };

        axios.put(endpoints.UPDATE_TEST_QUESTION, data)
            .then((response) => {
                if (response.data.status !== 'OK') {
                    alert('Something went wrong while updating question');
                }
            })
            .catch(() => {
                alert('Something went wrong while updating question');
            })
            .finally(() => {
                props.editQuestionInvisible();
                props.history.push("/editTest", {
                    test: {...props.test},
                    research: props.research
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
        form.resetFields();

        initiateFormWithProps();
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            name="edit_test_question_form"
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
(EditTestQuestionForm);