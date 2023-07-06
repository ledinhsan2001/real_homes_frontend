import React from "react";
import {
    news_common,
    news_featured,
    news_special,
    service1,
    service2,
    service3,
    service4,
    service5,
    service6,
} from "../../assets/images";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";

const { FaStar } = icons;

const ServicePrice = () => {
    const { news_type, number_day } = useSelector((state) => state.real_home);

    const savePrice = (total_price, num_day) => {
        let number_save;
        if (num_day === 5) {
            number_save = 0;
        }
        if (num_day === 10) {
            number_save = 0.1;
        }
        if (num_day === 15) {
            number_save = 0.2;
        }
        if (num_day === 30) {
            number_save = 0.3;
        }
        return total_price * number_save;
    };

    const handleScrollNews = (news_id) => {
        let element;
        if (news_id === 0) {
            element = document.getElementById("news_special");
        }
        if (news_id === 1) {
            element = document.getElementById("news_featured");
        }
        if (news_id === 2) {
            element = document.getElementById("news_common");
        }
        if (element) {
            //  Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col">
            <div className="bg-[#254ACC] mx-[10%]">
                <div className="flex p-10 items-center justify-center text-white text-[38px] font-bold relative">
                    <img
                        src={service1}
                        alt="service1"
                        className="absolute left-2 top-2"
                    ></img>
                    <img
                        src={service2}
                        alt="service2"
                        className="absolute left-[15%] bottom-2"
                    ></img>
                    <img
                        src={service3}
                        alt="service3"
                        className="absolute left-[30%] bottom-4"
                    ></img>
                    <img
                        src={service4}
                        alt="service4"
                        className="absolute right-[30%] bottom-6"
                    ></img>
                    <img
                        src={service5}
                        alt="service5"
                        className="absolute right-[15%] bottom-8"
                    ></img>
                    <img
                        src={service6}
                        alt="service6"
                        className="absolute right-[2%] bottom-6"
                    ></img>
                    Bảng giá dịch vụ
                </div>
            </div>
            <div className="bg-white mx-[10%] pt-10">
                <table className="table-fixed w-full">
                    <tbody className="text-2xl">
                        <tr className="text-center mt-2">
                            <td>Loại tin</td>
                            <td>Đơn giá/Ngày</td>
                            {number_day?.length > 0 &&
                                number_day.map((item) => {
                                    return (
                                        <td key={number_day?._id}>
                                            Đăng {item?.number_day} ngày
                                        </td>
                                    );
                                })}
                            <td>DEMO</td>
                        </tr>
                        {news_type?.length > 0 &&
                            news_type.map((item) => {
                                return (
                                    <tr className="text-center pt-2 h-[100px]">
                                        <td
                                            key={item?._id}
                                            className={`${
                                                item?._id === 0
                                                    ? `text-red-500`
                                                    : item?._id === 1
                                                    ? `text-[#ED0CC9]`
                                                    : "text-blue-700"
                                            }`}
                                        >
                                            {item?.name}
                                        </td>
                                        <td>{`${
                                            item?._id === 0
                                                ? `20.000 VNĐ`
                                                : item?._id === 1
                                                ? `10.000 VNĐ`
                                                : "1.000 VNĐ"
                                        }`}</td>
                                        {number_day?.length > 0 &&
                                            number_day.map((i) => {
                                                const total_price =
                                                    item?.unit_price *
                                                    i?.number_day;
                                                return (
                                                    <td
                                                        key={i._id + 10}
                                                        className={`${
                                                            i._id !== 0
                                                                ? `pt-[20px]`
                                                                : ""
                                                        }`}
                                                    >
                                                        {`${
                                                            total_price -
                                                            savePrice(
                                                                +total_price,
                                                                +i?.number_day
                                                            )
                                                        }.000 VND`}
                                                        {i._id !== 0 && (
                                                            <p className="text-sm text-green-400 text-end pr-[10%]">
                                                                {`Tiết kiệm ${savePrice(
                                                                    +total_price,
                                                                    +i?.number_day
                                                                )}.000 VND`}
                                                            </p>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        <td>
                                            <button
                                                onClick={() => {
                                                    handleScrollNews(item._id);
                                                }}
                                                className="p-2 bg-blue-500 hover:bg-blue-300 cursor-pointer text-white rounded-xl"
                                            >
                                                Xem Demo
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <p className="text-3xl items-center mt-[50px]">
                    Chú thích và minh họa
                </p>
                <div className="flex flex-col">
                    <div
                        id="news_special"
                        className="bg-[#37D595] mx-20 my-4 flex justify-between"
                    >
                        <div className="flex flex-col">
                            <div className="text-red-500 text-ellipsis text-left items-center whitespace-pre-line overflow-hidden text-2xl m-4">
                                <FaStar
                                    size={30}
                                    color="orange"
                                    className="inline-block mb-1"
                                />
                                Tin đặc biệt
                            </div>
                            <p className="mx-20 my-3 text-start text-xl text-white">
                                - Hiển thị trên các loại tin khác
                            </p>
                            <p className="mx-20 my-3 text-start text-xl text-white">
                                - Có gắn sao ở dầu tiêu đề
                            </p>
                            <p className="mx-20 my-3 text-start text-xl text-white">
                                - Có màu sắc riêng
                            </p>
                        </div>
                        <img src={news_special} alt="img_special"></img>
                    </div>
                    <div
                        id="news_featured"
                        className="bg-[#f3c2e3] mx-20 my-4 flex justify-between"
                    >
                        <div className="flex flex-col">
                            <div className="text-[#ED0CC9] text-ellipsis text-left items-center whitespace-pre-line overflow-hidden text-2xl m-4">
                                <FaStar
                                    size={30}
                                    color="orange"
                                    className="inline-block mb-1"
                                />
                                Tin đặc sắc
                            </div>
                            <p className="mx-20 my-3 text-start text-xl text-black">
                                - Hiển thị trên các loại tin khác và sau tin đặc
                                biệt
                            </p>
                            <p className="mx-20 my-3 text-start text-xl text-black">
                                - Có gắn sao ở dầu tiêu đề
                            </p>
                            <p className="mx-20 my-3 text-start text-xl text-black">
                                - Có màu sắc riêng
                            </p>
                        </div>
                        <img src={news_featured} alt="img_featured"></img>
                    </div>
                    <div
                        id="news_common"
                        className="bg-gray-300 mx-20 my-4 flex justify-between"
                    >
                        <div className="flex flex-col">
                            <div className="text-blue-700 text-ellipsis text-left items-center whitespace-pre-line overflow-hidden text-2xl m-4">
                                <FaStar
                                    size={30}
                                    color="orange"
                                    className="inline-block mb-1"
                                />
                                Tin thường
                            </div>
                            <p className="mx-20 my-3 text-start text-xl  text-black">
                                - Hiển thị sau cuối các loại tin
                            </p>
                            <p className="mx-20 my-3 text-start text-xl  text-black">
                                - không có gắn sao ở dầu tiêu đề
                            </p>
                            <p className="mx-20 my-3 text-start text-xl  text-black">
                                - Có màu sắc riêng
                            </p>
                        </div>
                        <img src={news_common} alt="img_common"></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePrice;
