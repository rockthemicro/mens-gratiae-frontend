import React from 'react';

const Login = (props) => {
    const goBack = (event) => {
        props.history.goBack();
    };
    return (
        <div>
            <pre>
                {
                    JSON.stringify(props)
                }
            </pre>
            <button onClick={goBack}>back</button>
        </div>
    );
};

export default Login;