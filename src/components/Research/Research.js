import React, {useEffect, useState} from "react";
import axios from 'axios';
import {connect} from "react-redux";
import {List, Avatar, Button} from 'antd';
import styled from 'styled-components';
import endpoints from '../endpoints';

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

    const RO = 'ROM';
    const IT = 'ITA';
    const EN = 'ENG';

    const [researches, setResearches] = useState([]);

    useEffect(() => {
        axios.get(endpoints.GET_ALL_RESEARCHES).then(({data}) => {
            if (data.status === 'OK') {
                setResearches(data.researches)
            } else {
                alert('Sorry, an internal server error occured. Please try again later');
            }
        }).catch(() => {
            alert('Sorry, an internal server error occured. Please try again later');
        })
    }, []);

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
        props.history.push("/editResearch");
    };

    const handleItemClick = () => {
        props.history.push("/fillResearch")
    };

    return (
        <div>
            {props.logInStatusReducer.loggedIn &&
            <div>
                <Button type="primary" onClick={handleAddResearch}>Add Research</Button>
                <br/>
            </div>
            }
            <List
                itemLayout='horizontal'
                size='large'
                dataSource={researches}

                renderItem={item => (
                    <List.Item actions={getActions()}>
                        <List.Item.Meta
                            avatar={<Avatar src={getFlagPath(item.language)}/>}
                            title={<ClickableStyle onClick={handleItemClick}> {item.title} </ClickableStyle>}
                            description={item.shortDesc}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Research);