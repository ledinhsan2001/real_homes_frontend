import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";
import { imgLogin } from "../../../assets/images";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import InputRegister from "./InputRegister";
import { useDispatch } from "react-redux";
import { validate_data } from "../../../utils/validate_data";
import { login } from "../../../store/actions/auth";
import actionTypes from "../../../store/actions/actionTypes";
import { apiLogin } from "../../../services";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, seterrors] = useState("");
    const [payload, setpayload] = useState(() => {
        const init = {
            phone1: "",
            password: "",
        };
        return init;
    });

    const handleSubmitLogin = async () => {
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Đăng nhập không thành công!", "error");
        } else {
            try {
                const response = await apiLogin(payload);
                if (response.data.success === true) {
                    dispatch(login(response));
                    Swal.fire("Thành công!", response.data.message, "success");
                    navigate(`/`);
                } else {
                    Swal.fire("Lỗi!", response?.data?.message, "error");
                    navigate(`/${path.LOGIN}`);
                    dispatch({
                        type: actionTypes.LOGIN_FAIL,
                        message: response.data.message,
                    });
                }
            } catch (error) {
                Swal.fire("Lỗi!", error.response.data.message, "error");
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
                                TÀI KHOẢN
                            </div>
                        </div>
                        <div className="flex justify-content-center py-3">
                            <Link
                                to={`/${path.LOGIN}`}
                                className="border-black border-[1px] border-solid rounded-[10px] bg-[#044890] text-white font-['Irish_Grover'] text-lg hover:font-bold hover:border-[2px]"
                            >
                                <input
                                    type="button"
                                    id="btnLogin"
                                    defaultValue={"Đăng nhập"}
                                    className="px-2"
                                />
                            </Link>
                            <Link
                                to={`/${path.REGISTER}`}
                                className="border-black border-[1px] border-solid rounded-[10px] font-['Irish_Grover'] text-lg hover:border-[2px] hover:border-blue-400 hover:text-black hover:font-bold"
                            >
                                <input
                                    className="px-2"
                                    type="button"
                                    id="btnRegister"
                                    defaultValue={"Đăng ký"}
                                />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 w-[60%] mt-4">
                            <InputRegister
                                text="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                name="phone1"
                                value={payload?.phone1}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                            />
                            <InputRegister
                                text="Mật khẩu"
                                placeholder="*********"
                                name="password"
                                value={payload?.password}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                                password
                            />
                        </div>
                        <div className="flex items-center justify-center mt-10 mb-3 w-[60%]">
                            <button
                                className="bg-[#044890] py-1 w-full text-white rounded-[15px] font-['Irish_Grover'] text-xl cursor-pointer hover:font-bold hover:bg-blue-400"
                                type="submit"
                                onClick={() => handleSubmitLogin()}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className="text-center text-sm">
                            <a
                                href={`/${path.RESET_PASSWORD}`}
                                target="_blank"
                                className="text-cyan-500"
                                rel="noreferrer"
                            >
                                Quên mật khẩu?
                            </a>
                        </div>
                        <div className="text-sm mt-4">
                            Tạo tài khoản{" "}
                            <Link
                                to={`/${path.REGISTER}`}
                                className="text-cyan-500"
                            >
                                ngay bây giờ?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Login;
