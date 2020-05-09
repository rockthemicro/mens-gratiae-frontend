import React from "react";
import {connect} from "react-redux";
import 'antd/dist/antd.css';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    Button,
    Form,
    Radio,
    Select,
    Checkbox,
    Row,
    Col,
    Input
} from "antd";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const ResearchForm = () => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const data = [

    ];

    return (
        <div>
            <Form
                name="research_form"
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name="1"
                    label="Va place pizza?"
                    rules={[{ required: true, message: 'Please select an answer' }]}
                >
                    <Radio.Group>
                        <Radio value="yes">Da</Radio>
                        <Radio value="no">Nu</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="2"
                    label="Uneori cand sunt trist, ascult muzica"
                    rules={[{ required: true, message: 'Please select an answer' }]}
                    hasFeedback
                >
                    <Select>
                        <Select.Option value="1">1 Dezacord puternic</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                        <Select.Option value="5">5 Acord puternic</Select.Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    name="3"
                    label="Imi place sa"
                    rules={[{ required: true, message: 'Please select an answer' }]}
                >
                    <Checkbox.Group>
                        <Row>
                            <Col span={2}>
                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                    A
                                </Checkbox>
                            </Col>
                            <Col span={2}>
                                <Checkbox value="B" style={{ lineHeight: '32px' }}>
                                    B
                                </Checkbox>
                            </Col>
                            <Col span={2}>
                                <Checkbox value="C" style={{ lineHeight: '32px' }}>
                                    C
                                </Checkbox>
                            </Col>
                            <Col span={2}>
                                <Checkbox value="D" style={{ lineHeight: '32px' }}>
                                    D
                                </Checkbox>
                            </Col>
                            <Col span={2}>
                                <Checkbox value="E" style={{ lineHeight: '32px' }}>
                                    E
                                </Checkbox>
                            </Col>
                            <Col span={2}>
                                <Checkbox value="F" style={{ lineHeight: '32px' }}>
                                    F
                                </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>

                </Form.Item>

                <Form.Item
                    name="4"
                    label="Ce parere aveti de Tudor Gheorghe?"
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>

                {/*<Form.List name="research_form_list">*/}
                {/*    {fields => (*/}
                {/*        <div>*/}
                {/*            {fields.map(field => (*/}
                {/*                <Form.Item {...field}>*/}
                {/*                    <div></div>*/}
                {/*                </Form.Item>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</Form.List>*/}

                <Form.Item
                    wrapperCol={{
                        span: 12,
                        offset: 6,
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
    connect(mapStateToProps, mapDispatchToProps))
(ResearchForm);