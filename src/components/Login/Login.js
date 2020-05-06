import React from 'react';

const Login = (props) => {
    const goBack = (event) => {
        props.history.goBack();
    };
    return (
        <div>
            <button onClick={goBack}>back</button>
            <pre>
                {
                    JSON.stringify(props)
                }
            </pre>
        </div>
    );
};

export default Login;