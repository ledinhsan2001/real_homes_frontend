import React, { useEffect, useState } from "react";
import { TextAreaDescription, SelectDescription } from "../components";

const Description = ({ payload, setpayload, errors, seterrors, edit }) => {
    const [checked, setchecked] = useState(false);

    const isChecked = () => {
        setchecked(!checked);
    };

    useEffect(() => {
        if (checked) {
            setpayload((prev) => ({
                ...prev,
                price: "Thỏa thuận",
            }));
        } else {
            setpayload((prev) => ({
                ...prev,
                price: payload?.price || "",
            }));
        }
        // eslint-disable-next-line
    }, [checked]);

    return (
        <div>
            <div className="flex-col bg-white p-3 rounded-md mt-4 w-full">
                <div className="font-bold text-gray-500 py-2 px-3 font-serif text-lg">
                    Thông tin mô tả
                </div>
                <div className="flex-col my-3 px-3 gap-5">
                    <TextAreaDescription
                        title={"Tiêu đề"}
                        obliateTitle="Nhập ít nhất 10 ký tự"
                        placeHolder={
                            "Ví dụ: Chính chủ cần bán nhà số 100 Nguyễn Lương Bằng, Liên Chiểu,10 tỷ."
                        }
                        obligate={"true"}
                        type="title_description"
                        value={payload?.title_description}
                        setValue={setpayload}
                        errors={errors}
                        seterrors={seterrors}
                        name="title_description"
                    />
                </div>
                <div className="flex-col my-3 px-3 gap-5">
                    <TextAreaDescription
                        title={"Nội dung mô tả"}
                        obliateTitle="Nhập ít nhất 50 ký tự"
                        placeHolder={
                            "Nhập nội dung mô tả về bất động sản của bạn."
                        }
                        obligate={"true"}
                        type="content_description"
                        value={payload.content_description}
                        setValue={setpayload}
                        errors={errors}
                        seterrors={seterrors}
                        name="content_description"
                        edit={edit ? edit : undefined}
                    />
                </div>
                <div className="flex my-3 px-3 gap-5">
                    <div className="w-[100%] flex flex-col">
                        <SelectDescription
                            title={"Giá bán"}
                            placeHolder={"Ví dụ: 2 tỷ"}
                            obligate={"true"}
                            type="price"
                            value={payload.price}
                            setValue={setpayload}
                            errors={errors}
                            seterrors={seterrors}
                        />
                        <p className="text-sm text-red-500 mt-1">
                            (<b>Ví dụ: 100 triệu hoặc 1 tỷ/tháng.</b>)
                        </p>
                        <div className="flex items-center">
                            <input
                                id="thoathuan"
                                type="checkbox"
                                className="mt-3 h-[20px] w-[20px] mr-2 checked:border-none checked:border-[2px] checked:outline-double checked:outline-blue-500"
                                onClick={() => {
                                    isChecked();
                                }}
                            />
                            <label htmlFor="thoathuan" className="mt-3 text-lg">
                                Giá thỏa thuận
                            </label>
                        </div>
                    </div>
                    <SelectDescription
                        title={"Diện tích"}
                        placeHolder={"Ví dụ: 30"}
                        obligate={"true"}
                        type="area"
                        value={payload.area}
                        setValue={setpayload}
                        errors={errors}
                        seterrors={seterrors}
                    />
                </div>
                <div className="flex my-3 px-3 gap-5">
                    <SelectDescription
                        title={"Số phòng ngủ"}
                        placeHolder={"Ví dụ: 1"}
                        type="bedroom"
                        value={payload.bedroom}
                        setValue={setpayload}
                    />
                    <SelectDescription
                        title={"Số toilet"}
                        placeHolder={"Ví dụ: 1"}
                        type="toilet"
                        value={payload.toilet}
                        setValue={setpayload}
                    />
                </div>
            </div>
        </div>
    );
};

export default Description;
