import React from "react";
import { Link } from "react-router-dom";
import { imgLogin } from "../../../assets/images";
import { path } from "../../../utils/constant";
import Swal from "sweetalert2";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState } from "react";
import InputRegister from "./InputRegister";
import { validate_data } from "../../../utils/validate_data";
import { apiRegister } from "../../../services";
import Verify from "./Verify";
import { ProgressBar } from "react-loader-spinner";

const Register = () => {
    const [errors, seterrors] = useState("");
    const [sendOtp, setsendOtp] = useState(false);
    const [loadding, setloadding] = useState(false);
    const [payload, setpayload] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        password: "",
        repassword: "",
    });

    const handleSubmitRegister = async () => {
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Đăng ký không thành công!", "error");
        } else {
            setloadding(true);
            try {
                const response = await apiRegister(payload);
                Swal.fire("Thành công!", response.data.message, "success");
                setsendOtp(true);
                setloadding(false);
            } catch (error) {
                Swal.fire("Lỗi!", error.response.data.message, "error");
                setloadding(false);
            }
        }
    };

    return (
        <div className="row w-full bg-white">
            <Header />
            <div className="bg-[#CCC6FD]">
                <div className="flex text-center justify-center py-5 border-top">
                    <div className="border-[1px] border-black border-solid pd-2">
                        <img
                            src={imgLogin}
                            aria-label="img Register"
                            width="580"
                            height="100%"
                        ></img>
                    </div>
                    <div className="flex flex-col border-[1px] border-black border-solid bg-white w-[30%] items-center">
                        <div className="mt-5">
                            <div className="font-['Irish_Grover'] text-[25px] not-italic">
                                TÀI KHOẢN
                            </div>
                        </div>
                        <div id="recaptcha-container"></div>
                        <div className="flex justify-center py-3">
                            <Link
                                to={`/${path.LOGIN}`}
                                className="border-black border-[1px] border-solid rounded-[10px] font-['Irish_Grover'] text-lg hover:border-[2px] hover:border-blue-400 hover:text-black hover:font-bold"
                            >
                                <input
                                    type="button"
                                    id="btnLogin"
                                    defaultValue={"Đăng nhập"}
                                    className="px-2 "
                                />
                            </Link>
                            <Link
                                to={`/${path.REGISTER}`}
                                className="border-black border-[1px] border-solid rounded-[10px] bg-[#044890] text-white font-['Irish_Grover'] text-lg hover:font-bold hover:border-[2px]"
                            >
                                <input
                                    type="button"
                                    id="btnRegister"
                                    defaultValue={"Đăng ký"}
                                    className="px-2"
                                />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 w-[60%]">
                            <InputRegister
                                text="Họ"
                                text1="Tên"
                                placeholder="Họ"
                                placeholder1="Tên"
                                name="first_name"
                                name1="last_name"
                                value={payload?.first_name}
                                value1={payload?.last_name}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                                double
                            />
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
                                text="Mật khẩu"
                                placeholder="*********"
                                name="password"
                                value={payload?.password}
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
                        {loadding ? (
                            <div className="flex items-center justify-center w-[60%]">
                                <ProgressBar
                                    height="120"
                                    width="120"
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
                                    type="button"
                                    onClick={() => handleSubmitRegister()}
                                >
                                    Đăng ký
                                </button>
                            </div>
                        )}
                        <div className="aRegister">
                            Bạn đã có tài khoản?
                            <Link
                                to={`/${path.LOGIN}`}
                                className="text-cyan-500 hover:font-bold"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {sendOtp && <Verify setsendOtp={setsendOtp} />}

            <Footer />
        </div>
    );
};
export default Register;

// import {
//     getAuth,
//     RecaptchaVerifier,
//     signInWithPhoneNumber,
// } from "firebase/auth";
// const auth = getAuth(firebaseCF);
// otp: "",
// buttonVerify: false,
// verifyOtp: false,
// verified: false,

// //show captcha trêngiao diện
// onCaptchaVerify = () => {
//     //run2 run6
//     window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//             size: "invisible",
//             callback: (response) => {
//                 //run4
//                 this.onSignInSubmit();
//                 //run9
//                 // reCAPTCHA solved, allow signInWithPhoneNumber.
//                 // ...
//             },
//         },
//         auth
//     );
// };

// //click verify
// onSignInSubmit = (e) => {
//     //run1 run5
//     this.onCaptchaVerify();
//     //run2 sau capcha.  run7

//     const phoneNumber = "+84" + this.state.formRegister.phone2;
//     const appVerifier = window.recaptchaVerifier;
//     //run3=> validateVerify form  run8

//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//         .then((confirmationResult) => {
//             // SMS sent. Prompt user to type the code from the message, then sign the
//             // user in with confirmationResult.confirm(code).
//             window.confirmationResult = confirmationResult;

//             //run10
//             const alert = () => {
//                 Swal.fire(
//                     "OTP!",
//                     `Mã otp đã gửi đến: ${phoneNumber}`,
//                     "success"
//                 );
//             };
//             alert();
//             this.setState({
//                 verifyOtp: true,
//             });
//             // ...
//         })
//         .catch((error) => {
//             // Error; SMS not sent
//             // ...
//         });
// };

// verifyCode = () => {
//     window.confirmationResult
//         .confirm(this.state.formRegister.otp)
//         .then((result) => {
//             // User signed in successfully.
//             // alert(result);
//             const errors = {};
//             errors.verify = "";
//             this.setState({
//                 errors: errors,
//             });
//             const alert = () => {
//                 Swal.fire("OTP!", `Xác nhận mã OTP thành công`, "success");
//             };
//             alert();
//             this.setState({
//                 verified: true,
//                 verifyOtp: false,
//             });
//             // ...
//         })
//         .catch((error) => {
//             // User couldn't sign in (bad verification code?)
//             const alert = () => {
//                 Swal.fire("OTP!", `Mã OTP không chính xác`, "error");
//             };
//             alert();
//             // ...
//         });
// };

/* <div className="formPhone">
            {this.state.buttonVerify ? (
                <input
                    type="button"
                    id="btn-verify"
                    className="d-flex justify-content-center col-4 outline-none"
                    defaultValue={
                        this.state.verified
                            ? "Verified"
                            : "Verify"
                    }
                    onClick={this.onSignInSubmit}
                />
            ) : null}
        </div>
        {errors.verify && (
            <div
                id="validationPhone2"
                className="alert alert-danger"
            >
                {errors.verify}
            </div>
        )}
    </div>

    {this.state.verifyOtp ? (
        <div className="formPhone">
            <label htmlFor="otp">Mã OTP</label>
            <br />
            <div className="verifyphone row">
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    className="col border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                    placeholder="Nhập OTP"
                    onChange={
                        this.handleChangeRegister
                    }
                />
                <input
                    type="button"
                    className="flex justify-content-center col-4  border-black border-[1px] border-solid rounded-[10px]"
                    defaultValue={"OTP"}
                    onClick={this.verifyCode}
                />
            </div>
        </div>
    ) : null}
<div className="formPhone">
    <label htmlFor="password2">Mật khẩu</label>
    <br />
    <input
        type="password"
        id="password2"
        name="password2"
        placeholder="**********"
        onChange={this.handleChangeRegister}
        className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
    />
    {errors.password2 && (
        <div
            id="validationPassword2"
            className="alert alert-danger"
        >
            {errors.password2}
        </div>
    )}
</div>
<div className="formPhone">
    <label htmlFor="repassword">
        Nhập lại mật khẩu
    </label>
    <br />
    <input
        type="password"
        id="repassword"
        name="repassword"
        placeholder="**********"
        onChange={this.handleChangeRegister}
        className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
    />
    {errors.repassword && (
        <div
            id="validationRePassword"
            className="alert alert-danger"
        >
            {errors.repassword}
        </div>
    )}
</div> */
