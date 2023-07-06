import React from "react";
import { ItemBlog } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { actionGetAllBlogLimit } from "../../store/actions";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { TfiFilter } from "react-icons/tfi";

const Blog = () => {
    const {
        data_blog_limit,
        total_blog,
        page_count_blog,
        message,
        blog_types,
    } = useSelector((state) => state.blog);

    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const [data_blogs, setdata_blogs] = useState([]);

    useEffect(() => {
        data_blog_limit?.length > 0 && setdata_blogs(data_blog_limit);
        message && setdata_blogs([]);
    }, [data_blog_limit]);

    useEffect(() => {
        let objparams = {};

        let page_value = params.get("page");
        let page = page_value ? +page_value - 1 : 0;

        objparams["page"] = page;

        let blog_type_value = params.get("blog_type_id");
        if (blog_type_value) {
            objparams["blog_type_id"] = blog_type_value;
        }

        dispatch(actionGetAllBlogLimit(objparams));
        setCurrentPage(+page);
    }, [params, dispatch]);

    function handlePageClick(e) {
        let objparams = {};
        objparams["page"] = e.selected + 1;

        let blog_type_value = params.get("blog_type_id");
        if (blog_type_value) {
            objparams["blog_type_id"] = blog_type_value;
        }

        navigate({
            pathname: location.pathname,
            search: createSearchParams(objparams).toString(),
        });
    }

    const handleFilter = (value) => {
        let objparams = {};
        if (value) {
            objparams["blog_type_id"] = value;
            navigate({
                pathname: location.pathname,
                search: createSearchParams(objparams).toString(),
            });
        } else {
            navigate({
                pathname: "/blog",
            });
        }
    };

    return (
        <div className="bg-white w-full">
            <div className=" flex flex-col m-auto w-[70%]">
                <div className="flex text-[40px] font-bold mr-auto ml-auto mb-[24px]">
                    Tin tức thị trường bất động sản.
                </div>
                <div className="flex text-[20px] justify-between mb-[10px]">
                    <div>
                        <b className="mr-2">{total_blog}</b> tin tức thị trường
                        bất động sản.
                    </div>
                    <div className=" flex items-center text-left gap-1">
                        <TfiFilter size={16} />
                        <p className="mr-4 text-[18px] font-bold">
                            Lọc tiêu chí:{" "}
                        </p>
                        <select
                            className=" h-[40px] w-[150px] px-2 rounded-xl border-solid border-1 bg-blue-100 border-blue-500 hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer"
                            onChange={(e) => handleFilter(e.target.value)}
                        >
                            <option
                                className="text-gray-500 font-bold"
                                value={""}
                            >
                                Tất cả
                            </option>
                            {blog_types?.length > 0 &&
                                blog_types.map((item) => {
                                    return (
                                        <option
                                            className="text-gray-500 font-bold"
                                            value={item._id}
                                            key={item._id}
                                            onClick={() =>
                                                handleFilter(item._id)
                                            }
                                        >
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                {message && (
                    <div className="bg-white mb-10 text-[20px]">{message}</div>
                )}
                {data_blogs.length > 0 &&
                    data_blogs.map((item) => (
                        <div key={item._id}>
                            <ItemBlog item={item} />
                        </div>
                    ))}
                {data_blogs?.length > 0 && (
                    <div className="mt-2 w-[100%] mb-6">
                        <ReactPaginate
                            className=""
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={page_count_blog}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            marginPagesDisplayed={1}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                            forcePage={currentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
