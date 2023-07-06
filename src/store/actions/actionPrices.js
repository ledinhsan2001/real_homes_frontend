import actionTypes from "./actionTypes";
import { apiGetPrices } from "../../services/prices";

export const actionPrices = () => async (dispatch) => {
    try {
        const response = await apiGetPrices();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.data.sort(function (a, b) {
                    return a.order - b.order;
                }),
            });
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                message: response.data.message,
                prices: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null,
        });
    }
};
