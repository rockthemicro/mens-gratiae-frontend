import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Radio, Table} from "antd";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const TestForm = (props) => {

    const [tableData, setTableData] = useState({});

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

    const generateRadiosAndRadiosChecked = context => {
        const test = context.tests[context.selectedTest];
        const testQuestions = context.testsQuestions[test.id];

        const radiosChecked = {};
        const radios = {};

        for (let i = 0; i < testQuestions.length; i++) {
            let radiosCheckedRow = [];
            let radiosRow = [];

            for (let j = 0; j < test.scale; j++) {
                radiosCheckedRow.push(false);
            }
            radiosChecked[i] = radiosCheckedRow;

            for (let j = 0; j < test.scale; j++) {
                radiosRow.push(<Radio checked={radiosChecked[i][j]} value={{row: i, column: j}}
                                      onChange={handleRadioChange}/>);
            }
            radios[i] = radiosRow;
        }

        return {
            radios: radios,
            radiosChecked: radiosChecked
        };
    };

    const generateData = (context, radios) => {
        const test = context.tests[context.selectedTest];
        const testQuestions = context.testsQuestions[test.id];

        const data = [];

        for (let i = 0; i < testQuestions.length; i++) {
            const dataItem = {
                key: i,
                question: testQuestions[i].question
            };

            for (let j = 0; j < test.scale; j++) {
                dataItem[j] = radios[i][j];
            }

            data.push(dataItem);
        }

        return data;
    };

    useEffect(() => {
        const context = props.location.state.context;
        const columns = generateColumns(context);
        const {radios, radiosChecked} = generateRadiosAndRadiosChecked(context);
        const data = generateData(context, radios);

        setTableData({
            columns: columns,
            radios: radios,
            radiosChecked: radiosChecked,
            data: data
        });

    }, [props.location.state.context.selectedTest]);

    const handleRadioChange = (element) => {
        const row = element.target.value.row;
        const column = element.target.value.column;

        debugger
        let allRadiosOnRow = tableData.radios[row];
        let checkedList = [];

        for (let radio of allRadiosOnRow) {
            if (radio.props.value.column !== column) {
                checkedList.push(false);
            } else {
                checkedList.push(true);
            }
        }

        //TODO: In CAZ CA CRAPA, SA VERIFICAM AICI

        const newRadiosChecked = {
            ...tableData.radiosChecked,
            [row]: checkedList
        };

        const newTableData = {
            ...tableData,
            radiosChecked: newRadiosChecked
        };

        setTableData(newTableData);
    };

    const handleSubmitClick = () => {
        debugger;
        for (let checkedList of Object.values(tableData.radiosChecked)) {
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

            alert('Test submitted');
        }
    };

    const handleResetClick = () => {
        let newRadiosChecked = {};

        for (let key of Object.keys(tableData.radiosChecked)) {
            newRadiosChecked[key] = tableData.columns.map(() => false);
        }

        //TODO: In CAZ CA CRAPA, SA VERIFICAM AICI

        const newTableData = {
            ...tableData,
            radiosChecked: newRadiosChecked
        };

        setTableData(newTableData);
    };

    return (
        <div>
            <Table
                columns={tableData.columns}
                dataSource={tableData.data}
                size="small"
                pagination={false}
                scroll={{y: '35vw'}}

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