import { Link } from "react-router-dom";
import { LogoNav, paypal } from "../../../assets/images/index";
import { formatUniToString } from "../../../utils/constant";

const Footer = () => {
    return (
        <div className="bg-white mt-2 w-full border-b-black border-[1px]">
            <footer className="flex m-[50px] items-center justify-center">
                <div className="flex flex-col">
                    <Link to={"/"}>
                        <img
                            src={LogoNav}
                            alt="logo"
                            width="170"
                            height="100"
                            className="hover:drop-shadow-2xl"
                        ></img>
                    </Link>
                    <div className="mt-10">
                        <p>Hotline: 0326687233</p>
                        <p>
                            Địa chỉ: 100 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên
                            Chiểu, Đà Nẵng
                        </p>
                    </div>
                </div>
                <div className="flex flex-col text-left mx-[50px] gap-2 mt-[-70px]">
                    <div className="mb-3 font-bold">PHƯƠNG THỨC THANH TOÁN</div>
                    <Link to={"https://www.paypal.com/vn/home"} target="_blank">
                        <img
                            src={paypal}
                            alt="img_paypal"
                            width="120"
                            height="100"
                            className="hover:drop-shadow-2xl border-[2px] border-solid border-gray-100 rounded-lg"
                        ></img>
                    </Link>
                </div>
                <div className="flex flex-col text-left mx-[50px] gap-2">
                    <div className="mb-3 font-bold">VỀ BDS</div>
                    <Link to={`/`}>Trang chủ</Link>
                    <Link to={`/${formatUniToString("Giới thiệu")}`}>
                        Giới thiệu
                    </Link>
                    <Link to={`/${formatUniToString("Quy định sử dụng")}`}>
                        Quy định sử dụng
                    </Link>
                    <Link to={`/${formatUniToString("Liên hệ")}`}>Liên hệ</Link>
                </div>
                <div className="flex flex-col text-left mx-[50px] gap-2">
                    <div className="mb-3 font-bold">HỖ TRỢ KHÁCH HÀNG</div>
                    <Link to={`/${formatUniToString("Tin tức")}`}>Tin tức</Link>
                    <Link to={`/${formatUniToString("Bảng giá dịch vụ")}`}>
                        Bảng giá dịch vụ
                    </Link>
                    <Link to={`/${formatUniToString("Hướng dẫn đăng tin")}`}>
                        Hướng dẫn đăng tin
                    </Link>
                    <Link to={`/${formatUniToString("Chính sách đăng tin")}`}>
                        Chính sách đăng tin
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
