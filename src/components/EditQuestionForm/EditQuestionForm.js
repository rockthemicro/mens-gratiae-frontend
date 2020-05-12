import React from "react";
import {Button, Form} from "antd";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const EditQuestionForm = (props) => {

    const onFinish = (values) => {

    };

    return (
        <Form>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(EditQuestionForm);