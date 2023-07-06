import React, { memo } from "react";
import { useSelector } from "react-redux";

const NewsType = ({
    content,
    color,
    unit_price,
    payload,
    setpayload,
    setshowSelNumday,
    seterrors,
    news_id,
}) => {
    const { news_type } = useSelector((state) => state.real_home);
    const news_type_id = news_type.find((item) => item.name === content)?._id;

    return (
        <div
            className={`${
                payload.news_type === +news_id
                    ? `text-blue-600 bg-blue-100`
                    : ""
            } flex border-b-gray-400 border-[1px] px-2 py-1 hover:bg-blue-100 hover:text-blue-600 cursor-pointer justify-between rounded-md`}
            onClick={(e) => {
                e.stopPropagation();
                setpayload((prev) => ({
                    ...prev,
                    news_type: news_type_id,
                    unit_price: unit_price,
                }));
                setshowSelNumday(true);
                seterrors("");
            }}
        >
            <div className="flex flex-col">
                <p className={`text-[16px] ${color}`}>{`Tin ${content}`}</p>
                <p className={`text-[14px]`}>{unit_price} VND/Ngày</p>
            </div>
            <div className="w-[30%] border-[1px] border-gray-400 rounded-xl justify-center items-center flex text-[16px] font-bold">
                Chọn số ngày
            </div>
        </div>
    );
};

export default memo(NewsType);
