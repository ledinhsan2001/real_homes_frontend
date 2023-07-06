import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { GetNummberFromString } from "../../utils/constant";
import { EditPost } from ".";

const PaymentStatus = () => {
    const [isShow, setisShow] = useState(false);
    const dispatch = useDispatch();
    const [unpayment, setunpayment] = useState([]);
    const {
        real_homes_by_user_unpay,
        message,
        total_unpay,
        real_home_types_bs,
        real_home_types_r,
        transaction_types,
    } = useSelector((state) => state.real_home);

    useEffect(() => {
        dispatch(actions.realHomeByUserUnPay());
    }, [dispatch]);

    useEffect(() => {
        setunpayment(real_homes_by_user_unpay);
    }, [real_homes_by_user_unpay]);

    const checkIdNewsType = (payment) => {
        if (payment) {
            const news_id_from_pay = payment?.news_type?._id;
            if (news_id_from_pay === 0) {
                return 0;
            }
            if (news_id_from_pay === 1) {
                return 1;
            }
            if (news_id_from_pay === 2) {
                return 2;
            }
        }
    };

    const getNameTrans = (tran_id) => {
        let tran = transaction_types.find((item) => item._id === tran_id);
        return tran?.name;
    };

    const getNameRHType = (tran_id, real_id) => {
        if (tran_id === "645b56517cc26519dbcaad34") {
            return real_home_types_bs.find((item) => item._id === real_id)
                ?.name;
        }
        if (tran_id === "645b56517cc26519dbcaad4a") {
            return real_home_types_r.find((item) => item._id === real_id)?.name;
        }
    };

    return (
        <div>
            <div className="px-10 py-2">
                <div className="text-left text-black font-bold text-4xl pb-4">
                    Trạng thái thanh toán
                </div>
                <div className="my-2 flex justify-between items-center">
                    <div className="titleh6 text-left">
                        <b>{total_unpay}</b> trạng thái tin thanh toán.
                    </div>
                </div>
                <table className="table-fixed border-[2px] border-gray-600 border-separate bg-white w-full">
                    <thead className="text-lg bg-gray-500 text-white">
                        <tr>
                            <th className="border-[1px] border-gray-400 w-[8%]">
                                Mã tin đăng
                            </th>
                            <th className="border-[1px] border-gray-400 w-[10%]">
                                Ảnh bài đăng
                            </th>
                            <th className="border-[1px] border-gray-400 w-[20%]">
                                Tiêu đề
                            </th>
                            <th className="border-[1px] border-gray-400">
                                Loại giao dịch
                            </th>
                            <th className="border-[1px] border-gray-400">
                                Loại bất động sản
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Giá
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Ngày tạo tin
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Trạng thái
                            </th>
                            <th className="border-[1px] border-gray-400 w-[10%]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {unpayment?.length > 0 &&
                            unpayment?.map((item) => {
                                const images = item?.images?.url
                                    ? JSON.parse(item?.images?.url)
                                    : [];

                                return (
                                    <tr
                                        key={item._id}
                                        className="w-full h-[80px]"
                                    >
                                        <td className="border-[1px] border-gray-400 font-bold text-ellipsis whitespace-pre-line overflow-hidden">
                                            {`#${GetNummberFromString(
                                                item?._id
                                            )}`}
                                        </td>
                                        <td className="flex border-[1px] border-gray-400 items-center justify-center">
                                            <div>
                                                <img
                                                    className=" h-[80px] w-[100%] object-cover rounded-sm "
                                                    src={images[0]?.url}
                                                    alt="img"
                                                ></img>
                                            </div>
                                        </td>
                                        <td
                                            className={`border-[1px] border-gray-400 max-h-[65px] text-ellipsis text-center text-lg ml-1 items-center whitespace-pre-line overflow-hidden ${
                                                checkIdNewsType(item) === 0
                                                    ? `text-red-500`
                                                    : checkIdNewsType(item) ===
                                                      1
                                                    ? `text-[#ED0CC9]`
                                                    : "text-blue-700"
                                            } `}
                                        >
                                            <div>
                                                {`${item?.description?.title_description.slice(
                                                    0,
                                                    56
                                                )}...`}
                                            </div>
                                        </td>
                                        <td className="border-[1px] border-gray-400 text-blue-500 text-[20px] font-bold">
                                            <p>
                                                {getNameTrans(
                                                    item?.transaction_type_id
                                                )}
                                            </p>
                                        </td>
                                        <td className="border-[1px] border-gray-400 text-blue-500 text-[20px] font-bold">
                                            <p>
                                                {getNameRHType(
                                                    item?.transaction_type_id,
                                                    item?.real_home_type_id
                                                )}
                                            </p>
                                        </td>
                                        <td className="border-[1px] border-gray-400 text-[#16c784] text-[20px] font-bold">
                                            <p>{`${item?.description?.price}`}</p>
                                        </td>
                                        <td className="border-[1px] border-gray-400">
                                            {item?.start_date}
                                        </td>
                                        <td className="border-[1px] border-gray-400 bg-red-200">
                                            Chưa hoàn tất thanh toán
                                        </td>
                                        <td className="border-[1px] border-gray-400">
                                            <button
                                                className="cursor-pointer py-2 px-1 rounded-md bg-green-500 text-white overflow-hidden"
                                                onClick={() => {
                                                    dispatch(
                                                        actions.dataEdit(item)
                                                    );
                                                    setisShow(true);
                                                }}
                                            >
                                                Thanh toán
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {message && <div className="bg-white">{message}</div>}
                {isShow && <EditPost setisShow={setisShow} repayment />}
            </div>
        </div>
    );
};

export default PaymentStatus;
