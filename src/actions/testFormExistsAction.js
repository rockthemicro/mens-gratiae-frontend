const testFormExistsAction = (payload) => dispatch => {
    dispatch({
        type: 'TEST_FORM_EXISTS',
        payload: payload
    })
};

export default testFormExistsAction;