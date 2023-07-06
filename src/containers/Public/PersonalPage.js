import React, { useEffect, useState } from "react";
import { cover_img, mdi_user } from "../../assets/images";
import { useParams } from "react-router-dom";
import { apiGetUserPublic } from "../../services";
import Swal from "sweetalert2";
import { ImPhone } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { realHomePublicByUser } from "../../store/actions";
import { Item } from "../components";
import { TbMessageCircle2 } from "react-icons/tb";

const PersonalPage = () => {
    const { id } = useParams();
    const [user_data, setuser_data] = useState("");
    const dispatch = useDispatch();
    const { total_post_by_user, real_homes_public_by_user, message } =
        useSelector((state) => state.real_home);

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await apiGetUserPublic(id);
                if (response.data.success === true) {
                    setuser_data(response.data.data);
                }
            } catch (error) {
                Swal.fire("Lỗi", error.response.data.message, "error");
            }
        };
        id && fetchDataUser();
        id && dispatch(realHomePublicByUser(id));
        // eslint-disable-next-line
    }, [id]);

    const sliceDate = () => {
        return user_data?.createdAt?.split("T")[0];
    };

    const handleSendContact = () => {
        Swal.fire("Thành công!", "Gửi nội dung liên hệ thành công", "success");
    };

    return (
        <div className=" flex justify-center items-center">
            <div className="flex w-[60%] flex-col bg-[#F5F5F5] justify-center items-center">
                <img
                    src={cover_img}
                    className="w-[1200px] h-[400px] object-fill"
                ></img>
                <div className="w-full justify-center items-center flex mt-[-50px]">
                    <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[120px] w-[120px] pt-1 mb-3 border-[2px] border-blue-600 border-double">
                        <img
                            src={user_data?.avt || mdi_user}
                            alt="mdi_user"
                            className="h-[120px] w-[120px] rounded-full"
                        ></img>
                    </div>
                </div>
                <p className="text-[30px] font-bold">{`${user_data.first_name} ${user_data.last_name}`}</p>
                <div className="flex mt-1 overflow-hidden text-ellipsis whitespace-nowrap mr-1">
                    <button
                        className="bg-[#4397C7] text-white rounded-4 w-[150px] h-[45px] hover:bg-blue-500 hover:text-white items-center justify-center flex overflow-hidden text-ellipsis whitespace-nowrap"
                        type="button"
                    >
                        <ImPhone size={30} className="mb-1 p-1" />
                        {user_data.phone}
                    </button>
                    <a
                        className="bg-blue-50 text-blue-500 rounded-4 hover:bg-blue-500 hover:text-white w-[90px] h-[45px] border-[1px] border-solid border-blue-500 overflow-hidden text-ellipsis whitespace-nowrap items-center flex justify-center"
                        href={`http://zalo.me/${user_data.phone}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <TbMessageCircle2 size={30} className="mb-1 m-1" />
                        zalo
                    </a>
                </div>
                <div className="flex text-left flex-col w-full ml-[4%] mt-10">
                    <p className="justify-start text-[20px]">
                        Danh sách tin đăng
                    </p>
                    <p className="justify-start text-[16px] mt-2">
                        <b>{total_post_by_user}</b> tin đăng bất động sản từ
                        trang cá nhân.
                    </p>
                    <div className="flex gap-3 w-full">
                        <div className="w-[70%]">
                            {real_homes_public_by_user?.length === 0 &&
                                message && (
                                    <div className="bg-white">{message}</div>
                                )}
                            {real_homes_public_by_user?.length > 0 &&
                                real_homes_public_by_user.map((item) => {
                                    return (
                                        <Item
                                            key={item._id}
                                            images={JSON.parse(
                                                item?.images?.url
                                            )}
                                            shortDescription={
                                                item?.description
                                                    .title_description
                                            }
                                            price={item?.description.price}
                                            area={item?.description.area}
                                            bedroom={item?.description.bedroom}
                                            toilet={item?.description.toilet}
                                            address={item?.address}
                                            content={
                                                item?.description
                                                    .content_description
                                            }
                                            user={item?.user_post}
                                            _id={item?._id}
                                        />
                                    );
                                })}
                        </div>
                        <div className="flex flex-col w-[25%] bg-[#F5F5F5]  h-fit">
                            <div className=" flex flex-col mb-2 bg-white p-3 gap-3">
                                <p className="text-[20px]">Thông tin cá nhân</p>
                                {user_data.phone && (
                                    <div className="text-[20px] overflow-hidden">
                                        Điện thoại: {user_data.phone}
                                    </div>
                                )}
                                {user_data.email && (
                                    <div className="text-[20px] overflow-hidden">
                                        Email: {user_data.email}
                                    </div>
                                )}
                                {user_data.address && (
                                    <div className="text-[20px] overflow-hidden">
                                        Địa chỉ: {user_data.address}
                                    </div>
                                )}
                                <div className="bg-[#F5F5F5] shadow-inner shadow-gray-500 p-2 text-lg overflow-hidden">
                                    Tham gia ngày: {sliceDate()}
                                </div>
                            </div>
                            <div className="pb-3 bg-white mb-3">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPage;
