import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Form, Input} from "antd";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";

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

    const onFinish = (values) => {
        props.editQuestionInvisible();
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