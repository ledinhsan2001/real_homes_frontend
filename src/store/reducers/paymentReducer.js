import actionTypes from "../actions/actionTypes";

const initState = {
    page_count_pay_his: 0,
    total_all_pay_his: 0,
    limit_data_pay_his: [],
    message: "",
};

const paymentReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PAY_HIS_LIMIT_BY_USER:
            return {
                ...state,
                limit_history_pay: action.limit_history_pay || null,
                total_all_history_pay: action.total_all_history_pay || 0,
                page_count_history_pay: action.page_count_history_pay || 0,
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default paymentReducer;
