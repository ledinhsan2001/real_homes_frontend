import actionTypes from "./actionTypes";

export const login = (response) => async (dispatch) => {
    dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data,
        message: response.data.message,
    });
};
export const logout = () => async (dispatch) => {
    dispatch({
        type: actionTypes.LOG_OUT,
    });
};
