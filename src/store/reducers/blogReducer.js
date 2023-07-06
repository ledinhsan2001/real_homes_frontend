import actionTypes from "../actions/actionTypes";

const initState = {
    blogs: [],
    blog: [],
    message: "",
};

const blogReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_BLOG:
            return {
                ...state,
                blogs: action.blogs || [],
                message: action.message || "",
            };
        case actionTypes.GET_ALL_LIMIT_BLOG:
            return {
                ...state,
                data_blog_limit: action.data_blog_limit || [],
                total_blog: action.total_blog || 0,
                page_count_blog: action.page_count_blog || 0,
                message: action.message || "",
            };
        case actionTypes.GET_DETAIL_BLOG:
            return {
                ...state,
                blog_detail: action.blog_detail || [],
                message: action.message || "",
            };
        case actionTypes.GET_ALL_BLOG_TYPE:
            return {
                ...state,
                blog_types: action.blog_types || [],
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default blogReducer;
