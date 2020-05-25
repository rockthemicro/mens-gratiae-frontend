import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {Button, Form, Input, List, Modal} from "antd";
import editQuestionVisibleAction from "../../actions/editQuestionVisibleAction";
import editQuestionInvisibleAction from "../../actions/editQuestionInvisibleAction";
import UpOutlined from "@ant-design/icons/lib/icons/UpOutlined";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import styled from "styled-components";
import EditTestQuestionForm from "../EditTestQuestionForm";
import testFormExistsAction from "../../actions/testFormExistsAction";
import axios from 'axios';
import endpoints from "../endpoints";

const mapStateToProps = state => ({
    editQuestionReducer: state.editQuestionReducer,
    editTestFormReducer: state.editTestFormReducer,
});

const mapDispatchToProps = dispatch => ({
    editQuestionVisible: () => dispatch(editQuestionVisibleAction()),
    editQuestionInvisible: () => dispatch(editQuestionInvisibleAction()),
    testFormExistsAction: (test_form_exists) => dispatch(testFormExistsAction(test_form_exists)),
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

    const testProp = props.location.state.test;
    const researchProp = props.location.state.research;

    const divRef = React.useRef();
    const [form] = Form.useForm();
    const [extraFields, setExtraFields] = useState([]);

    const initialQuestions = [
        {
            question: 'Placeholder of question Body',
        },
    ];

    const [questions, setQuestions] = useState(initialQuestions);

    const calculateOptions = values => {
        let options = [];
        for (let i = 0; i < values.testScale; i++) {
            options.push(values["answerField"+i])
        }

        return options;
    };

    const createTest = values => {
        console.log(values);
        const data = {
            researchId: researchProp.id,
            description: values.testDescription,
            name: values.testName,
            scale: values.testScale,
            options: calculateOptions(values)
        };

        axios.post(endpoints.CREATE_TEST, data)
            .then((response) => {
                if (response.data.status === 'OK') {
                    props.history.push("/editTest", {
                        test: {
                            id: response.data.testId,
                            name: values.testName,
                            description: values.testDescription,
                            scale: values.testScale,
                            options: calculateOptions(values),
                            researchId: researchProp.id
                        },
                        research: researchProp
                    });
                    props.testFormExistsAction(true);
                } else {
                    alert('Something went wrong while creating test')
                }
            })
            .catch(() => {
                alert('Something went wrong while creating test')
            })
    };

    const updateTest = values => {
        const data = {
            researchId: researchProp.id,
            description: values.testDescription,
            name: values.testName,
            scale: values.testScale,
            id: testProp.id,
            options: calculateOptions(values)
        };

        axios.put(endpoints.UPDATE_TEST, data)
            .then((response) => {
                if (response.data.status === 'OK') {
                    props.history.push("/editResearch", {
                        research: researchProp
                    });
                } else {
                    alert('Something went wrong while updating test')
                }
            })
            .catch(() => {
                alert('Something went wrong while updating test')
            })
    };

    const onFinish = (values) => {
        if (testProp === undefined) {
            createTest(values);
        } else {
            updateTest(values);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }, 100);
    }, []);

    useEffect(() => {
        const test = props.location.state.test;

        if (test !== undefined) {
            form.setFieldsValue({
                testName: test.name,
                testDescription: test.description,
                testScale: test.scale,
            });

            let newExtraFields = [];
            let scale = test.scale;
            let answerFields = {};

            if (!isNaN(scale)) {
                for (let i = 0; i < scale; i++) {
                    newExtraFields.push({
                        fieldType: "answerField",
                        answerName: "answerField" + i.toString(),
                        answerIndex: i,
                    });

                    answerFields["answerField" + i.toString()] = test.options[i];
                }

                setExtraFields(newExtraFields);
                form.setFieldsValue({...answerFields});
            }

            axios.get(endpoints.GET_TEST + '/' + test.id)
                .then((response) => {
                    if (response.data.status === 'OK') {
                        setQuestions(response.data.rangeTestQuestions);
                    } else {
                        alert('Something went wrong while loading test questions');
                    }
                })
                .catch(() => {
                    alert('Something went wrong while loading test questions');
                });
        }
    }, [props.location.state.test]);

    const [editedQuestion, setEditedQuestion] = useState({});

    const handleAddQuestion = () => {
        setEditedQuestion({});
        props.editQuestionVisible();
    };

    const handleEditQuestion = (item) => () => {
        setEditedQuestion(item);
        props.editQuestionVisible();
    };

    return (
        <div
            ref={divRef}
            id="divParent"
        >
            <Form
                name="test_form"
                form={form}
                onFinish={onFinish}
                {...formItemLayout}
                onValuesChange={(changedValues, allValues) => {
                    if (changedValues.hasOwnProperty("testScale")) {
                        let newExtraFields = [];
                        let scale = changedValues["testScale"];

                        if (!isNaN(scale)) {
                            for (let i = 0; i < scale; i++) {
                                newExtraFields.push({
                                    fieldType: "answerField",
                                    answerName: "answerField" + i.toString(),
                                    answerIndex: i,
                                });
                            }

                            setExtraFields(newExtraFields);
                        }
                    }
                }}
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
                    name="testScale"
                    label="Test Scale"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter a Scale",
                        }
                    ]}
                >
                    <Input.TextArea rows={1}/>
                </Form.Item>

                {extraFields.map((extraField, index) => {
                    if (extraField.fieldType === "answerField") {
                        return (
                            <Form.Item
                                wrapperCol={{
                                    span: 8,
                                    offset: 8,
                                }}
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
                        return (<div/>);
                    }
                })}

                <div
                    hidden={!props.editTestFormReducer.test_form_exists}
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
                        <EditTestQuestionForm question={editedQuestion} test={testProp} research={researchProp}/>
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

                            renderItem={(item, index) => (
                                <List.Item
                                    style={{padding: '16px 0'}}
                                    actions={[
                                        <ClickableStyle onClick={handleEditQuestion(item)}>
                                            Edit
                                        </ClickableStyle>,
                                        <ClickableStyle>Delete</ClickableStyle>,
                                        <ClickableStyle><UpOutlined /></ClickableStyle>,
                                        <ClickableStyle><DownOutlined /></ClickableStyle>,
                                    ]}
                                >

                                    <List.Item.Meta
                                        title={"Question " + (index + 1).toString()}
                                        description={item.question}
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
)(EditTestForm);