import { Link, createSearchParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { formatUniToString, path } from "../../../utils/constant";
import icons from "../../../utils/icons";
import {
    LogoNav,
    pushnews,
    registeruser,
    Login,
    heart,
    pageManagement,
    mdi_user,
} from "../../../assets/images/index";
import { useRef } from "react";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/auth";

const { MdPostAdd, AiOutlineHeart, RiUserSettingsLine, RiLogoutCircleRLine } =
    icons;

const Header = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { transaction_types, total_all_save_post } = useSelector(
        (state) => state.real_home
    );
    const { user_data } = useSelector((state) => state.user);
    const [Show, setShow] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const headerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                dispatch(actions.actionUser());
                dispatch(actions.actionGetSavePost());
                dispatch(actions.actionGetSavePostLimit({ page: 0 }));
                dispatch(actions.realHomeByUserUnPay());
            }, 2000);
        }
        // if (isLoggedIn && !user_data) {
        //     dispatch(logout());
        //     navigate(`/${path.LOGIN}`);
        // }
        // console.log("ok");
    }, [isLoggedIn]);

    useEffect(() => {
        headerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [location.search]);

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate(`/${path.LOGIN}`);
    };

    const overListItem = () => {
        setShow(true);
    };
    const leaveListItem = () => {
        setShow(false);
    };

    return (
        <div ref={headerRef} className="w-full">
            <header className="flex items-center justify-evenly mb-1 h-[100px] bg-white">
                <div className="col-md-2 ml-[30px]">
                    <div className="w-[170px] h-[100px]">
                        <Link to={"/"}>
                            <img
                                className="hover:drop-shadow-2xl object-contain w-[100%] h-[120px] border-none hover:translate-x-3"
                                src={LogoNav}
                                alt="logo"
                            ></img>
                        </Link>
                    </div>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 font-normal w-[40%]">
                    <li className="m-2 px-2">
                        <Link to={"/"}>
                            <div className="hover:font-bold text-blue-600 hover:text-blue-700 text-lg">
                                Trang chủ
                            </div>
                        </Link>
                    </li>
                    {transaction_types?.length > 0 &&
                        transaction_types.map((item) => {
                            return (
                                <li key={item._id} className="m-2 px-2">
                                    <div
                                        className="hover:font-bold text-blue-600 hover:text-blue-700 hover:cursor-pointer hover:underline text-lg"
                                        onClick={() =>
                                            navigate({
                                                pathname: formatUniToString(
                                                    item.name
                                                ),
                                                search: createSearchParams({
                                                    transaction_type_id:
                                                        item._id,
                                                }).toString(),
                                            })
                                        }
                                    >
                                        {item.name}
                                    </div>
                                </li>
                            );
                        })}
                    <li className="m-2 px-2">
                        <Link to={"/bang-gia-dich-vu"}>
                            <div className="hover:font-bold text-blue-600 hover:text-blue-700 text-lg">
                                Bảng giá dịch vụ
                            </div>
                        </Link>
                    </li>
                    <li className="m-2 px-2">
                        <Link to={"/blog"}>
                            <div className="hover:font-bold text-blue-600 hover:text-blue-700 text-lg">
                                Blog
                            </div>
                        </Link>
                    </li>
                </ul>

                {isLoggedIn && (
                    <div className="col-md-4 flex items-center text-ellipsis whitespace-nowrap justify-end w-[30%]">
                        <Link
                            to={`/rieng-tu/${path.MANAGEMENT_PAGE}`}
                            className="hover:drop-shadow-2xl hover:text-gray-600 hover:font-bold hover:bg-green-200 rounded-2xl hover:translate-y-2"
                        >
                            <div className="TagANav flex m-2 justify-item items-center text-lg h-[30px] w-[150px]">
                                <img
                                    src={pageManagement}
                                    alt="pageManagement"
                                    className="pr-1"
                                ></img>
                                Trang quản lý
                            </div>
                        </Link>
                        <Link
                            to={`/rieng-tu/${path.SAVED_POST}`}
                            className="hover:drop-shadow-2xl hover:font-bold hover:text-gray-600 hover:bg-green-200 rounded-xl hover:translate-y-2"
                        >
                            <div className="TagANav m-2 flex justify-item items-center text-lg h-[30px] w-[130px] relative">
                                <img
                                    src={heart}
                                    alt="heart"
                                    className="pr-1"
                                ></img>
                                <p className="bg-red-500 text-white rounded-full p-1 absolute h-[24px] w-[24px] items-center justify-center flex font-bold top-0 left-6 mt-[-10px]">
                                    {total_all_save_post}
                                </p>
                                Yêu thích
                            </div>
                        </Link>
                        <div className="m-2 flex">
                            <div
                                className="TagUserNav rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[50px] w-[50px] relative cursor-pointer z-[10000]"
                                onMouseOver={overListItem}
                                onMouseLeave={leaveListItem}
                            >
                                <Link
                                    to={`/trang-ca-nhan/${user_data?._id}`}
                                    className="cursor-pointer"
                                >
                                    <span className="animate-ping absolute inline-flex h-[6px] w-[6px] rounded-full bg-green-500 opacity-100 ml-[16px] mb-[40px]"></span>
                                    {user_data && (
                                        <img
                                            src={user_data?.avt || mdi_user}
                                            alt="avatar"
                                            className="rounded-full h-[50px] w-[50px]"
                                        ></img>
                                    )}
                                </Link>
                                {Show && (
                                    <div
                                        onMouseOver={overListItem}
                                        onMouseLeave={leaveListItem}
                                        className="absolute bg-white border-2 right-0 top-full shadow-md rounded-md p-2 w-[280px] h-[370px] z-[10000]"
                                    >
                                        <div className="flex cursor-pointer">
                                            <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[70px] w-[70px] mb-2 mx-2">
                                                <span className="animate-ping absolute inline-flex h-[8px] w-[8px] rounded-full bg-green-500 opacity-100 ml-[55px] mb-[50px]"></span>
                                                <img
                                                    src={
                                                        user_data?.avt ||
                                                        mdi_user
                                                    }
                                                    alt="avatar"
                                                    className="h-[65px] w-[70px] rounded-full"
                                                ></img>
                                            </div>
                                            <Link
                                                to={`/trang-ca-nhan/${user_data?._id}`}
                                                className="flex flex-col mx-4 my-2"
                                            >
                                                <div className="text-black text-lg">
                                                    <b>
                                                        {user_data
                                                            ? `${user_data.first_name} ${user_data.last_name}`
                                                            : ""}
                                                    </b>
                                                </div>
                                                <div className="text-blue-500 text-md hover:font-bold">
                                                    Trang cá nhân
                                                </div>
                                            </Link>
                                        </div>
                                        {/* list item */}
                                        <div className="m-2">
                                            <Link
                                                to={`/rieng-tu/${path.MANAGEMENT_PAGE}`}
                                                className="flex p-2 border-b border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer hover:font-bold hover:text-gray-700 hover:-translate-x-3"
                                            >
                                                <img
                                                    src={pageManagement}
                                                    alt="pageManagement"
                                                ></img>
                                                <p className="ml-2">
                                                    Trang quản lý
                                                </p>
                                            </Link>
                                            <Link
                                                to={`/rieng-tu/${path.POST_MANAGEMENT}`}
                                                className="flex p-2 border-b border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 hover:-translate-x-3"
                                            >
                                                <MdPostAdd
                                                    size={30}
                                                    className="mr-2"
                                                />
                                                <p>Quản lý tin đăng</p>
                                            </Link>
                                            <Link
                                                to={`/rieng-tu/${path.SAVED_POST}`}
                                                className="flex p-2 border-b border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 hover:-translate-x-3"
                                            >
                                                <AiOutlineHeart
                                                    size={30}
                                                    className="mr-2"
                                                />
                                                <p>Tin đăng dã lưu</p>
                                            </Link>
                                            <Link
                                                to={`/rieng-tu/${path.EDIT_INFOR}`}
                                                className="flex p-2 border-b border-gray-300 hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:text-gray-700 hover:-translate-x-3"
                                            >
                                                <RiUserSettingsLine
                                                    size={30}
                                                    className="mr-2"
                                                />
                                                <p>Sửa thông tin cá nhân</p>
                                            </Link>
                                            <div
                                                onClick={logOut}
                                                className="flex p-2 border-b border-gray-300  hover:bg-green-200 text-md rounded-lg cursor-pointer items-center hover:font-bold hover:-translate-x-3"
                                            >
                                                <RiLogoutCircleRLine
                                                    size={30}
                                                    className="mr-2"
                                                />
                                                <p>Đăng xuất</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link
                            to={`/rieng-tu/${path.CREATE_POST}`}
                            className="bg-red text-white rounded-xl pr-2 hover:drop-shadow-2xl hover:translate-y-2"
                        >
                            <div className="bg-red-500 m-2 text-white rounded-xl pr-2 flex justify-item items-center hover:font-bold text-lg h-[40px] w-[140px]">
                                <img
                                    src={pushnews}
                                    alt="post"
                                    className="pr-1"
                                ></img>
                                Đăng tin
                            </div>
                        </Link>
                    </div>
                )}
                {!isLoggedIn && (
                    <div className="col-md-3 text-end flex items-center justify-end w-[30%]">
                        <Link
                            to={"/dang-ky"}
                            className="hover:drop-shadow-2xl hover:text-gray-600 hover:font-bold hover:bg-green-200 rounded-2xl hover:translate-y-2"
                        >
                            <div className="TagANav m-2 flex justify-item items-center text-lg h-[30px] w-[120px]">
                                <img
                                    src={registeruser}
                                    alt="register"
                                    className="pr-1"
                                ></img>
                                Đăng ký
                            </div>
                        </Link>
                        <Link
                            to={"/dang-nhap"}
                            className="hover:drop-shadow-2xl hover:text-gray-600 hover:font-bold hover:bg-green-200 rounded-2xl hover:translate-y-2"
                        >
                            <div className="TagANav m-2 flex justify-item items-center text-lg h-[30px] w-[150px]">
                                <img
                                    src={Login}
                                    alt="login"
                                    className="pr-1"
                                ></img>
                                Đăng nhập
                            </div>
                        </Link>
                        <Link
                            to={`/rieng-tu/${path.CREATE_POST}`}
                            className="bg-red text-white rounded-xl pr-2 hover:drop-shadow-2xl hover:translate-y-2"
                        >
                            <div className="bg-red-500 m-2 text-white rounded-xl pr-2 flex justify-item items-center hover:font-bold text-lg h-[40px] w-[140px]">
                                <img
                                    src={pushnews}
                                    alt="post"
                                    className="pr-1"
                                ></img>
                                Đăng tin
                            </div>
                        </Link>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
