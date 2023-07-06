import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    message: "",
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken,
                message: action.message,
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                message: action.message,
                accessToken: null,
                refreshToken: null,
            };
        case actionTypes.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null,
                refreshToken: null,
                user_data: null,
            };
        default:
            return state;
    }
};

export default authReducer;
