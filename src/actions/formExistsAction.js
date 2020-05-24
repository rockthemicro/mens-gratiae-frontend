const formExistsAction = (payload) => dispatch => {
    dispatch({
        type: 'FORM_EXISTS',
        payload: payload
    })
};

export default formExistsAction;