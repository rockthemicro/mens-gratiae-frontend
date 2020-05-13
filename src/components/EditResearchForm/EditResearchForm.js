import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React from "react";
import 'antd/dist/antd.css';
import {Button, Form, Input, List, Modal, Select} from "antd";
import styled from "styled-components";
import UpOutlined from "@ant-design/icons/lib/icons/UpOutlined";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import EditQuestionForm from "../EditQuestionForm";
import editQuestionVisibleAction from "../../actions/editQuestionVisibleAction";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";
import {QTYPE_RANGE, QTYPE_SINGLE_CHOICE, QTYPE_YES_NO} from "../constants";

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

const EditResearchForm = (props) => {

    const onFinish = (values) => {

    };

    const detailsQuestions = [
        {
            title: 'Question1',
            question: 'Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question',
            type: QTYPE_RANGE,
        },
        {
            title: 'Question2',
            question: 'Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question',
            type: QTYPE_YES_NO,
        },
        {
            title: 'Question3',
            question: 'Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question Description of first question',
            type: QTYPE_SINGLE_CHOICE,
        },
    ];

    const handleAddQuestion = () => {
        props.editQuestionVisible();
    };

    const handleAddTest = () => {
        props.history.push("/editTest");
    };

    return (
        <div>
            <Form
                name="research_form"
                {...formItemLayout}
                onFinish={onFinish}
            >

                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a title",
                        }
                    ]}
                >
                    <Input.TextArea rows={1}/>
                </Form.Item>

                <Form.Item
                    name="short_desc"
                    label="Short Description"
                >
                    <Input.TextArea rows={2}/>
                </Form.Item>

                <Form.Item
                    name="full_desc"
                    label="Full Description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a description",
                        }
                    ]}
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>

                <Form.Item
                    name="language"
                    label="Language"
                    rules={[
                        {
                            required: true,
                            message: "Please choose a language",
                        }
                    ]}
                    hasFeedback
                    wrapperCol={{
                        span: 3,
                    }}
                >
                    <Select>
                        <Select.Option value="eng">English</Select.Option>
                        <Select.Option value="ita">Italian</Select.Option>
                        <Select.Option value="rom">Romanian</Select.Option>
                    </Select>

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
                    Questions for finding out more details about who will participate in the research
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
                    <EditQuestionForm/>
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
                        dataSource={detailsQuestions}

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
                                Type: {item.type}
                            </List.Item>
                        )}
                    />
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
                    Tests to be included in this research
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                    }}
                    name="add_test_button"
                >
                    <Button type="default" onClick={handleAddTest}>
                        Add Test
                    </Button>
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
        </div>
    );
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditResearchForm);
