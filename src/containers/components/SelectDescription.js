import React from "react";

const SelectDescription = ({
    title,
    placeHolder,
    obligate,
    type,
    value,
    setValue,
    errors,
}) => {
    const MessageErr = () => {
        let mess = errors.find((item) => item.name === type);
        return mess?.message;
    };
    return (
        <div className="flex flex-col w-full">
            <label className="font-bold my-2 flex" htmlFor={type}>
                {title}
                {obligate ? <p className="text-red-400">(*)</p> : ""}
            </label>
            <div className="flex relative">
                <input
                    id={type}
                    className={`flex items-center justify-between h-[50px] w-[90%] px-2 rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer outline-none`}
                    placeholder={placeHolder}
                    value={value}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            [type]: e.target.value,
                        }))
                    }
                />
                {type === "area" && (
                    <label className="flex bg-blue-400 w-[20%] h-[50px] rounded-r-xl items-center justify-center absolute ml-[70%]">
                        m<sup>2</sup>
                    </label>
                )}
                {type === "price" && (
                    <label className=" flex bg-blue-400 w-[20%] h-[50px] rounded-r-xl items-center justify-center absolute ml-[70%]">
                        đồng
                    </label>
                )}
            </div>
            <p className="text-red-500">{errors && MessageErr()}</p>
        </div>
    );
};

export default SelectDescription;
