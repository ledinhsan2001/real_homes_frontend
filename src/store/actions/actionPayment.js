import actionTypes from "./actionTypes";
import * as services from "../../services";

export const actionPayment = (payload) => async (dispatch) => {
    try {
        const response = await services.apigetPaymentHistory(payload);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_PAY_HIS_LIMIT_BY_USER,
                limit_history_pay: response.data.data.limit_history_pay,
                total_all_history_pay: response.data.data.total_all_history_pay,
                page_count_history_pay:
                    response.data.data.page_count_history_pay,
            });
        } else {
            dispatch({
                type: actionTypes.GET_PAY_HIS_LIMIT_BY_USER,
                message: response.data.message,
                limit_history_pay: null,
                total_all_history_pay: 0,
                page_count_history_pay: 0,
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: actionTypes.GET_PAY_HIS_LIMIT_BY_USER,
            limit_history_pay: null,
            total_all_history_pay: 0,
            page_count_history_pay: 0,
            message: error.response.data.message,
        });
    }
};
