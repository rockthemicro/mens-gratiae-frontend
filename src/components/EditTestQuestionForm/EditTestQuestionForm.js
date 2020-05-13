import React, {useState} from "react";
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

    const onFinish = (values) => {
        console.log(values);
        setExtraFields([]);
        form.resetFields();
        props.editQuestionInvisible();
    };

    const onReset = () => {
        setExtraFields([]);
        form.resetFields();
    };

    const [extraFields, setExtraFields] = useState([]);

    return (
        <Form
            form={form}
            onFinish={onFinish}
            name="edit_test_question_form"
            onValuesChange={(changedValues, allValues) => {
                if (changedValues.hasOwnProperty("quantitySelector")) {
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

                        setExtraFields(answerFields);
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

            <Form.Item
                name="quantitySelector"
                rules={[
                    {
                        required: true,
                        message: "Please add how many options you want to have",
                    }
                ]}
            >
                <Input.TextArea
                    rows={1}
                    placeholder={"Number of options"}
                />
            </Form.Item>

            {extraFields.map((extraField, index) => {
                if (extraField.fieldType === "answerField") {
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
                }
                return (<div></div>);
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
(EditTestQuestionForm);