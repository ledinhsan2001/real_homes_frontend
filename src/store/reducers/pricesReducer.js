import actionTypes from "../actions/actionTypes";

const initState = {
    prices: [],
    areas: [],
    message: "",
};

const pricesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRICES:
            return {
                ...state,
                prices: action.prices || [],
                message: action.message || "",
            };
        case actionTypes.GET_AREAS:
            return {
                ...state,
                areas: action.areas || [],
                message: action.message || "",
            };
        case actionTypes.GET_PROVINCES:
            return {
                ...state,
                provinces: action.provinces || [],
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default pricesReducer;
