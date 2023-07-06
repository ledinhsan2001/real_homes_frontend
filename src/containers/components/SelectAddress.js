import React from "react";

const SelectAddress = ({
    title,
    defaultValue,
    obligate,
    content,
    type,
    simple,
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
            <label className="font-bold my-2 flex" htmlFor="select-">
                {title}
                {obligate ? <p className="text-red-400">(*)</p> : ""}
            </label>
            {!simple && (
                <select
                    className={`${
                        type === "ward"
                            ? `flex items-center justify-between h-[50px] w-[42.5%] px-2 rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer outline-none`
                            : `flex items-center justify-between h-[50px] w-[90%] px-2 rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer outline-none`
                    }`}
                    value={value}
                    onFocus={() => seterrors([])}
                    onChange={(e) => setValue(e.target.value)}
                >
                    <option className="text-gray-500 font-bold" value="">
                        {defaultValue}
                    </option>
                    {content?.map((item) => {
                        return type === "province" ? (
                            <option
                                key={item.province_id}
                                value={item.province_id}
                            >
                                {item.province_name}
                            </option>
                        ) : type === "district" ? (
                            <option
                                key={item.district_id}
                                value={item.district_id}
                            >
                                {item.district_name}
                            </option>
                        ) : (
                            <option key={item.ward_id} value={item.ward_id}>
                                {item.ward_name}
                            </option>
                        );
                    })}
                </select>
            )}
            <p className="text-red-500">{errors && MessageErr()}</p>
            {simple && (
                <input
                    className="flex items-center justify-between h-[50px] w-[95%] px-2 relative rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer "
                    value={value}
                    placeholder={defaultValue}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            [type]: e.target.value,
                        }))
                    }
                />
            )}
        </div>
    );
};

export default SelectAddress;
