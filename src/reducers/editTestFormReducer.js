export default (state = {}, action) => {
    switch (action.type) {
        case 'TEST_FORM_EXISTS':
            return {
                test_form_exists: action.payload
            };

        default:
            return state;
    }
};