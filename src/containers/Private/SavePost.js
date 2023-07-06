import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, NewPost } from "../components";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { actionGetSavePostLimit } from "../../store/actions";

const SavePost = () => {
    const {
        limit_save_post,
        total_all_save_post,
        page_count_save_post,
        message,
    } = useSelector((state) => state.real_home);
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const [save_post, setsave_post] = useState([]);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setsave_post(limit_save_post);
    }, [limit_save_post]);

    useEffect(() => {
        let objparams = {};

        let page_value = params.get("page");
        let page = page_value ? +page_value - 1 : 0;
        objparams["page"] = page;

        dispatch(actionGetSavePostLimit(objparams));
        setCurrentPage(+page);
    }, [params, dispatch]);

    function handlePageClick(e) {
        let objparams = {};
        objparams["page"] = e.selected + 1;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(objparams).toString(),
        });
    }

    return (
        <div className="flex ml-[10%] mb-[200px]">
            <div className="px-10 py-2 w-full">
                <div className="text-left text-black font-bold text-4xl pb-4">
                    Tin đăng đã lưu
                </div>
                <div className="my-2 flex justify-between items-center">
                    <div className="titleh6 text-left">
                        <b>{total_all_save_post}</b> tin bất động sản bạn đã
                        lưu.
                    </div>
                </div>
                <div className="flex mb-[100px] gap-3 w-full">
                    <div className="w-[60%]">
                        {save_post?.length === 0 && message && (
                            <div className="bg-white">{message}</div>
                        )}
                        {save_post?.length > 0 &&
                            save_post.map((item) => {
                                return (
                                    <Item
                                        key={item?.real_home._id}
                                        images={JSON.parse(
                                            item?.real_home?.images.url
                                        )}
                                        shortDescription={
                                            item?.real_home?.description
                                                .title_description
                                        }
                                        price={
                                            item?.real_home?.description.price
                                        }
                                        area={item?.real_home?.description.area}
                                        bedroom={
                                            item?.real_home?.description.bedroom
                                        }
                                        toilet={
                                            item?.real_home?.description.toilet
                                        }
                                        address={item?.real_home?.address}
                                        content={
                                            item?.real_home?.description
                                                .content_description
                                        }
                                        user={item?.real_home?.user_post}
                                        _id={item?.real_home?._id}
                                        active
                                        news_type_id={
                                            item?.real_home?.news_type_id
                                        }
                                        sold={item?.real_home?.sold}
                                    />
                                );
                            })}
                        {save_post?.length > 0 && (
                            <div className="mt-2 w-[100%] mb-6">
                                <ReactPaginate
                                    className=""
                                    breakLabel="..."
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    pageCount={page_count_save_post}
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

                    <div className="right h-fit w-[25%] bg-white p-2">
                        <NewPost />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavePost;
