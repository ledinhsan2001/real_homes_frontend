import React, { useEffect, useState, memo } from "react";
import { Item } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { realHomeLimit } from "../../store/actions/realHome";
import ReactPaginate from "react-paginate";
import {
    useNavigate,
    createSearchParams,
    useSearchParams,
    useLocation,
} from "react-router-dom";

const List = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [sortActive, setsortActive] = useState(0);
    const dispatch = useDispatch();
    //useSelector state.real_homes chọc đúng state real_homeReducer
    const { real_homes, page_count, message, total_data, saved_post } =
        useSelector((state) => state.real_home);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [arrSavedPostId, setarrSavedPostId] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            let arr = [];
            saved_post?.map((item) => arr.push(item?.real_home?._id));
            setarrSavedPostId(arr);
        }
        // eslint-disable-next-line
    }, [saved_post]);

    useEffect(() => {
        // mua+b%nsa => mua bán
        const searchParams = new URLSearchParams(location.search);
        //get cac id from search
        let obj_search_id = {};

        // return pair key/value follow order on url
        for (let i of searchParams.entries()) {
            // real_home:Mua bán, real_home_id:35256346
            if (i[0].includes("_id")) {
                obj_search_id[i[0]] = i[1];
            }
        }

        // reset sort_id and new_type_id
        let check_reset = Object.entries(obj_search_id).filter(
            (item) => item[0] === "sort_id"
        );
        // reset active sort_id
        if (check_reset.length === 0) {
            setsortActive(0);
            let element = document.getElementById("filter_new_type_id");
            element.value = 3;
        }

        let page_value = params.get("page");
        let page = +page_value > 0 ? +page_value - 1 : 0;
        obj_search_id["page"] = page;

        dispatch(realHomeLimit(obj_search_id));
        setCurrentPage(+page);
    }, [params, location.search]);

    function handlePageClick(e) {
        const searchParams = new URLSearchParams(location.search);

        //get cac id from search
        let obj_search_id = {};

        for (let i of searchParams.entries()) {
            // real_home:Mua bán, real_home_id:35256346
            obj_search_id[i[0]] = i[1];
        }
        obj_search_id["page"] = e.selected + 1;

        navigate({
            pathname: location.pathname,
            search: createSearchParams(obj_search_id).toString(),
        });
    }

    const handleSort = (value) => {
        setsortActive(value);

        const searchParams = new URLSearchParams(location.search);

        //get cac id from search
        let obj_search_id = {};

        for (let i of searchParams.entries()) {
            // real_home:Mua bán, real_home_id:35256346
            obj_search_id[i[0]] = i[1];
        }
        let page_value = params.get("page");
        let page = +page_value > 0 ? +page_value - 1 : 0;
        obj_search_id["page"] = page;

        obj_search_id["sort_id"] = value;

        navigate({
            pathname: location.pathname,
            search: createSearchParams(obj_search_id).toString(),
        });
    };

    const handleFilter = (value) => {
        const searchParams = new URLSearchParams(location.search);

        //get cac id from search
        let obj_search_id = {};

        for (let i of searchParams.entries()) {
            // real_home:Mua bán, real_home_id:35256346
            obj_search_id[i[0]] = i[1];
        }
        obj_search_id["news_type_id"] = value;

        navigate({
            pathname: location.pathname,
            search: createSearchParams(obj_search_id).toString(),
        });
    };

    return (
        <div className="main w-[100%]">
            <div className="titleSort">
                <div className="titleh6 text-left mb-1">
                    <b>{total_data}</b> tin cho thuê nhà đất ở toàn quốc
                </div>

                <div className="flex justify-between">
                    <div className="btnSort flex items-center">
                        <span>Sắp xếp:</span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 0
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(0)}
                        >
                            Mặc định
                        </span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 1
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(1)}
                        >
                            Tin mới
                        </span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 2
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(2)}
                        >
                            Diện tích tăng
                        </span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 3
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(3)}
                        >
                            Diện tích giảm
                        </span>
                    </div>
                    <div className=" flex items-center text-left">
                        <p className="mr-2">Lọc loại tin:</p>
                        <select
                            id="filter_new_type_id"
                            className=" h-[34px] w-[150px] p-1 my-1 rounded-xl border-solid border-1 border-black hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer"
                            onChange={(e) => handleFilter(+e.target.value)}
                        >
                            <option className="text-black font-bold" value={3}>
                                Mặc định
                            </option>
                            <option
                                className="text-red-500 font-bold"
                                value={0}
                            >
                                Tin đặc biệt
                            </option>
                            <option
                                className="text-[#ED0CC9] font-bold"
                                value={1}
                            >
                                Tin đặc sắc
                            </option>
                            <option
                                className="text-blue-500 font-bold"
                                value={2}
                            >
                                Tin thường
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            {isLoggedIn && (
                <div className="items">
                    {message && <div className="bg-white">{message}</div>}
                    {arrSavedPostId.length > 0 &&
                        real_homes.length > 0 &&
                        real_homes.map((item) => {
                            return (
                                <Item
                                    key={item._id}
                                    images={JSON.parse(item?.images.url)}
                                    shortDescription={
                                        item?.description.title_description
                                    }
                                    price={item?.description.price}
                                    area={item?.description.area}
                                    bedroom={item?.description.bedroom}
                                    toilet={item?.description.toilet}
                                    address={item?.address}
                                    content={
                                        item?.description.content_description
                                    }
                                    user={item?.user_post}
                                    _id={item?._id}
                                    upAt={item.createdAt}
                                    active={
                                        arrSavedPostId.includes(item._id)
                                            ? "active"
                                            : ""
                                    }
                                    news_type_id={item?.news_type_id}
                                />
                            );
                        })}
                </div>
            )}
            {!isLoggedIn && (
                <div className="items">
                    {message && <div className="bg-white">{message}</div>}
                    {real_homes.length > 0 &&
                        real_homes.map((item) => {
                            return (
                                <Item
                                    key={item._id}
                                    images={JSON.parse(item?.images.url)}
                                    shortDescription={
                                        item?.description.title_description
                                    }
                                    price={item?.description.price}
                                    area={item?.description.area}
                                    bedroom={item?.description.bedroom}
                                    toilet={item?.description.toilet}
                                    address={item?.address}
                                    content={
                                        item?.description.content_description
                                    }
                                    user={item?.user_post}
                                    _id={item?._id}
                                    upAt={item.createdAt}
                                    news_type_id={item?.news_type_id}
                                />
                            );
                        })}
                </div>
            )}
            {real_homes.length > 0 && (
                <div className="mt-2 w-[100%]">
                    <ReactPaginate
                        className=""
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={page_count}
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
    );
};
export default memo(List);
