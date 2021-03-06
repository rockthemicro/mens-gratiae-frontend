import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Radio, Table} from "antd";
import axios from "axios";
import endpoints from "../endpoints";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const TestForm = (props) => {

    const generateColumns = context => {

        const test = context.tests[context.selectedTest];
        const columns = [{
            title: 'Question',
            dataIndex: 'question',
            width: '40%'
        }];

        const columnWidth = 60 / test.scale;
        for (let i = 0; i < test.scale; i++) {
            columns.push({
                title: test.options[i],
                dataIndex: i,
                width: columnWidth.toString() + '%'
            });
        }

        return columns;
    };

    const generateRadiosChecked = context => {
        const test = context.tests[context.selectedTest];
        const testQuestions = context.testsQuestions[test.id];

        const radiosChecked = {};

        for (let i = 0; i < testQuestions.length; i++) {
            let radiosCheckedRow = [];

            for (let j = 0; j < test.scale; j++) {
                radiosCheckedRow.push(false);
            }
            radiosChecked[i] = radiosCheckedRow;
        }

        return radiosChecked;
    };

    const generateData = (context) => {
        const test = context.tests[context.selectedTest];
        const testQuestions = context.testsQuestions[test.id];

        const data = [];

        for (let i = 0; i < testQuestions.length; i++) {
            const dataItem = {
                key: i,
                question: (i + 1).toString() + ". " + testQuestions[i].question
            };

            for (let j = 0; j < test.scale; j++) {
                dataItem[j] = (
                    <Radio
                        checked={radiosChecked[i][j]}
                        value={{row: i, column: j}}
                        onChange={handleRadioChange}
                    />
                );
            }

            data.push(dataItem);
        }

        return data;
    };

    const [columns, setColumns] = useState(null);
    const [radiosChecked, setRadiosChecked] = useState(null);
    const [data, setData] = useState([]);

    const divRef = React.useRef();

    useEffect(() => {
        const context = props.location.state.context;

        const columns = generateColumns(context);
        setColumns(columns);

    }, [props.location.state.context.selectedTest]);

    useEffect(() => {
        if (columns !== null) {
            const context = props.location.state.context;

            const newRadiosChecked = generateRadiosChecked(context);
            setRadiosChecked(newRadiosChecked);

            setTimeout(() => {
                divRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
            }, 100);
        }
    }, [columns]);

    useEffect(() => {
        if (radiosChecked !== null) {
            const context = props.location.state.context;

            const data = generateData(context);
            setData(data);
        }
    }, [radiosChecked]);

    const handleRadioChange = (element) => {
        const rowId = element.target.value.row;
        const columnId = element.target.value.column;

        let checkedList = [];
        for (let i = 0; i < columns.length; i++) {
            if (i !== columnId) {
                checkedList.push(false);
            } else {
                checkedList.push(true);
            }
        }

        let newRadiosChecked = {
            ...radiosChecked,
            [rowId]: checkedList
        };
        setRadiosChecked(newRadiosChecked);
    };

    const handleSubmitClick = () => {
        for (let checkedList of Object.values(radiosChecked)) {
            let foundTrue = false;

            for (let checked of checkedList) {
                if (checked === true) {
                    foundTrue = true;
                    break;
                }
            }

            if (foundTrue === false) {
                alert('Please fill all the answers before submitting the test');
                return;
            }
        }

        const context = props.location.state.context;
        const test = context.tests[context.selectedTest];
        const testQuestions = context.testsQuestions[test.id];
        const testSubmission = {};

        for (let i = 0; i < testQuestions.length; i++) {
            let checkedList = radiosChecked[i];

            for (let j = 0; j < checkedList.length; j++) {
                if (checkedList[j] === true) {
                    /* we'll have answers indexed from 1, not 0 */
                    testSubmission[testQuestions[i].id] = j + 1;
                    break;
                }
            }
        }

        const rangeTestQuestionAnswers = {
            ...context.submission.rangeTestQuestionAnswers,
            [test.id]: testSubmission
        };

        const submission = {
            ...context.submission,
            rangeTestQuestionAnswers: rangeTestQuestionAnswers
        };

        if (context.selectedTest < context.tests.length - 1) {
            props.history.push("/fillTest", {
                context: {
                    ...context,
                    submission: submission,
                    selectedTest: context.selectedTest + 1
                }
            });
        } else {
            axios.post(endpoints.ADD_SUBMISION, submission)
                .then(response => {
                    if (response.data.status === 'OK') {
                        alert('Thank you for your submission');
                        props.history.push("/research");
                    } else {
                        alert('There was a problem while posting your submmission');
                    }
                })
                .catch(() => {
                    alert('There was a problem while posting your submmission');
                })
        }

    };

    const handleResetClick = () => {
        let newRadiosChecked = {};

        for (let key of Object.keys(radiosChecked)) {
            newRadiosChecked[key] = columns.map(() => false);
        }

        setRadiosChecked(newRadiosChecked);
    };

    return (
        <div ref={divRef}>
            <div
                style={{fontFamily: "Verdana", fontSize: 20}}
                dangerouslySetInnerHTML={{__html: props.location.state.context.tests[props.location.state.context.selectedTest].description}}
            />

            <br/>

            <Table
                columns={columns}
                dataSource={data}
                size="middle"
                pagination={false}
                scroll={{y: '30vw', scrollToFirstRowOnChange: true}}

            />

            <div style={{position: 'absolute', bottom: 20, left: 20}}>
                <Button
                    type="primary"
                    onClick={handleSubmitClick}
                >
                    Submit
                </Button>

                <Button
                    type="default"
                    style={{margin: '0 15px'}}
                    onClick={handleResetClick}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(TestForm);