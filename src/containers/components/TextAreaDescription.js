import React from "react";
import { TextEditor } from "../components/TextEditor";

const TextAreaDescription = ({
    title,
    obliateTitle,
    placeHolder,
    obligate,
    value,
    setValue,
    type,
    errors,
    seterrors,
    name,
    detail,
    edit,
}) => {
    const MessageErr = () => {
        let mess = errors.find((item) => item.name === name);
        return mess?.message;
    };

    return (
        <div className="flex flex-col w-full">
            <div className="font-bold my-2 flex">
                {title}
                {obligate ? <p className="text-red-400">(*)</p> : ""}
            </div>
            <p className="mb-2 text-sm">{obliateTitle}</p>
            {type === "title_description" && (
                <textarea
                    placeholder={placeHolder}
                    name={type}
                    type="text"
                    id={type}
                    value={value}
                    onChange={(e) => {
                        setValue((prev) => ({
                            ...prev,
                            [type]: e.target.value,
                        }));
                    }}
                    className={`flex items-center justify-between w-[95%] p-4 min-h-[80px] max-h-[200px]
                    } rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer resize-y outline-none overflow-auto`}
                    onFocus={() => seterrors([])}
                ></textarea>
            )}
            {type === "content_description" && (
                <div
                    className={`flex justify-between w-[95%] min-h-[300px] max-h-[700px]
                    } rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer resize-y outline-none overflow-auto`}
                    onFocus={() => seterrors([])}
                >
                    <TextEditor
                        placeHolder={placeHolder}
                        value={value}
                        setValue={setValue}
                        name={name}
                        detail={detail}
                        edit={edit}
                    />
                </div>
            )}
            <p className="text-red-500">{errors && MessageErr()}</p>
        </div>
    );
};

export default TextAreaDescription;
