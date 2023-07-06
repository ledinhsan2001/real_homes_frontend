import React, { memo, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { getNumbersArea, getNumbersPrice } from "../../utils/constant";
import { getCodeRangePrice, getCodeRangeArea } from "../../utils/constant";

const { GrLinkPrevious } = icons;

const SelectForm = ({
    setIsShowForm,
    content,
    text,
    name,
    handleSubmit,
    queries,
    rental,
    arrmaxmin,
    activeQuickPick,
    setactiveQuickPick,
}) => {
    const [activeEle, setActiveEle] = useState("");

    const [range1, setRange1] = useState(
        name === "price" && arrmaxmin.pricearr
            ? arrmaxmin?.pricearr[0]
            : name === "area" && arrmaxmin?.areaarr
            ? arrmaxmin?.areaarr[0]
            : 0
    );
    const [range2, setRange2] = useState(
        name === "price" && arrmaxmin?.pricearr
            ? arrmaxmin?.pricearr[1]
            : name === "area" && arrmaxmin?.areaarr
            ? arrmaxmin?.areaarr[1]
            : 100
    );

    useEffect(() => {
        if (name === "price") {
            setActiveEle(activeQuickPick?.price_id);
        }
        if (name === "area") {
            setActiveEle(activeQuickPick?.area_id);
        }
        // eslint-disable-next-line
    }, [activeQuickPick]);

    useEffect(() => {
        const element = document.getElementById("active-range");
        if (element) {
            let final_range1 = range2 < range1 ? range2 : range1;
            element.style.left = `${final_range1}%`;
            //
            let final_range2 = range1 > range2 ? 100 - range1 : 100 - range2;
            element.style.right = `${final_range2}%`;
        }
    }, [range1, range2]);

    const handleClick = (e, value) => {
        if (activeEle) {
            setActiveEle("");
            setactiveQuickPick("");
        }
        const elementId = document.getElementById("rangeGray");
        const locationBound = elementId.getBoundingClientRect();
        let percent = value
            ? value
            : Math.round(
                  ((e.clientX - locationBound.left) * 100) / locationBound.width
              );
        //Check distance to bring track to value percent
        if (Math.abs(percent - range1) <= Math.abs(percent - range2)) {
            setRange1(percent);
        } else {
            setRange2(percent);
        }
    };

    const FormatPercent = (percent) => {
        return name === "price"
            ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
            : Math.ceil(Math.round(percent * 0.9) / 5) * 5;
    };
    const convertTo100 = (percent) => {
        return name === "price"
            ? Math.floor((percent / 15) * 100)
            : Math.floor((percent / 90) * 100);
    };

    //Click select fast
    const handPrice = (code, value) => {
        setActiveEle(code);
        //arr number
        let arrRange =
            name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
        if (arrRange.length === 1) {
            if (+arrRange[0] === 1) {
                setRange1(0);
                setRange2(convertTo100(1));
            }
            if (+arrRange[0] === 20) {
                setRange1(0);
                setRange2(convertTo100(20));
            }
            if (+arrRange[0] === 15 || +arrRange[0] === 90) {
                setRange1(100);
                setRange2(100);
            }
        }
        if (arrRange.length === 2) {
            setRange1(convertTo100(arrRange[0]));
            setRange2(convertTo100(arrRange[1]));
        }
    };

    const beforeSubmit = (e) => {
        let min = range1 <= range2 ? range1 : range2;
        let max = range1 <= range2 ? range2 : range1;
        //convert percent to value max min
        let range_minmax =
            range1 === 100 && range2 === 100
                ? [FormatPercent(min), 999]
                : [FormatPercent(min), FormatPercent(max)];
        let arrType =
            name === "price"
                ? getCodeRangePrice(range_minmax, content)
                : name === "area"
                ? getCodeRangeArea(range_minmax, content)
                : [];

        // setactiveQuickPick
        let arr_id = arrType.map((item) => item._id);
        if (arr_id?.length === 1)
            setactiveQuickPick((prev) => ({
                ...prev,
                [`${name}_id`]: arr_id[0],
            }));

        //Send data to handSubmit => Search
        handleSubmit(
            e,
            {
                [name]: `${
                    range1 === 100 && range2 === 100
                        ? `Trên ${FormatPercent(range1)} ${
                              name === "price"
                                  ? rental
                                      ? "triệu +"
                                      : "tỷ +"
                                  : "m +"
                          }`
                        : range1 === 0 && range2 === 0
                        ? name === "price"
                            ? `--- Chọn mức giá ---`
                            : "--- Diện tích ---"
                        : `Từ ${FormatPercent(min)}-${FormatPercent(max)} ${
                              name === "price" ? (rental ? "triệu" : "tỷ") : "m"
                          }`
                }`,
                [`${name}_id`]: [arrType.map((item) => item._id)],
            },
            { [`${name}arr`]: [min, max] }
        );
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setIsShowForm(false);
            }}
            className="fixed z-50 left-0 bottom-0 right-0 top-0 bg-overlay-70 flex justify-center items-center"
        >
            <div
                className="w-1/3 bg-white rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsShowForm(true);
                }}
            >
                <div className="h-[45px] px-2 flex items-center border-b border-gray-300">
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsShowForm(false);
                        }}
                    >
                        <GrLinkPrevious size={24} className="cursor-pointer" />
                    </span>
                    <div className="ml-[35%]">{text}</div>
                </div>
                {(name === "area" || name === "price") && (
                    <div className="p-10 pt-20">
                        <div className="flex flex-col items-center justify-center relative">
                            <div className="absolute top-[-50px]">
                                <b>
                                    {range1 === 100 && range2 === 100
                                        ? `Trên ${FormatPercent(range1)} ${
                                              name === "price"
                                                  ? rental
                                                      ? "triệu +"
                                                      : "tỷ +"
                                                  : "m +"
                                          }`
                                        : `Từ ${
                                              range1 <= range2
                                                  ? FormatPercent(range1)
                                                  : FormatPercent(range2)
                                          } - ${
                                              range1 >= range2
                                                  ? FormatPercent(range1)
                                                  : FormatPercent(range2)
                                          } ${
                                              name === "price"
                                                  ? rental
                                                      ? "triệu"
                                                      : "tỷ"
                                                  : "m"
                                          }`}
                                </b>
                            </div>
                            <div
                                id="rangeGray"
                                className="range absolute top-0 bottom-0 bg-gray-400 w-full h-[5px]"
                                onClick={handleClick}
                            ></div>
                            <div
                                id="active-range"
                                className="range-thumb absolute top-0 bottom-0 bg-orange-400 h-[5px]"
                                onClick={handleClick}
                            ></div>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={range1}
                                onChange={(e) => {
                                    setRange1(+e.target.value);
                                    if (activeEle) {
                                        setActiveEle("");
                                        setactiveQuickPick("");
                                    }
                                }}
                                className="w-full absolute appearance-none pointer-events-none top-0 bottom-0"
                            />
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={range2}
                                onChange={(e) => {
                                    setRange2(+e.target.value);
                                    if (activeEle) {
                                        setActiveEle("");
                                        setactiveQuickPick("");
                                    }
                                }}
                                className="w-full absolute appearance-none pointer-events-none top-0 bottom-0"
                            />
                            <div className="absolute flex justify-between items-center left-0 right-0 top-3">
                                <span
                                    className="cursor-pointer ml-[-5px]"
                                    onClick={(e) => handleClick(e, 0)}
                                >
                                    0
                                </span>
                                <span
                                    className="cursor-pointer"
                                    onClick={(e) => handleClick(e, 100)}
                                >
                                    {name === "area"
                                        ? "Trên 90m +"
                                        : rental
                                        ? "15 triệu +"
                                        : "15 tỷ +"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-14">
                            <div className="text-left font-medium">
                                Chọn nhanh
                            </div>
                            <div className="flex gap-3 items-center flex-wrap w-full mt-10">
                                {content?.map((item) => {
                                    return (
                                        <button
                                            key={item._id}
                                            className={`p-1 cursor-pointer rounded-md ${
                                                activeEle === item._id
                                                    ? "text-white bg-blue-500"
                                                    : "bg-gray-200"
                                            }`}
                                            onClick={() =>
                                                handPrice(item._id, item.name)
                                            }
                                        >
                                            {item.name}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="mt-[50px] border-t border-solid border-gray-400 flex justify-between h">
                                <button
                                    className="m-2 p-2 w-[100px] bg-green-300 hover:bg-green-200 rounded-lg"
                                    onClick={() => {
                                        setRange1(0);
                                        setRange2(0);
                                        setActiveEle("");
                                        setactiveQuickPick("");
                                    }}
                                >
                                    Đặt lại
                                </button>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-gray-100 p-2 w-[100px] m-2 rounded-lg hover:bg-gray-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsShowForm(false);
                                        }}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="bg-orange-400 p-2 w-[50%] text-white m-2 rounded-lg hover:bg-orange-300"
                                        onClick={(e) => {
                                            beforeSubmit(e);
                                        }}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* is transaction_type, real_home_type, province */}
                {name !== "area" && name !== "price" && (
                    <div className="p-4 flex flex-col h-[600px] overflow-y-auto">
                        <span className="py-2 flex gap-2">
                            {/* transaction_type_id: null */}
                            <input
                                type="radio"
                                id="default"
                                defaultChecked={
                                    !queries[`${name}_id`] ? true : false
                                }
                                defaultValue={text}
                                onClick={(e) => {
                                    handleSubmit(e, {
                                        [name]: text,
                                        [`${name}_id`]: null,
                                    });
                                }}
                            />
                            <label htmlFor="default">{text}</label>
                        </span>
                        {content?.map((item) => {
                            return (
                                <span
                                    key={item._id}
                                    className="py-2 flex gap-2 hover:cursor-pointer"
                                >
                                    <input
                                        className=" hover:cursor-pointer"
                                        type="radio"
                                        name={name}
                                        id={item._id}
                                        defaultChecked={
                                            item._id === queries[`${name}_id`]
                                                ? true
                                                : false
                                        }
                                        defaultValue={item.name}
                                        onClick={(e) => {
                                            handleSubmit(e, {
                                                [name]: item.name,
                                                [`${name}_id`]: item._id,
                                            });
                                        }}
                                    />
                                    <label
                                        htmlFor={item._id}
                                        className=" hover:cursor-pointer"
                                    >
                                        {item.name}
                                    </label>
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(SelectForm);
