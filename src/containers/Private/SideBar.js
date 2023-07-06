import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { memo, useEffect, useState } from "react";
import { path } from "../../utils/constant";
import icons from "../../utils/icons";
import { mdi_user, pushnew_black } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/auth";

const {
    MdPostAdd,
    AiOutlineHeart,
    RiUserSettingsLine,
    RiLogoutCircleRLine,
    SiMoneygram,
    TbReportMoney,
    VscSave,
} = icons;

const SideBar = () => {
    const { user_data } = useSelector((state) => state.user);
    const { isLoggedIn, message, accessToken, refreshToken } = useSelector(
        (state) => state.auth
    );
    const { total_unpay, total_all_save_post } = useSelector(
        (state) => state.real_home
    );
    const [active, setactive] = useState("dang-tin");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn && !user_data) {
            dispatch(logout());
            navigate(`/${path.LOGIN}`);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        let url = window.location.pathname;
        let pathname = url.split("/")[2];
        setactive(pathname);
    }, [window.location.pathname]);

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate(`/${path.LOGIN}`);
    };

    return (
        <div
            className="w-[290px] flex-none bg-white p-4 border-solid h-[100%]"
            onClick={(e) => {
                e.stopPropagation();
                setactive("");
            }}
        >
            <Link
                to={`/trang-ca-nhan/${user_data?._id}`}
                className="flex cursor-pointer"
            >
                <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[60px] w-[60px] pt-1 mb-2">
                    <span className="animate-ping absolute inline-flex h-[8px] w-[8px] rounded-full bg-green-500 opacity-100 ml-[50px] mb-[40px]"></span>
                    <img
                        src={user_data?.avt || mdi_user}
                        alt="mdi_user"
                        className="h-[65px] w-[70px] rounded-full"
                    ></img>
                </div>
                <div className="flex flex-col mx-3 my-2">
                    <div className="text-black text-lg">
                        <b>
                            {user_data
                                ? `${user_data?.first_name} ${user_data?.last_name}`
                                : ""}
                        </b>
                    </div>
                    <div className="text-blue-500 text-md hover:font-bold">
                        Trang cá nhân
                    </div>
                </div>
            </Link>
            {/* list item */}
            <div className="m-1">
                <Link
                    onClick={(e) => {
                        e.stopPropagation();
                        setactive("dang-tin");
                    }}
                    to={`/rieng-tu/${path.CREATE_POST}`}
                    className={`flex p-2 border-b ${
                        active === "dang-tin"
                            ? `font-bold text-gray-700 translate-x-3 bg-green-200 text-md rounded-lg hover:text-gray-700 items-center mt-3`
                            : `border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 mt-3 hover:translate-x-3`
                    } `}
                >
                    <img
                        src={pushnew_black}
                        alt="post"
                        className="ml-[-4px] mr-2 h-[25px]"
                    ></img>
                    Đăng tin
                </Link>
                <Link
                    onClick={(e) => {
                        e.stopPropagation();
                        setactive("quan-ly-tin-dang");
                    }}
                    to={`/rieng-tu/${path.POST_MANAGEMENT}`}
                    className={`flex p-2 border-b ${
                        active === "quan-ly-tin-dang" ||
                        active === "trang-quan-ly"
                            ? `font-bold text-gray-700 translate-x-3 bg-green-200 text-md rounded-lg hover:text-gray-700 items-center mt-3`
                            : `border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 mt-3 hover:translate-x-3`
                    } `}
                >
                    <MdPostAdd size={25} className="mr-2" />
                    <p>Quản lý tin đăng</p>
                </Link>
                <Link
                    onClick={(e) => {
                        e.stopPropagation();
                        setactive("trang-thai-thanh-toan");
                    }}
                    to={`/rieng-tu/${path.PAYMENT_STATUS}`}
                    className={`relative flex p-2 border-b ${
                        active === "trang-thai-thanh-toan"
                            ? `font-bold text-gray-700 translate-x-3 bg-green-200 text-md rounded-lg hover:text-gray-700 items-center mt-3`
                            : `border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 mt-3 hover:translate-x-3`
                    } `}
                >
                    <SiMoneygram size={25} className="mr-2" />
                    <p className="bg-red-500 text-white rounded-full p-1 absolute h-[24px] w-[24px] items-center justify-center flex font-bold top-0 right-3 mt-[-10px]">
                        {total_unpay && +total_unpay > 99 ? "99+" : total_unpay}
                    </p>
                    <p className="ml-2">Trạng thái thanh toán</p>
                </Link>
                <Link
                    onClick={(e) => {
                        e.stopPropagation();
                        setactive("lich-su-thanh-toan");
                    }}
                    to={`/rieng-tu/${path.HISTORY_PAYMENT}`}
                    className={`flex p-2 border-b ${
                        active === "lich-su-thanh-toan"
                            ? `font-bold text-gray-700 translate-x-3 bg-green-200 text-md rounded-lg hover:text-gray-700 items-center mt-3`
                            : `border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 mt-3 hover:translate-x-3`
                    } `}
                >
                    <TbReportMoney size={25} className="mr-2" />
                    <p className="ml-2">Lịch sử thanh toán</p>
                </Link>
                <Link
                    onClick={(e) => {
                        e.stopPropagation();
                        setactive("tin-dang-da-luu");
                    }}
                    to={`/rieng-tu/${path.SAVED_POST}`}
                    className={`relative flex p-2 border-b ${
                        active === "tin-dang-da-luu"
                            ? `font-bold text-gray-700 translate-x-3 bg-green-200 text-md rounded-lg hover:text-gray-700 items-center mt-3`
                            : `border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 mt-3 hover:translate-x-3`
                    } `}
                >
                    <AiOutlineHeart size={25} className="mr-2" />
                    <p className="bg-red-500 text-white rounded-full p-1 absolute h-[24px] w-[24px] items-center justify-center flex font-bold top-0 right-3 mt-[-10px]">
                        {total_all_save_post && +total_all_save_post > 99
                            ? "99+"
                            : total_all_save_post}
                    </p>
                    <p>Tin đăng đã lưu</p>
                </Link>
                <Link
                    onClick={(e) => {
                        e.stopPropagation();
                        setactive("bang-gia-dich-vu");
                    }}
                    to={`/${path.SERVICE_PRICE}`}
                    className={`flex p-2 border-b ${
                        active === "bang-gia-dich-vu"
                            ? `font-bold text-gray-700 translate-x-3 bg-green-200 text-md rounded-lg hover:text-gray-700 items-center mt-3`
                            : `border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 mt-3 hover:translate-x-3`
                    } `}
                >
                    <VscSave size={25} className="mr-2" />
                    <p>Bảng giá dịch vụ</p>
                </Link>
                <Link
                    onClick={(e) => {
                        e.stopPropagation();
                        setactive("sua-thong-tin-ca-nhan");
                    }}
                    to={`/rieng-tu/${path.EDIT_INFOR}`}
                    className={`flex p-2 border-b ${
                        active === "sua-thong-tin-ca-nhan"
                            ? `font-bold text-gray-700 translate-x-3 bg-green-200 text-md rounded-lg hover:text-gray-700 items-center mt-3`
                            : `border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 mt-3 hover:translate-x-3`
                    } `}
                >
                    <RiUserSettingsLine size={25} className="mr-2" />
                    <p>Sửa thông tin cá nhân</p>
                </Link>
                <div
                    onClick={logOut}
                    className="flex p-2 border-b border-gray-300  hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold mt-3 hover:translate-x-3"
                >
                    <RiLogoutCircleRLine size={25} className="mr-2" />
                    <p>Đăng xuất</p>
                </div>
            </div>
        </div>
    );
};

export default memo(SideBar);
