import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import endpoints from "../endpoints";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const ResearchDescriptionPage = (props) => {

    const [context, setContext] = useState({
        research: {},
        questions: [],
        tests: [],
        testsQuestions: {}
    });
    useEffect(() => {
        axios.get(endpoints.GET_RESEARCH + "/" + props.location.state.research.id)
            .then((response) => {
                if (response.data.status === 'OK') {
                    setContext({
                        research: response.data.research,
                        questions: response.data.genericResearchQuestions,
                        tests: response.data.tests
                    });
                } else {
                    alert('Sorry, the information could not be completed');
                }
            })
            .catch(() => {
                alert('Sorry, the information could not be completed');
            });
    }, []);

    useEffect(() => {
        if (context.tests.length > 0) {
            context.tests.map((test) => {
                axios.get(endpoints.GET_TEST + "/" + test.id)
                    .then((response) => {
                        if (response.data.status === 'OK') {
                            // const newTestQuestions = {
                            //     [test.id]: response.data.rangeTestQuestions
                            // };
debugger;

                            let newContext = {
                                ...context
                            };

                            let newTestQuestions = {
                                ...context.testsQuestions
                            };

                            newTestQuestions[test.id] = response.data.rangeTestQuestions;

                            newContext.testsQuestions = {
                                ...newTestQuestions
                            };

                            setContext(newContext);
                        }
                    })
                    .catch(() => {

                    })
            });
        }
    }, [context.tests]);

    return (
        <div>{context.research.id}</div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDescriptionPage);