export default (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN_STATUS_ACTION':
      return {
        loggedIn: true
      };

    case 'LOG_OUT_STATUS_ACTION':
      return {
        loggedIn: false
      };

    default:
      return state;
  }
};