import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Radio, Table} from "antd";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const TestForm = (props) => {
    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            width: '40%'
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

        setRadiosChecked({
            [row]: checkedList
        });
    };

    const [radiosChecked, setRadiosChecked] = useState({
        0: columns.map(() => false)
    });

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
            question: 'salut',
            0: radios[0][0],
            1: radios[0][1],
            2: radios[0][2],
            3: radios[0][3],
            4: radios[0][4],
        },
        {
            key: 2,
            question: 'da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da da '
        },
        {
            key: 3,
            question: 'da'
        },
        {
            key: 4,
            question: 'da'
        },
        {
            key: 5,
            question: 'da'
        },
        {
            key: 6,
            question: 'da'
        },
        {
            key: 7,
            question: 'da'
        },
        {
            key: 8,
            question: 'da'
        },
        {
            key: 9,
            question: 'da'
        },
        {
            key: 10,
            question: 'da'
        },
        {
            key: 11,
            question: 'da'
        },
        {
            key: 12,
            question: 'da'
        }
    ];

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

            alert('Test submitted');
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
        <div>
            <Table
                columns={columns}
                dataSource={data}
                size="small"
                pagination={ false }
                scroll={{ y: '35vw' }}

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