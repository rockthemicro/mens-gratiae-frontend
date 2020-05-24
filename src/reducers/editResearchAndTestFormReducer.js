export default (state = {}, action) => {
    switch (action.type) {
        case 'FORM_EXISTS':
            return {
                form_exists: action.payload
            };

        default:
            return state;
    }
};