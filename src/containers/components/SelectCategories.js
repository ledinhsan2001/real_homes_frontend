import React from "react";

const SelectCategories = ({
    title,
    defaultValue,
    content,
    value,
    setValue,
    errors,
    seterrors,
    name,
}) => {
    const MessageErr = () => {
        let mess = errors.find((item) => item.name === name);
        return mess?.message;
    };

    return (
        <div className="flex flex-col w-full">
            <label className="font-bold my-2 flex" htmlFor="select-category">
                {title} <p className="text-red-400">(*)</p>
            </label>
            <select
                id="select-category"
                className="text-blue-600 font-bold items-center justify-center h-[50px] w-[90%] px-2 rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer outline-none"
                onChange={(e) =>
                    setValue((prev) => ({ ...prev, [name]: e.target.value }))
                }
                value={value}
                onFocus={() => seterrors([])}
            >
                <option
                    className="border-2 right-0 top-full shadow-md rounded-xl w-[375px] bg-white"
                    value=""
                >
                    {defaultValue}
                </option>
                {content?.map((item) => {
                    return (
                        <option
                            className="absolute border-2 right-0 top-full shadow-md rounded-xl w-[375px] bg-white p-2 text-blue-600 font-bold cursor-pointer text-lg"
                            key={item._id}
                            value={item._id}
                        >
                            {item.name}
                        </option>
                    );
                })}
            </select>
            <p className="text-red-500">{errors && MessageErr()}</p>
        </div>
    );
};

export default SelectCategories;
