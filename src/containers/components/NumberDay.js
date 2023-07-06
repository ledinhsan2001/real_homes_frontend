import React, { memo } from "react";

const NumberDay = ({
    number_day,
    unit_price,
    SelectNumberDay,
    setSelectNumberDay,
}) => {
    let total_price = +unit_price * +number_day;

    const savePrice = () => {
        let number_save;
        if (number_day === "5") {
            number_save = 0;
        }
        if (number_day === "10") {
            number_save = 0.1;
        }
        if (number_day === "15") {
            number_save = 0.2;
        }
        if (number_day === "30") {
            number_save = 0.3;
        }
        return total_price * number_save;
    };

    const final_price = total_price - savePrice();
    return (
        <div
            className={`${
                number_day === SelectNumberDay.number_day ? `bg-gray-200` : ""
            } flex flex-col border-b-2 border-gray-300 text-start w-full hover:bg-gray-200 cursor-pointer h-[50px] justify-center`}
            onClick={() => {
                setSelectNumberDay({
                    number_day: number_day,
                    total_price: final_price,
                });
            }}
        >
            <div className="font-bold text-[16px] mx-[10%] flex">
                {`${number_day} ngày: ${final_price}.000 VND`}{" "}
                <p className="line-through text-gray-400 ml-2 text-[14px]">
                    {number_day !== "5" ? `${total_price}.000 VND` : ""}
                </p>
            </div>
            <p className="font-bold text-[14px] text-green-400 mx-[15%]">
                {number_day !== "5" ? `Tiết kiệm ${savePrice()}.000` : ""}
            </p>
        </div>
    );
};

export default memo(NumberDay);
