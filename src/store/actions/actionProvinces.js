import { apiGetProvinces } from "../../services/provinces";
import actionTypes from "./actionTypes";

export const actionProvince = () => async (dispatch) => {
    try {
        const response = await apiGetProvinces();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                provinces: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                message: response.data.message,
                provinces: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCES,
            provinces: null,
        });
    }
};
