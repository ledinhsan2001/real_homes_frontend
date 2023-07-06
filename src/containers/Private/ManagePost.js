import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import {
    Link,
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { formatUniToString } from "../../utils/constant";
import moment from "moment";
import icons from "../../utils/icons";
import EditPost from "./EditPost";
import { apiDeleteRealHome, apiUpdateSold } from "../../services";
import Swal from "sweetalert2";
import { TfiFilter } from "react-icons/tfi";
import ReactPaginate from "react-paginate";

const { MdDeleteOutline, CiEdit, MdMoneyOff } = icons;

const ManagePost = () => {
    const [isShow, setisShow] = useState(false);
    const [isDeleted, setisDeleted] = useState(false);
    const [isSold, setisSold] = useState(false);
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const [real_home_user, setreal_home_user] = useState([]);
    const [payments, setpayments] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const {
        data_post_by_user,
        message_real_home_by_user,
        data_edit,
        total_data_post_by_user,
        page_count_post_by_user,
        payment_data,
    } = useSelector((state) => state.real_home);

    useEffect(() => {
        let obj = {};
        let page_value = params.get("page");
        let page = +page_value > 0 ? +page_value - 1 : 0;
        obj["page"] = +page;

        let filter = params.get("filter_id");
        if (filter) {
            obj["filter_id"] = +filter;
        }

        if (!data_edit) {
            setisShow(false);
            dispatch(actions.realHomeByUser(obj));
            setCurrentPage(+page);
        }
        // eslint-disable-next-line
    }, [data_edit, isDeleted, isSold, params]);

    useEffect(() => {
        setreal_home_user(data_post_by_user);
        // have use expiration_date
        setpayments(payment_data);
        // eslint-disable-next-line
    }, [data_post_by_user]);

    // day_expire have after day_current? n => expired
    const check_expired = (end) =>
        moment(end, "DD/MM/YYYY").isAfter(new Date());

    const handleDelete = async (item) => {
        Swal.fire({
            title: "Bạn có chắc muốn xóa không?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tất nhiên rồi!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteRealHome({
                    _id: item._id,
                    description_id: item.description._id,
                    images_id: item.images._id,
                });
                if (response?.data?.success === true) {
                    Swal.fire("Xóa!", response?.data?.message, "success");
                    setisDeleted(!isDeleted);
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            }
        });
    };

    const handleFilter = (value) => {
        let obj = {};
        obj["filter_id"] = +value;

        navigate({
            pathname: location.pathname,
            search: createSearchParams(obj).toString(),
        });
    };

    function handlePageClick(e) {
        let obj = {};

        let filter = params.get("filter_id");
        if (filter) {
            obj["filter_id"] = +filter;
        }

        obj["page"] = e.selected + 1;

        navigate({
            pathname: location.pathname,
            search: createSearchParams(obj).toString(),
        });
    }

    // reuse many
    const getPaymentByPost = (real_home_id) => {
        let obj_payment = payments.find(
            (i) => i.real_home._id === real_home_id
        );
        if (obj_payment) {
            return obj_payment;
        }
    };

    const handleSold = async (real_home_id) => {
        const response = await apiUpdateSold(real_home_id);
        if (response.data.success === true) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 500,
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.data.message,
                showConfirmButton: false,
                timer: 500,
            });
        }
        setisSold(!isSold);
    };

    return (
        <div>
            <div className="px-10 py-2">
                <div className="text-left text-black font-bold text-4xl pb-4">
                    Quản lý tin đăng
                </div>
                <div className="my-2 flex justify-between items-center">
                    <div className="titleh6 text-left">
                        <b>{total_data_post_by_user}</b> tin bất động sản của
                        bạn.
                    </div>
                    <div className=" flex items-center text-left gap-1">
                        <TfiFilter size={16} />
                        <p className="mr-4 text-[18px] font-bold">
                            Lọc tiêu chí:{" "}
                        </p>
                        <select
                            className=" h-[40px] w-[150px] px-2 rounded-xl border-solid border-1 border-black hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer"
                            defaultValue={""}
                            onChange={(e) => handleFilter(+e.target.value)}
                        >
                            <option
                                className="text-gray-500 font-bold"
                                value={""}
                            >
                                Tất cả
                            </option>
                            <option
                                className="text-red-500 font-bold"
                                value={1}
                            >
                                Tin đặc biệt
                            </option>
                            <option
                                className="text-[#ED0CC9] font-bold"
                                value={2}
                            >
                                Tin đặc sắc
                            </option>
                            <option
                                className="text-blue-500 font-bold"
                                value={3}
                            >
                                Tin thường
                            </option>
                            <option
                                className="font-bold text-red-300"
                                value={4}
                            >
                                Đã hết hạn
                            </option>
                            <option
                                className="font-bold text-blue-300"
                                value={5}
                            >
                                Chưa hết hạn
                            </option>
                            <option
                                className="text-gray-500 font-bold"
                                value={6}
                            >
                                Đã bán/thuê
                            </option>
                        </select>
                    </div>
                </div>
                <table className="table-fixed border-[2px] border-gray-600 border-separate bg-white w-full">
                    <thead className="text-lg bg-gray-500 text-white">
                        <tr>
                            <th className="border-[1px] border-gray-400 w-[12%]">
                                Đã bán/cho thuê
                            </th>
                            <th className="border-[1px] border-gray-400 w-[10%]">
                                Ảnh
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Tiêu đề
                            </th>
                            <th className="border-[1px] border-gray-400 w-[10%]">
                                Giá bán
                            </th>
                            <th className="border-[1px] border-gray-400 w-[16%]">
                                Ngày bắt đầu
                            </th>
                            <th className="border-[1px] border-gray-400 w-[14%]">
                                Ngày hết hạn
                            </th>
                            <th className="border-[1px] border-gray-400 w-[8%]">
                                Trạng thái
                            </th>
                            <th className="w-[10%]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {real_home_user?.length > 0 &&
                            real_home_user?.map((item) => {
                                const payment = getPaymentByPost(item?._id);
                                const images = item?.images?.url
                                    ? JSON.parse(item?.images?.url)
                                    : [];
                                return (
                                    <tr
                                        key={item._id}
                                        className="w-full h-[80px]"
                                    >
                                        <td
                                            className={`border-[1px] border-gray-400 font-bold justify-center`}
                                        >
                                            <div
                                                className={`flex justify-center gap-1`}
                                            >
                                                {item?.sold === false ? (
                                                    <button
                                                        className={`cursor-pointer py-2 px-2 rounded-md  text-white flex items-center overflow-hidden  bg-blue-400 hover:bg-blue-300`}
                                                        onClick={() =>
                                                            handleSold(
                                                                item?._id
                                                            )
                                                        }
                                                    >
                                                        <MdMoneyOff size={24} />
                                                        Đã bán/thuê
                                                    </button>
                                                ) : (
                                                    <div
                                                        className={`cursor-default py-2 px-2 rounded-md  text-white flex items-center overflow-hidden bg-gray-400 `}
                                                    >
                                                        <MdMoneyOff size={24} />
                                                        Đã bán/thuê
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="flex border-[1px] border-gray-400 items-center justify-center">
                                            <Link
                                                to={`/chi-tiet/${
                                                    item?._id
                                                }?${formatUniToString(
                                                    item?.description
                                                        ?.title_description
                                                )}`}
                                            >
                                                <img
                                                    className=" h-[80px] w-[100%] object-cover rounded-sm "
                                                    src={images[0]?.url}
                                                    alt="img"
                                                ></img>
                                            </Link>
                                        </td>
                                        <td
                                            className={`border-[1px] border-gray-400 max-h-[65px] text-ellipsis text-center text-lg ml-1 items-center whitespace-pre-line overflow-hidden ${
                                                item?.news_type_id === 0
                                                    ? `text-red-500`
                                                    : item?.news_type_id === 1
                                                    ? `text-[#ED0CC9]`
                                                    : "text-blue-700"
                                            } `}
                                        >
                                            <Link
                                                to={`/chi-tiet/${
                                                    item?._id
                                                }?${formatUniToString(
                                                    item?.description
                                                        ?.title_description
                                                )}`}
                                            >
                                                {`${item?.description?.title_description.slice(
                                                    0,
                                                    60
                                                )}...`}
                                            </Link>
                                        </td>
                                        <td className="border-[1px] border-gray-400 text-[#16c784] text-[20px] font-bold">
                                            {item?.description?.price}
                                        </td>
                                        <td className="border-[1px] border-gray-400">
                                            {payment?.start_date}
                                        </td>
                                        <td className="border-[1px] border-gray-400">
                                            {payment?.expiration_date}
                                        </td>
                                        {item?.sold === true ? (
                                            <td className="border-[1px] border-gray-400 bg-gray-300">
                                                Đã bán/thuê
                                            </td>
                                        ) : check_expired(
                                              payment?.expiration_date?.split(
                                                  " "
                                              )[3]
                                          ) ? (
                                            <td className="border-[1px] border-gray-400 bg-blue-200">
                                                Chưa hết hạn
                                            </td>
                                        ) : (
                                            <td className="border-[1px] border-gray-400 bg-red-200">
                                                Đã hết hạn
                                            </td>
                                        )}
                                        <td className="border-[1px] border-gray-400 font-bold justify-center">
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    className="cursor-pointer py-2 px-1 rounded-md bg-green-500 text-white flex items-center overflow-hidden hover:bg-green-400"
                                                    onClick={() => {
                                                        dispatch(
                                                            actions.dataEdit(
                                                                item
                                                            )
                                                        );
                                                        setisShow(true);
                                                    }}
                                                >
                                                    <CiEdit
                                                        color="white"
                                                        size={24}
                                                    />
                                                    Sửa
                                                </button>
                                                <button
                                                    className="cursor-pointer py-2 px-2 rounded-md bg-red-400 text-white flex items-center overflow-hidden hover:bg-red-300"
                                                    onClick={() =>
                                                        handleDelete(item)
                                                    }
                                                >
                                                    <MdDeleteOutline
                                                        size={24}
                                                    />
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {message_real_home_by_user && (
                    <div className="bg-white">{message_real_home_by_user}</div>
                )}

                {real_home_user?.length > 0 && (
                    <div className="mt-4 w-[100%]">
                        <ReactPaginate
                            className=""
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={page_count_post_by_user}
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
                {isShow && <EditPost setisShow={setisShow} />}
            </div>
        </div>
    );
};

export default ManagePost;
