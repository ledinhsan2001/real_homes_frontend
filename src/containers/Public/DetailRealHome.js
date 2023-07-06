import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { realHomeDetail } from "../../store/actions/realHome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { bds } from "../../assets/images";
import { useState } from "react";
import icons from "../../utils/icons";
import moment from "moment";
import "moment/locale/vi";
import { GetNummberFromString, path } from "../../utils/constant";
import { mdi_user, ggmap } from "../../assets/images";
import Swal from "sweetalert2";
import { MapLeaflet, NewPost } from "../components";
import { TextEditor } from "../components/TextEditor";
import { apiDelSavePost, apiSavePost } from "../../services";

const {
    FaStar,
    FaVectorSquare,
    MdOutlineBed,
    FaToilet,
    MdOutlineLocationOn,
    ImPhone,
    FiHeart,
    GiMoneyStack,
    AiOutlineClockCircle,
} = icons;

const DetailRealHome = () => {
    const [real_home, setreal_home] = useState("");
    const [payment, setpayment] = useState("");
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [isHoverHeart, setIsHoverHeart] = useState(false);
    const [arrSavedPostId, setarrSavedPostId] = useState([]);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { real_home_detail, payment_detail, saved_post } = useSelector(
        (state) => state.real_home
    );

    useEffect(() => {
        dispatch(realHomeDetail({ id: id }));
    }, [id, dispatch]);

    useEffect(() => {
        real_home_detail && setreal_home(real_home_detail);
        payment_detail && setpayment(payment_detail);
    }, [real_home_detail, payment_detail]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleSendContact = () => {
        Swal.fire("Thành công!", "Gửi nội dung liên hệ thành công", "success");
    };

    const getProvince = (address) => {
        let arr = address.split(", ");
        let province = arr.pop();
        return province;
    };

    const handleScrollMap = () => {
        const element = document.getElementById("map");
        if (element) {
            //  Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            let arr = [];
            saved_post?.map((item) => arr.push(item?.real_home?._id));
            setarrSavedPostId(arr);
        }
    }, [saved_post]);

    useEffect(() => {
        if (arrSavedPostId.includes(real_home?._id)) {
            setIsHoverHeart(true);
        }
    }, [arrSavedPostId]);

    const callNotSave = async (realhome_id) => {
        try {
            const response = await apiDelSavePost(realhome_id);
            setIsHoverHeart(false);
            // Swal.fire({
            //     position: "top-end",
            //     icon: "success",
            //     title: response.data.message,
            //     showConfirmButton: false,
            //     timer: 500,
            // });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 500,
            });
        }
    };

    const callSave = async (realhome_id) => {
        if (!isLoggedIn) {
            navigate(`/${path.LOGIN}`);
        } else {
            const response = await apiSavePost(realhome_id);
            setIsHoverHeart(true);
            // Swal.fire({
            //     position: "top-end",
            //     icon: "success",
            //     title: response.data.message,
            //     showConfirmButton: false,
            //     timer: 500,
            // });
        }
    };

    return (
        <div className="bg-white">
            <div className="mx-[10%] ">
                <div className="flex flex-col">
                    <div className="w-[100%] my-6">
                        <div
                            className={`text-red-600 text-ellipsis text-left items-center whitespace-pre-line overflow-hidden text-3xl font-bold ${
                                payment?.news_type?._id === 0
                                    ? `text-red-500`
                                    : payment?.news_type?._id === 1
                                    ? "text-[#ED0CC9]"
                                    : `text-blue-500`
                            }`}
                        >
                            {payment?.news_type?._id !== 2 && (
                                <FaStar
                                    size={40}
                                    color="orange"
                                    className="inline-block mb-[10px] mr-2"
                                />
                            )}

                            {real_home?.description?.title_description}
                        </div>
                        <div className="text-ellipsis text-left items-center text-[17px]  whitespace-pre-line overflow-hidden flex">
                            <div>
                                <MdOutlineLocationOn
                                    size={24}
                                    className="m-1 inline-block"
                                />
                                {real_home?.address}
                            </div>
                            <div
                                className="flex items-center text-blue-500 underline hover:underline-offset-2 hover:font-bold cursor-pointer gap-1"
                                onClick={() => handleScrollMap()}
                            >
                                <img
                                    src={ggmap}
                                    alt="map"
                                    width={28}
                                    height={28}
                                    className="ml-10 inline-block"
                                />
                                Xem bản đồ
                            </div>
                        </div>
                        <div className="flex pt-1 items-center whitespace-pre-line overflow-hidden">
                            <div className="flex w-[69%] justify-evenly">
                                <span className="text-[#16c784] text-[20px] font-bold flex justify-center items-center">
                                    <GiMoneyStack className="mx-1" size={30} />
                                    {real_home?.description?.price}
                                </span>
                                <span className="flex justify-center text-[20px] items-center">
                                    <FaVectorSquare
                                        className="mx-1"
                                        size={22}
                                    />
                                    {real_home?.description?.area} m<sup>2</sup>
                                </span>
                                {real_home?.description?.bedroom !== 0 && (
                                    <span className="flex justify-center text-[20px] items-center">
                                        <MdOutlineBed
                                            className="mx-1"
                                            size={30}
                                        />
                                        {real_home?.description?.bedroom} pn
                                    </span>
                                )}
                                {real_home?.description?.toilet !== 0 && (
                                    <span className="flex justify-center text-[20px] items-center">
                                        <FaToilet className="mx-1" size={24} />
                                        {real_home?.description?.toilet} wc
                                    </span>
                                )}
                                <span className="flex justify-center text-[20px] items-center">
                                    <AiOutlineClockCircle
                                        className="mx-1"
                                        size={24}
                                    />
                                    {moment(real_home?.createdAt).fromNow()}
                                </span>
                            </div>
                            <div className="flex w-[25%] ml-2% cursor-pointer justify-end">
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (isHoverHeart) {
                                            callNotSave(real_home?._id);
                                        } else {
                                            callSave(real_home?._id);
                                        }
                                    }}
                                    className={`${
                                        isHoverHeart
                                            ? "underline text-red-500"
                                            : ""
                                    } flex gap-2 text-[20px]`}
                                >
                                    {isHoverHeart ? (
                                        <FiHeart
                                            size={28}
                                            className="hover:text-red-500"
                                            color="red"
                                        />
                                    ) : (
                                        <FiHeart
                                            size={28}
                                            className="hover:text-red-500"
                                        />
                                    )}{" "}
                                    {isHoverHeart ? "Đã lưu tin" : "Lưu tin"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-left">
                        <div className="w-[69%] flex flex-col mr-[2%]">
                            {/* slick slider */}
                            <div className="p-4 bg-gray-700">
                                <Slider {...settings}>
                                    {real_home &&
                                        JSON.parse(real_home?.images?.url).map(
                                            (item) => {
                                                return (
                                                    <div
                                                        className="ml-[10%]"
                                                        key={item?.url}
                                                    >
                                                        <img
                                                            src={
                                                                item?.url || bds
                                                            }
                                                            alt="Ảnh bất động sản"
                                                            className="object-cover w-[80%] h-[400px]"
                                                        ></img>
                                                    </div>
                                                );
                                            }
                                        )}
                                </Slider>
                            </div>
                            {/* slick slider */}
                            <div className="my-4">
                                <p className="font-bold text-2xl mb-3">
                                    <u>Tóm tắt tin đăng</u>
                                </p>
                                <p className="bg-[#F5F5F5] mt-1 p-2 flex text-justify text-lg">
                                    {real_home?.description?.short_description}
                                </p>
                            </div>
                            <div className="my-4 pb-3">
                                <p className="font-bold text-2xl mb-3">
                                    <u>Thông tin mô tả</u>
                                </p>
                                <p className="bg-[#F5F5F5]">
                                    {real_home?.description
                                        ?.content_description && (
                                        <TextEditor
                                            value={
                                                real_home?.description
                                                    ?.content_description
                                            }
                                            detail
                                        />
                                    )}
                                </p>
                            </div>
                            <div className="my-4 " id="map">
                                <p className="font-bold text-2xl mb-2">
                                    <u>Vị trí trên bản đồ</u>
                                </p>
                                <div className="text-ellipsis text-left items-center text-[16px]  whitespace-pre-line overflow-hidden">
                                    <MdOutlineLocationOn
                                        size={24}
                                        className="mr-2 inline-block"
                                    />
                                    {real_home?.address}
                                </div>
                                {real_home && (
                                    <div className="mt-3">
                                        <MapLeaflet
                                            address={real_home?.address}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="my-4 ">
                                <p className="font-bold text-2xl mb-3">
                                    <u>Đặc điểm tin đăng</u>
                                </p>
                                <table className="table-fixed border-[2px] border-gray-600 bg-white w-full text-lg">
                                    <tbody>
                                        <tr className="w-full p-2 h-[50px] bg-gray-200">
                                            <td className="flex mt-2 w-[100%] text-ellipsis text-md whitespace-pre-line overflow-hidden ml-[10%]">
                                                Mã tin:
                                            </td>
                                            <td className="w-[80%] text-ellipsis text-md text-start whitespace-pre-line overflow-hidden">
                                                {real_home?._id
                                                    ? `#${GetNummberFromString(
                                                          real_home?._id
                                                      )}`
                                                    : ""}
                                            </td>
                                        </tr>
                                        <tr className="w-full p-2 h-[50px]">
                                            <td className="flex mt-2 w-[100%] text-ellipsis text-md whitespace-pre-line overflow-hidden ml-[10%]">
                                                Loại tin:
                                            </td>
                                            {payment && (
                                                <td
                                                    className={`w-[70%] text-ellipsis text-md items-start whitespace-pre-line overflow-hidden ${
                                                        payment?.news_type
                                                            ?._id === 0
                                                            ? `text-red-500`
                                                            : payment?.news_type
                                                                  ?._id === 1
                                                            ? "text-[#ED0CC9]"
                                                            : `text-blue-500`
                                                    }`}
                                                >
                                                    {payment?.news_type?.name}
                                                </td>
                                            )}
                                        </tr>
                                        <tr className="w-full p-2 h-[50px] bg-gray-200">
                                            <td className="flex mt-2 w-[100%] text-ellipsis text-md whitespace-pre-line overflow-hidden ml-[10%]">
                                                Khu vực:
                                            </td>
                                            <td className="w-[80%] text-ellipsis text-md text-start whitespace-pre-line overflow-hidden">
                                                {real_home
                                                    ? getProvince(
                                                          real_home?.address
                                                      )
                                                    : ""}
                                            </td>
                                        </tr>
                                        <tr className="w-full p-2 h-[50px]">
                                            <td className="flex mt-2 w-[100%] text-ellipsis text-md whitespace-pre-line overflow-hidden text-left ml-[10%]">
                                                Ngày đăng:
                                            </td>
                                            <td className="w-[70%] text-ellipsis text-md items-start whitespace-pre-line overflow-hidden">
                                                {payment?.start_date}
                                            </td>
                                        </tr>
                                        <tr className="w-full p-2 h-[50px] bg-gray-200">
                                            <td className="flex mt-2 w-[100%] text-ellipsis text-md whitespace-pre-line overflow-hidden text-left ml-[10%]">
                                                Ngày hết hạn:
                                            </td>
                                            <td className="w-[70%] text-ellipsis text-md items-start whitespace-pre-line overflow-hidden">
                                                {payment?.expiration_date}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-col w-[24%]">
                            <div className=" flex flex-col border-[1px] border-solid border-gray-400 shadow-lg shadow-cyan-500/50 rounded-[20px] h-[420px]">
                                <Link
                                    to={`/trang-ca-nhan/${real_home?.user_post?._id}`}
                                    className="flex cursor-pointer px-4 pt-3 pb-2"
                                >
                                    <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[60px] w-[60px] pt-1 mb-2">
                                        <span className="animate-ping absolute inline-flex h-[8px] w-[8px] rounded-full bg-green-500 opacity-100 ml-[50px] mb-[40px]"></span>
                                        <img
                                            src={
                                                real_home?.user_post?.avt ||
                                                mdi_user
                                            }
                                            alt="mdi_user"
                                            className="h-[65px] w-[70px] rounded-full"
                                        ></img>
                                    </div>
                                    <div className="flex flex-col mx-3 my-2">
                                        <div className="text-black text-lg">
                                            <b>
                                                {real_home
                                                    ? `${real_home?.user_post?.first_name} ${real_home?.user_post?.last_name}`
                                                    : ""}
                                            </b>
                                        </div>
                                        <div className="text-blue-500 text-md hover:font-bold">
                                            Trang cá nhân
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex mt-1 overflow-hidden text-ellipsis whitespace-nowrap px-4 gap-4 pb-3 border-b-[2px]">
                                    <button
                                        className="bg-[#4397C7] text-white rounded-4 w-[150px] h-[45px] hover:bg-blue-500 hover:text-white items-center justify-center flex overflow-hidden text-ellipsis whitespace-nowrap ml-[15px]"
                                        type="button"
                                    >
                                        <ImPhone
                                            size={30}
                                            className="mb-1 p-1"
                                        />
                                        {real_home?.user_post?.phone}
                                    </button>
                                    <a
                                        className="bg-blue-50 text-blue-500 rounded-4 hover:bg-blue-500 hover:text-white w-[80px] h-[45px] border-[1px] border-solid border-blue-500 overflow-hidden text-ellipsis whitespace-nowrap items-center flex justify-center"
                                        href={`http://zalo.me/${real_home?.user_post?.phone}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        zalo
                                    </a>
                                </div>
                                <p className="text-lg px-4">Liên hệ trao đổi</p>
                                <div className="px-4 w-full rounded-lg mt-2">
                                    <input
                                        placeholder="Số điện thoại"
                                        className="w-full rounded-lg pl-2
                                    flex items-center justify-between p-2 bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer resize-y outline-none overflow-auto"
                                    ></input>
                                </div>
                                <div className="px-4 w-full rounded-lg my-3">
                                    <textarea
                                        placeholder="Nội dung liên hệ"
                                        // value={value}
                                        // onChange={(e) => {
                                        //     setValue((prev) => ({
                                        //         ...prev,
                                        //         [type]: e.target.value,
                                        //     }));
                                        // }}
                                        className={`flex items-center justify-between w-[100%] p-2 min-h-[80px] max-h-[200px] rounded-xl bg-blue-100 border-solid border-1 border-black hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer resize-y outline-none overflow-auto`}
                                    ></textarea>
                                </div>
                                <div className="px-4 rounded-lg">
                                    <button
                                        type="button"
                                        className=" bg-[#ffc107] w-full h-9 rounded-lg  hover:border-solid hover:border-2 hover:border-[#ffc107] cursor-pointer resize-y hover:text-black hover:bg-white"
                                        onClick={() => {
                                            handleSendContact();
                                        }}
                                    >
                                        Gửi yêu cầu
                                    </button>
                                </div>
                            </div>
                            <div className="h-fit mt-6">
                                <NewPost />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailRealHome;
