export default (state = {}, action) => {
    switch (action.type) {
        case 'MODAL_VISIBLE':
            return {
                visible: true
            };

        case 'MODAL_INVISIBLE':
            return {
                visible: false
            };

        default:
            return state;
    }
};