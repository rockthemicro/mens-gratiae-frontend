import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";
import {Button, Form, Input, List, Modal} from "antd";
import editQuestionVisibleAction from "../../actions/editQuestionVisibleAction";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";
import UpOutlined from "@ant-design/icons/lib/icons/UpOutlined";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import styled from "styled-components";

const mapStateToProps = state => ({
    editQuestionReducer: state.editQuestionReducer,
});

const mapDispatchToProps = dispatch => ({
    editQuestionVisible: () => dispatch(editQuestionVisibleAction()),
    editQuestionInvisible: () => dispatch(editQuestionInvisibleAction())
});

const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};

const ClickableStyle = styled.div`
    cursor: pointer;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
        color: blue
    }
`;

const EditTestForm = (props) => {
    const onFinish = (values) => {

    };

    const questions = [
        {
            title: 'Question1',
            question: 'Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question',
        },
        {
            title: 'Question2',
            question: 'Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question',
        },
        {
            title: 'Question3',
            question: 'Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question',
        },
    ];

    const handleAddQuestion = () => {
        props.editQuestionVisible();
    };

    return (
        <Form
            name="test_form"
            onFinish={onFinish}
            {...formItemLayout}
        >

            <Form.Item
                name="testName"
                label="Test Name"
                rules={[
                    {
                        required: true,
                        message: "Please Enter a Test Name",
                    }
                ]}
            >
                <Input.TextArea rows={1}/>
            </Form.Item>

            <Form.Item
                name="testDescription"
                label="Test Description"
                rules={[
                    {
                        required: true,
                        message: "Please Enter a Test Description",
                    }
                ]}
            >
                <Input.TextArea rows={4}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    span: 8,
                    offset: 8,
                }}
                style={{
                    margin: '50px 0 0',
                    fontSize: '20px',
                }}
            >
                Test Questions
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                }}
                name="add_question_button"
            >
                <Button type="default" onClick={handleAddQuestion}>
                    Add Question
                </Button>
            </Form.Item>

            <Modal
                title="Add Question"
                visible={props.editQuestionReducer.visible}
                onCancel={props.editQuestionInvisible}
                footer={null}
            >

            </Modal>

            <Form.Item
                wrapperCol={{
                    span: 8,
                    offset: 8,
                }}
            >
                <List
                    itemLayout='horizontal'
                    size='large'
                    dataSource={questions}

                    renderItem={item => (
                        <List.Item
                            style={{padding: '16px 0'}}
                            actions={[
                                <ClickableStyle>Edit</ClickableStyle>,
                                <ClickableStyle>Delete</ClickableStyle>,
                                <ClickableStyle><UpOutlined /></ClickableStyle>,
                                <ClickableStyle><DownOutlined /></ClickableStyle>,
                            ]}
                        >

                            <List.Item.Meta
                                title={item.title}
                                description={item.question}
                            />
                        </List.Item>
                    )}
                />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditTestForm);