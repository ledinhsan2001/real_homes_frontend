import actionTypes from "./actionTypes";
import * as services from "../../services";

export const actionAreas = () => async (dispatch) => {
    try {
        const response = await services.apiGetAreas();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response.data.data.sort(function (a, b) {
                    return a.order - b.order;
                }),
            });
        } else {
            dispatch({
                type: actionTypes.GET_AREAS,
                message: response.data.message,
                areas: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AREAS,
            areas: null,
        });
    }
};
