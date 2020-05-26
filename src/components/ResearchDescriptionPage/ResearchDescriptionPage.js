import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import endpoints from "../endpoints";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const ResearchDescriptionPage = (props) => {

    const [context, setContext] = useState({
        research: {},
        questions: [],
        tests: [],
        testsQuestions: {}
    });

    const testsQuestions = {};

    useEffect(() => {
        axios.get(endpoints.GET_RESEARCH + "/" + props.match.params.researchId)
            .then((response) => {
                if (response.data.status === 'OK') {
                    setContext({
                        research: response.data.research,
                        questions: response.data.genericResearchQuestions,
                        tests: response.data.tests,
                        testsQuestions: {}
                    });
                } else {
                    alert('Sorry, the research could not be retrieved');
                }
            })
            .catch(() => {
                alert('Sorry, the research could not be retrieved');
            });
    }, []);

    useEffect(() => {
        if (context.tests.length > 0) {
            for (let test of context.tests) {
                axios.get(endpoints.GET_TEST + "/" + test.id)
                    .then((response) => {
                        if (response.data.status === 'OK') {
                            testsQuestions[test.id] = response.data.rangeTestQuestions;

                            if (Object.keys(testsQuestions).length === context.tests.length) {
                                setContext({
                                    ...context,
                                    testsQuestions: testsQuestions
                                });
                            }

                        } else {
                            alert('Sorry, the questions could not be retrieved');
                        }
                    })
                    .catch(() => {
                        alert('Sorry, the questions could not be retrieved');
                    })
            }
        }
    }, [context.tests]);

    function bla() {
        debugger;
    }
    return (
        <div onClick={bla}>{context.research.id + "debugger"}</div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResearchDescriptionPage);