import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, List, Radio, WhiteSpace, WingBlank} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import axios from "axios";
import endpoints from "../endpoints";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const MobileTestForm = (props) => {

    const [values, setValues] = useState({});
    const context = props.location.state.context;
    const test = context.tests[context.selectedTest];
    const testQuestions = context.testsQuestions[test.id];

    const divRef = React.useRef();

    useEffect(() => {
        const newValues = {};

        for (const testQuestion of testQuestions) {
            newValues[testQuestion.id] = -1;
        }

        setValues(newValues);

        setTimeout(() => {
            divRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'start'});
        }, 100);
    }, [props.location.state.context.selectedTest]);

    const handleRadioClick = (question, option) => {
        setValues({
            ...values,
            [question]: option
        });
    };

    const handleSubmit = () => {
        const testSubmission = {};

        for (const [questionId, answer] of Object.entries(values)) {
            if (answer === -1) {
                alert('Please fill all the answers');
                return;
            }

            testSubmission[questionId] = answer;
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
            props.history.push("/fillMobileTest", {
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

    return (
        <div ref={divRef}>
            <div
                style={{fontFamily: "Verdana", fontSize: 20}}
                dangerouslySetInnerHTML={{__html: context.tests[context.selectedTest].description}}
            />
            {testQuestions.map((testQuestion, testQuesionIndex) => (

                <div>
                    <WhiteSpace size="lg" />

                    <span>{(testQuesionIndex + 1).toString() + ". " + testQuestion.question}</span>
                    <List >
                        {test.options.map((option, index) => (
                            <Radio.RadioItem
                                checked={index === values[testQuestion.id] - 1}
                                /* we'll have answers indexed from 1, not 0 */
                                onChange={() => handleRadioClick(testQuestion.id, index + 1)}
                            >
                                {option}
                            </Radio.RadioItem>
                        ))}
                    </List>

                    <WhiteSpace size="lg" />
                </div>
            ))}

            <WingBlank>
                <Button type="primary" onClick={handleSubmit}>Submit</Button>
            </WingBlank>
        </div>
    );
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
(MobileTestForm);