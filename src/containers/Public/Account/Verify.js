import React, { useState } from "react";
import InputRegister from "./InputRegister";
import { useNavigate } from "react-router-dom";
import { validate_data } from "../../../utils/validate_data";
import Swal from "sweetalert2";
import { path } from "../../../utils/constant";
import { apiVerify } from "../../../services";

const Verify = ({ setsendOtp, phone, newpassword }) => {
    const navigate = useNavigate();
    const [errors, seterrors] = useState("");
    const [payload, setpayload] = useState({
        OTP: "",
        phone: phone ? phone : "",
        newpassword: newpassword ? newpassword : "",
    });

    const handleVerify = async (e) => {
        e.stopPropagation();
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Lỗi nhập thông tin!", "error");
        } else {
            const response = await apiVerify(payload);
            if (response.data.success === true) {
                Swal.fire("Thành công!", response.data.message, "success");
                setsendOtp(false);
                navigate(`/${path.LOGIN}`);
            } else {
                Swal.fire("Lỗi!", response.data.message, "error");
            }
        }
    };

    return (
        <div>
            <div
                className="flex absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 justify-center w-full"
                onClick={(e) => {
                    e.stopPropagation();
                    setsendOtp(false);
                }}
            >
                <div
                    className="w-[40%] rounded-md flex flex-col bg-white mt-[100px] items-center h-[500px] justify-center gap-8"
                    onClick={(e) => {
                        e.stopPropagation();
                        setsendOtp(true);
                    }}
                >
                    <p className="font-bold text-[40px]">Xác minh OTP</p>
                    <div className="flex flex-col gap-2 w-full items-center">
                        <InputRegister
                            text="Mã OTP"
                            placeholder="0000"
                            name="OTP"
                            value={payload?.OTP}
                            setValue={setpayload}
                            errors={errors}
                            seterrors={seterrors}
                        />
                    </div>
                    <div className="flex justify-around mt-4 ">
                        <p
                            className="py-2 px-4 my-4 mx-2 rounded-md bg-red-500 text-lg text-white hover:bg-red-300 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setsendOtp(false);
                            }}
                        >
                            Hủy
                        </p>
                        <p
                            className="py-2 px-4 my-4 mx-2 rounded-md bg-green-500 text-lg text-white hover:bg-green-300 cursor-pointer"
                            onClick={(e) => {
                                handleVerify(e);
                            }}
                        >
                            Xác minh
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verify;
