import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import 'antd/dist/antd.css';
import {Button, Form, Input, List, Modal, Select} from "antd";
import styled from "styled-components";
import UpOutlined from "@ant-design/icons/lib/icons/UpOutlined";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import EditQuestionForm from "../EditQuestionForm";
import editQuestionVisibleAction from "../../actions/editQuestionVisibleAction";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";
import formExistsAction from "../../actions/formExistsAction";
import endpoints from "../endpoints";
import axios from 'axios';
import testFormExistsAction from "../../actions/testFormExistsAction";

const mapStateToProps = state => ({
    editQuestionReducer: state.editQuestionReducer,
    editResearchFormReducer: state.editResearchFormReducer,
});

const mapDispatchToProps = dispatch => ({
    editQuestionVisible: () => dispatch(editQuestionVisibleAction()),
    editQuestionInvisible: () => dispatch(editQuestionInvisibleAction()),
    formExistsAction: (form_exists) => dispatch(formExistsAction(form_exists)),
    testFormExistsAction: (form_exists) => dispatch(testFormExistsAction(form_exists)),
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

    const research = props.location.state.research;
    const [form] = Form.useForm();

    const createResearch = (values) => {
        const postData = {
            fullDesc: values.full_desc,
            title: values.title,
            shortDesc: values.short_desc,
            language: values.language
        };
        axios.post(endpoints.CREATE_RESEARCH, postData)
            .then((response) => {
                if (response.data.status === 'OK') {
                    props.history.push("/editResearch", {
                        research: {
                            id: response.data.researchId,
                            fullDesc: values.full_desc,
                            shortDesc: values.short_desc,
                            title: values.title,
                            language: values.language
                        }
                    });
                    props.formExistsAction(true);
                } else {
                    alert('Something went wrong while creating research')
                }
            })
            .catch(() => {
                alert('Something went wrong while creating research');
            })
    };

    const updateResearch = (values) => {
        const data = {
            fullDesc: values.full_desc,
            title: values.title,
            shortDesc: values.short_desc,
            language: values.language,
            id: research.id
        };
        axios.put(endpoints.UPDATE_RESEARCH, data)
            .then((response) => {
                if (response.data.status === 'OK') {
                    props.history.push("/research");
                } else {
                    alert('Something went wrong while updating research')
                }
            })
            .catch(() => {
                alert('Something went wrong while updating research');
            })
    };

    const onFinish = (values) => {
        if (props.editResearchFormReducer.form_exists) {
            updateResearch(values);
        } else {
            createResearch(values);
        }
    };

    const initialGenericQuestions = [
        {
            question: 'Placeholder question',
        },

    ];

    const [genericQuestions, setGenericQuestions] = useState(initialGenericQuestions);

    const initialTests = [
        {
            name: 'test1',
            description: 'Placeholder test',
        },
    ];

    const [tests, setTests] = useState(initialTests);

    const [editedQuestion, setEditedQuestion] = useState({});

    const handleAddQuestion = () => {
        setEditedQuestion({});
        props.editQuestionVisible();
    };

    const handleEditQuestion = (item) => () => {
        setEditedQuestion(item);
        props.editQuestionVisible();
    };

    const handleAddTest = () => {
        props.testFormExistsAction(false);
        props.history.push("/editTest", {
            test: undefined,
            research: research
        });
    };

    const handleEditTest = (item) => () => {
        props.testFormExistsAction(true);
        props.history.push("/editTest", {
            test: item,
            research: research
        });
    };

    /* populate research data */
    useEffect(() => {
        const research = props.location.state.research;

        if (research !== undefined) {
            form.setFieldsValue({
                title: research.title,
                short_desc: research.shortDesc,
                full_desc: research.fullDesc,
                language: research.language,
            });
        }
    }, [props.location.state.research]);

    /* populate research generic questions and tests */
    useEffect(() => {
        const research = props.location.state.research;

        if (research !== undefined) {
            axios.get(endpoints.GET_RESEARCH + '/' + research.id.toString())
                .then(response => {
                    if (response.data.status === 'OK') {
                        setGenericQuestions(response.data.genericResearchQuestions);
                    } else {
                        alert('Something went wrong while loading research questions');
                    }
                })
                .catch(err => {
                    alert('Something went wrong while loading research questions');
                });

            axios.get(endpoints.GET_TESTS + '/' + research.id.toString())
                .then(response => {
                    if (response.data.status === 'OK') {
                        setTests(response.data.tests)
                    } else {
                        alert('Something went wrong while loading tests');
                    }
                })
                .catch(err => {
                    alert('Something went wrong while loading tests');
                });
        }

    }, [
        props.location.state.research
    ]);

    return (
        <div>
            <Form
                form={form}
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
                        <Select.Option value="ENG">English</Select.Option>
                        <Select.Option value="ITA">Italian</Select.Option>
                        <Select.Option value="ROM">Romanian</Select.Option>
                    </Select>

                </Form.Item>

                <div
                    hidden={!props.editResearchFormReducer.form_exists}
                >

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
                        <EditQuestionForm question={editedQuestion} research={research}/>
                    </Modal>

                    <Form.Item
                        name="question_list"
                        wrapperCol={{
                            span: 8,
                            offset: 8,
                        }}
                    >
                        <List
                            itemLayout='horizontal'
                            size='large'
                            dataSource={genericQuestions}

                            renderItem={(item, id) => (
                                <List.Item
                                    style={{padding: '16px 0'}}
                                    actions={[
                                        <ClickableStyle onClick={handleEditQuestion(item)}>Edit</ClickableStyle>,
                                        <ClickableStyle>Delete</ClickableStyle>,
                                        <ClickableStyle><UpOutlined/></ClickableStyle>,
                                        <ClickableStyle><DownOutlined/></ClickableStyle>,
                                    ]}
                                >

                                    <List.Item.Meta
                                        title={'Question' + (id + 1).toString()}
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
                        name="test_list"
                        wrapperCol={{
                            span: 8,
                            offset: 8,
                        }}
                    >
                        <List
                            itemLayout='horizontal'
                            size='large'
                            dataSource={tests}

                            renderItem={item => (
                                <List.Item
                                    style={{padding: '16px 0'}}
                                    actions={[
                                        <ClickableStyle onClick={handleEditTest(item)}>
                                            Edit
                                        </ClickableStyle>,
                                        <ClickableStyle>Delete</ClickableStyle>,
                                        <ClickableStyle><UpOutlined/></ClickableStyle>,
                                        <ClickableStyle><DownOutlined/></ClickableStyle>,
                                    ]}
                                >

                                    <List.Item.Meta
                                        title={item.name}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </Form.Item>

                </div>

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
