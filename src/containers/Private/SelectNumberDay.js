import React, { memo, useState } from "react";
import { NumberDay } from "../components";

const SelectNumberDay = ({ setshowSelNumday, payload, setpayload }) => {
    const [SelectNumberDay, setSelectNumberDay] = useState({
        number_day: "",
        total_price: "",
    });

    // wait submit then setpayload. If not render unnecessary
    const handleSubmitSelect = (e) => {
        e.stopPropagation();
        setpayload((prev) => ({
            ...prev,
            number_day: SelectNumberDay.number_day,
            total_price: SelectNumberDay.total_price,
        }));
        setshowSelNumday(false);
    };

    return (
        <div
            className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 flex justify-center "
            onClick={(e) => {
                e.stopPropagation();
                setshowSelNumday(false);
            }}
        >
            <div
                className="w-[40%] bg-white my-[200px] flex flex-col items-center py-[50px] px-[100px] gap-3 rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    setshowSelNumday(true);
                }}
            >
                <p className="text-[26px] font-bold">{payload.news_type}</p>
                <p className="text-[18px]">Chọn số ngày hiển thị</p>
                <NumberDay
                    number_day="5"
                    unit_price={payload.unit_price}
                    SelectNumberDay={SelectNumberDay}
                    setSelectNumberDay={setSelectNumberDay}
                />
                <NumberDay
                    number_day="10"
                    unit_price={payload.unit_price}
                    SelectNumberDay={SelectNumberDay}
                    setSelectNumberDay={setSelectNumberDay}
                />
                <NumberDay
                    number_day="15"
                    unit_price={payload.unit_price}
                    SelectNumberDay={SelectNumberDay}
                    setSelectNumberDay={setSelectNumberDay}
                />
                <NumberDay
                    number_day="30"
                    unit_price={payload.unit_price}
                    SelectNumberDay={SelectNumberDay}
                    setSelectNumberDay={setSelectNumberDay}
                />
                <p
                    className="mt-4 py-1 rounded-xl bg-[#E51717] text-white text-[18px] w-full cursor-pointer hover:bg-red-400"
                    onClick={(e) => {
                        handleSubmitSelect(e);
                    }}
                >
                    Xác nhận
                </p>
            </div>
        </div>
    );
};

export default memo(SelectNumberDay);
