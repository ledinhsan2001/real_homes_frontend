import React, { memo, useState } from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { NewsType } from "../components";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SelectNumberDay from "./SelectNumberDay";
import { validate_data } from "../../utils/validate_data";
import Swal from "sweetalert2";
import { FormatDate } from "../../utils/formatDate";
import { apiCreatePayment } from "../../services/payment";
import { delDataEdit } from "../../store/actions";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { GetNummberFromString } from "../../utils/constant";

const Payment = ({
    setshowPayment,
    resetPayload,
    setshowCreatePost,
    id_post,
    address,
}) => {
    const [payload, setpayload] = useState({
        news_type: "",
        unit_price: "",
        total_price: "",
        number_day: "",
        id_post: id_post,
    });
    const [errors, seterrors] = useState("");
    const dispatch = useDispatch();
    const [showSelNumday, setshowSelNumday] = useState(false);
    const [isloading, setisloading] = useState(false);

    const MessageErr = (name) => {
        let mess = errors.find((item) => item.name === name);
        return mess?.message;
    };

    const handlePayment = async (e) => {
        e.stopPropagation();
        setisloading(true);
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire(
                "Lỗi!",
                "Bạn chưa hoàn thành các bước trước khi thanh toán!",
                "error"
            );
            setisloading(false);
        } else {
            // Payment
            try {
                // const windowFeatures = "left=500,top=100,width=600,height=700";
                const reponse = await apiCreatePayment(payload);
                window.open(reponse.data.data, "_self");

                // delete data_edit
                dispatch(delDataEdit());
                resetPayload();
                setshowPayment(false);
                setshowCreatePost(true);
                setisloading(false);
            } catch (error) {
                console.log(error);
                Swal.fire("Lỗi", "Thanh toán không thành công!", "error");
                setisloading(false);
            }
        }
    };

    return (
        <div className="bg-white justify-center w-[70%] flex flex-col gap-3 py-5 rounded-md mt-[50px]">
            <p className="text-3xl font-bold">Mua dịch vụ tin đăng</p>
            <p>
                {`#${GetNummberFromString(id_post)}`} - {address}
            </p>
            <div className="flex w-full px-[10%] gap-2">
                <div className="w-[60%] border-solid border-[1px] border-gray-400 flex flex-col text-start p-4 gap-3">
                    <p className="text-lg font-bold">Chọn gói tin đăng</p>
                    <p className="p-1 bg-[#F9C9DA] rounded-md">
                        Mua gói tin nổi bật tin đăng để được hiển thị và dễ dàng
                        tiếp cận với nhiều người hơn.
                    </p>
                    <NewsType
                        content="Thường"
                        color="font-bold text-blue-700"
                        unit_price="1.000"
                        payload={payload}
                        setpayload={setpayload}
                        setshowSelNumday={setshowSelNumday}
                        seterrors={seterrors}
                        news_id="2"
                    />
                    <NewsType
                        content="Đặc sắc"
                        color="font-bold text-[#ED0CC9]"
                        unit_price="5.000"
                        payload={payload}
                        setpayload={setpayload}
                        setshowSelNumday={setshowSelNumday}
                        seterrors={seterrors}
                        news_id="1"
                    />
                    <NewsType
                        content="Đặc biệt"
                        color="font-bold text-[#E51717]"
                        unit_price="20.000"
                        payload={payload}
                        setpayload={setpayload}
                        setshowSelNumday={setshowSelNumday}
                        seterrors={seterrors}
                        news_id="0"
                    />
                </div>
                <div className="w-[40%] bg-[#FFE8B6] py-4 px-2 flex flex-col h-fit gap-2">
                    <div className="flex items-center justify-center font-bold">
                        <BiMoneyWithdraw size={24} />
                        <p>Thông tin thanh toán</p>
                    </div>
                    <div className="flex justify-between p-2">
                        <p className="text-start">Loại tin:</p>
                        {payload.news_type === "Tin đặc biệt" && (
                            <p className="font-bold text-[#E51717]">
                                {payload.news_type}
                            </p>
                        )}
                        {payload.news_type === "Tin đặc sắc" && (
                            <p className="font-bold text-[#ED0CC9]">
                                {payload.news_type}
                            </p>
                        )}
                        {payload.news_type === "Tin thường" && (
                            <p className="font-bold text-blue-700">
                                {payload.news_type}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between p-2">
                        <p className="text-start">Đơn giá:</p>
                        <p className="text-green-500">
                            {payload.unit_price
                                ? `${payload.unit_price} VND`
                                : ""}
                        </p>
                    </div>
                    <div className="flex justify-between p-2">
                        <p className="text-start">Số ngày hiển thị:</p>
                        <p className="">
                            {payload.number_day
                                ? `${payload.number_day} ngày`
                                : ``}
                        </p>
                    </div>
                    <div className="flex justify-between p-2">
                        <p className="text-start">Ngày hết hạn:</p>
                        <p className="">
                            {payload.number_day
                                ? FormatDate(payload.number_day)
                                : ""}
                        </p>
                    </div>
                    <div className="flex justify-between p-2">
                        <p className="text-start">Tổng thanh toán:</p>
                        <p className="">
                            {payload.total_price
                                ? `${payload.total_price}.000 VND`
                                : ""}
                        </p>
                    </div>
                </div>
            </div>
            {errors && (
                <p className="bg-red-400 text-[18px] text-start mx-[10%] p-2 text-white rounded-md italic">
                    {MessageErr("news_type")}
                </p>
            )}
            <div className="flex text-[18px] font-bold text-start px-[10%]">
                Tổng thanh toán:
                <p className="text-green-400">
                    {payload.total_price
                        ? `${payload.total_price}.000 VND`
                        : ""}
                </p>
            </div>
            <div className="flex justify-around pl-[10%] w-[55%] text-[20px] mt-4">
                <p
                    className="px-4 py-2 bg-gray-300 rounded-xl flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        setshowPayment(false);
                        setshowCreatePost(true);
                    }}
                >
                    <AiOutlineArrowLeft />
                    Quay lại
                </p>
                <p
                    className="px-4 py-2 bg-[#2957cc] rounded-xl text-white flex justify-center items-center gap-2 cursor-pointer hover:bg-blue-300"
                    onClick={(e) => {
                        handlePayment(e);
                    }}
                >
                    {isloading ? (
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="30"
                            visible={true}
                        />
                    ) : (
                        "Thanh toán"
                    )}
                    <AiOutlineArrowRight size={24} />
                </p>
            </div>
            {showSelNumday && (
                <SelectNumberDay
                    setshowSelNumday={setshowSelNumday}
                    payload={payload}
                    setpayload={setpayload}
                />
            )}
        </div>
    );
};

export default memo(Payment);
