import actionTypes from "./actionTypes";
import * as services from "../../services";

export const actionGetAllBlog = () => async (dispatch) => {
    try {
        const response = await services.apiGetAllBlog();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_ALL_BLOG,
                blogs: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_BLOG,
                message: response.data.message,
                blogs: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_BLOG,
            blogs: null,
            message: error.response?.data?.message,
        });
    }
};

export const actionGetAllBlogLimit = (page_blog_id) => async (dispatch) => {
    try {
        const response = await services.apiGetAllBlogLimit(page_blog_id);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_ALL_LIMIT_BLOG,
                data_blog_limit: response.data.data.data_blog_limit,
                total_blog: response.data.data.total_blog,
                page_count_blog: response.data.data.page_count_blog,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_LIMIT_BLOG,
                message: response.data.message,
                data_blog_limit: null,
                total_blog: 0,
                page_count_blog: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_LIMIT_BLOG,
            data_blog_limit: null,
            total_blog: 0,
            page_count_blog: 0,
            message: error.response?.data?.message,
        });
    }
};

export const actionDetailBlog = (_id) => async (dispatch) => {
    try {
        const response = await services.apiGetDetailBlog(_id);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_DETAIL_BLOG,
                blog_detail: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_DETAIL_BLOG,
                message: response.data.message,
                blog_detail: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_DETAIL_BLOG,
            blog_detail: null,
        });
    }
};

export const actionGetAllBlogType = () => async (dispatch) => {
    try {
        const response = await services.apiGetAllBlogType();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_ALL_BLOG_TYPE,
                blog_types: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_ALL_BLOG_TYPE,
                message: response.data.message,
                blog_types: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_BLOG_TYPE,
            blog_types: null,
        });
    }
};
