import React, { useState, useEffect } from "react";
import { imgLogin } from "../../../assets/images";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import InputRegister from "./InputRegister";
import { validate_data } from "../../../utils/validate_data";
import { apiResetPassword } from "../../../services";
import Verify from "./Verify";
import { ProgressBar } from "react-loader-spinner";

const ResetPassword = () => {
    const [errors, seterrors] = useState("");
    const [sendOtp, setsendOtp] = useState(false);
    const [loading, setloading] = useState(false);
    const [payload, setpayload] = useState(() => {
        const init = {
            phone: "",
            newpassword: "",
            repassword: "",
        };
        return init;
    });

    const handleSubmitReset = async () => {
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Đặt lại mật khẩu không thành công!", "error");
        } else {
            setloading(true);
            try {
                const response = await apiResetPassword(payload);
                if (response.data.success === true) {
                    Swal.fire("Thành công!", response.data.message, "success");
                    setsendOtp(true);
                    setloading(false);
                } else {
                    Swal.fire("Lỗi!", response?.data?.message, "error");
                    setloading(false);
                }
            } catch (error) {
                Swal.fire("Lỗi!", error.response.data.message, "error");
                setloading(false);
            }
        }
    };

    return (
        <div className="w-full bg-white">
            <Header />
            <div className="bg-[#ccc6fd]">
                <div className="justify-center py-5 border-top flex">
                    <div className="border-[1px] border-black border-solid">
                        <img
                            src={imgLogin}
                            aria-label="Img Login"
                            width="450"
                            height="100%"
                        ></img>
                    </div>
                    <div className="flex flex-col border-[1px] border-black border-solid bg-white w-[30%] items-center">
                        <div className="mt-5">
                            <div className="font-['Irish_Grover'] text-[25px] not-italic">
                                ĐẶT LẠI MẬT KHẨU
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[60%] mt-4">
                            <InputRegister
                                text="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                name="phone"
                                value={payload?.phone}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                            />
                            <InputRegister
                                text="Mật khẩu mới"
                                placeholder="*********"
                                name="newpassword"
                                value={payload?.newpassword}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                                password
                            />
                            <InputRegister
                                text="Nhập lại mật khẩu"
                                placeholder="*********"
                                name="repassword"
                                value={payload?.repassword}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                                password
                            />
                        </div>
                        {loading ? (
                            <div className="flex items-center justify-center mb-3 w-[60%]">
                                <ProgressBar
                                    height="120"
                                    width="150"
                                    ariaLabel="progress-bar-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="progress-bar-wrapper"
                                    borderColor="#044890"
                                    barColor="#89949f"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center mt-10 mb-3 w-[60%]">
                                <button
                                    className="bg-[#044890] py-1 w-full text-white rounded-[15px] font-['Irish_Grover'] text-xl cursor-pointer hover:font-bold hover:bg-blue-400"
                                    type="submit"
                                    onClick={() => handleSubmitReset()}
                                >
                                    Đặt lại
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {sendOtp && (
                <Verify
                    setsendOtp={setsendOtp}
                    phone={payload.phone}
                    newpassword={payload.newpassword}
                />
            )}
            <Footer />
        </div>
    );
};
export default ResetPassword;
