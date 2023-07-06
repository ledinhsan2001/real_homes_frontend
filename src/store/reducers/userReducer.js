import actionTypes from "../actions/actionTypes";

const initState = {
    user_data: {},
};

//action nhận thông qua dispatcher của redux
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                user_data: action.user_data || null,
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default userReducer;
