const HOST_NAME='http://localhost:8080';
export default {
    LOGIN: HOST_NAME + '/users/login',
    GET_ALL_RESEARCHES: HOST_NAME + '/researches',
    GET_RESEARCH: HOST_NAME + "/researches",

    GET_TESTS: HOST_NAME + '/tests',
    GET_TEST: HOST_NAME + '/tests/test',

    CREATE_RESEARCH: HOST_NAME + '/researches/add',
    UPDATE_RESEARCH: HOST_NAME + '/researches/update',

    CREATE_TEST: HOST_NAME + '/tests/add',
    UPDATE_TEST: HOST_NAME + '/tests/update',

    CREATE_GENERIC_RESEARCH_QUESTION: HOST_NAME + '/researches/genericResearchQuestions/add',
    UPDATE_GENERIC_RESEARCH_QUESTION: HOST_NAME + '/researches/genericResearchQuestions/update',

    CREATE_TEST_QUESTION: HOST_NAME + '/tests/rangeTestQuestions/add',
    UPDATE_TEST_QUESTION: HOST_NAME + '/tests/rangeTestQuestions/update'
};