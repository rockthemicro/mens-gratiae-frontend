import React, {useEffect, useState} from "react";
import axios from 'axios';
import {connect} from "react-redux";
import {List, Avatar, Button} from 'antd';
import styled from 'styled-components';
import endpoints from '../endpoints';
import formExistsAction from "../../actions/formExistsAction";
import {EN, IT, RO, SUBMISSIONS_ARCHIVE_NAME} from "../constants";
import fileDownload from 'js-file-download';

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

const mapDispatchToProps = dispatch => ({
    formExistsAction: (form_exists) => dispatch(formExistsAction(form_exists)),
});

const Research = (props) => {

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

    const getActions = (item) => {
        //neavand alt fel de utilizatori decat admin, imi permit sa verific doar daca e logat TODO: sa schimbam conditia
        if (props.logInStatusReducer.loggedIn) {
            return [
                <ClickableStyle onClick={handleEditResearch(item)}>EDIT</ClickableStyle>,
                <ClickableStyle onClick={handleDownloadSubmissions(item)}>-</ClickableStyle>
            ]
        }

        return [];
    };

    const handleAddResearch = () => {
        props.formExistsAction(false);
        props.history.push("/editResearch", {
            research: undefined
        });
    };

    const handleEditResearch = (item) => () => {
        props.formExistsAction(true);
        props.history.push("/editResearch", {
            research: item
        });
    };

    const handleDownloadSubmissions = (item) => () => {
        axios.get(endpoints.GET_SUBMISSIONS + '/' + item.id, { responseType: 'arraybuffer' })
            .then(response => {
                fileDownload(response.data, SUBMISSIONS_ARCHIVE_NAME);
            })
            .catch(err => {
                alert('Something went wrong while retrieving submissions');
            })
    };

    const handleItemClick = (item) => () => {
        props.history.push("/researchDescription/" + item.id);
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
                    <List.Item actions={getActions(item)}>
                        <List.Item.Meta
                            avatar={<Avatar src={getFlagPath(item.language)}/>}
                            title={<ClickableStyle onClick={handleItemClick(item)}> {item.title} </ClickableStyle>}
                            description={item.shortDesc}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Research);