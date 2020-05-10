import React from "react";
import {connect} from "react-redux";
import {List, Avatar, Button} from 'antd';
import styled from 'styled-components';

const ClickableStyle = styled.div`
    cursor: pointer;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
        color: blue
    }
`;

const mapStateToProps = state => ({
    logInStatusReducer: state.logInStatusReducer
});

const mapDispatchToProps = dispatch => ({});

const Research = (props) => {

    const RO = 'ro';
    const IT = 'it';
    const EN = 'en';

    //Luata prin call la BE
    const data = [{
        title: 'Research1',
        description: 'Description of first research',
        language: 'ro'
    }, {
        title: 'Research2',
        description: 'Description of second research',
        language: 'en'
    }, {
        title: 'Research3',
        description: 'Description of third research',
        language: 'en'
    }, {
        title: 'Research4',
        description: 'Description of forth research',
        language: 'it'
    }, {
        title: 'Research1',
        description: 'Description of first research',
        language: 'ro'
    }, {
        title: 'Research2',
        description: 'Description of second research',
        language: 'en'
    }, {
        title: 'Research3',
        description: 'Description of third research',
        language: 'ro'
    }, {
        title: 'Research4',
        description: 'Description of forth research',
        language: 'en'
    }, {
        title: 'Research1',
        description: 'Description of first research',
        language: 'ro'
    }, {
        title: 'Research2',
        description: 'Description of second research',
        language: 'it'
    }, {
        title: 'Research3',
        description: 'Description of third research',
        language: 'ro'
    }, {
        title: 'Research4',
        description: 'Description of forth research',
        language: 'it'
    }];

    const getFlagPath = (language) => {
        if (language === RO) {
            return require('../../resources/romania-flag.svg');
        } else if (language === IT) {
            return require('../../resources/italian-flag.png');
        } else if (language === EN) {
            return require('../../resources/england-flag.png');
        }
    };

    const getActions = () => {
        //neavand alt fel de utilizatori decat admin, imi permit sa verific daca e logat doar TODO: sa schimbam conditia
        if (props.logInStatusReducer.loggedIn) {
            return [<ClickableStyle>EDIT</ClickableStyle>]
        }

        return [];
    };

    const handleAddResearch = () => {
        props.history.push("/addResearch");
    };

    const handleItemClick = () => {
        props.history.push("/fillResearch")
    };

    return (
        <div>
            {   props.logInStatusReducer.loggedIn &&
                <div>
                    <Button type="primary" onClick={handleAddResearch}>Add Research</Button>
                    <br/>
                </div>
            }
            <List
                itemLayout='horizontal'
                size='large'
                dataSource={data}

                renderItem={item => (
                    <List.Item actions={getActions()}>
                        <List.Item.Meta
                            avatar={<Avatar src={getFlagPath(item.language)}/>}
                            title={<ClickableStyle onClick={handleItemClick}> {item.title} </ClickableStyle>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Research);