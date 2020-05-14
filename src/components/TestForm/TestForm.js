import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Radio, Table} from "antd";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const TestForm = (props) => {
    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            width: '50%'
        },
        {
            title: 'Dezacord puternic',
            dataIndex: 0,
        },
        {
            title: 'Dezacord',
            dataIndex: 1,
        },
        {
            title: 'Neutru',
            dataIndex: 2,
        },
        {
            title: 'Acord',
            dataIndex: 3,
        },
        {
            title: 'Acord puternic',
            dataIndex: 4,
        }
    ];

    const handleRadioChange = (element) => {
        const row = element.target.value.row;
        const column = element.target.value.column;

        let allRadiosOnRow = radios[row];
        let checkedList = [];

        for (let radio of allRadiosOnRow) {
            if (radio.props.value.column !== column) {
                checkedList.push(false);
            } else {
                checkedList.push(true);
            }
        }
        debugger;
        setRadiosChecked({
            [row]: checkedList
        });
    };

    const [radiosChecked, setRadiosChecked] = useState({
        0: columns.map(() => false)
    });

    debugger;
    const radios = {
        0: [
                <Radio checked={radiosChecked[0][0]} value={{row: 0, column: 0}} onChange={handleRadioChange}/>,
                <Radio checked={radiosChecked[0][1]} value={{row: 0, column: 1}} onChange={handleRadioChange}/>,
                <Radio checked={radiosChecked[0][2]} value={{row: 0, column: 2}} onChange={handleRadioChange}/>,
                <Radio checked={radiosChecked[0][3]} value={{row: 0, column: 3}} onChange={handleRadioChange}/>,
                <Radio checked={radiosChecked[0][4]} value={{row: 0, column: 4}} onChange={handleRadioChange}/>,
        ]
    };

    const data = [
        {
            key: 0,
            question: 'Cand afara ninge, ma pun sa citesc o carte Cand afara ninge, ma pun sa citesc o carte Cand afara ninge, ma pun sa citesc o carte Cand afara ninge, ma pun sa citesc o carte Cand afara ninge, ma pun sa citesc o carte Cand afara ninge, ma pun sa citesc o carte',
            0: radios[0][0],
            1: radios[0][1],
            2: radios[0][2],
            3: radios[0][3],
            4: radios[0][4],
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                size="small"
            />
        </div>
    );
};


export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(TestForm);