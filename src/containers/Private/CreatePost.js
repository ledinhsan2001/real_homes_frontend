import React from "react";
import { useState } from "react";
import { Categories, Address, Description, Images, Payment } from "./";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Contact } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
    FormatGetNummber,
    getCodeArea,
    getCodePrice,
} from "../../utils/constant";
import { apiCreateRealHome, apiUpdateRealHome } from "../../services";
import Swal from "sweetalert2";
import { validate_data } from "../../utils/validate_data";
import { dataEdit, delDataEdit } from "../../store/actions";
import { memo } from "react";

const CreatePost = ({ edit, repayment }) => {
    const { prices, areas } = useSelector((state) => state.price_area);
    const { data_edit } = useSelector((state) => state.real_home);
    const { user_data } = useSelector((state) => state.user);
    const [errors, seterrors] = useState([]);
    const [showPayment, setshowPayment] = useState(false);
    const [showCreatePost, setshowCreatePost] = useState(true);
    const [id_post, setid_post] = useState("");
    const dispatch = useDispatch();

    const [payload, setpayload] = useState(() => {
        const init = {
            address: data_edit?.address || "",
            images: {
                url: data_edit
                    ? data_edit?.images?.url
                        ? JSON.parse(data_edit?.images?.url)
                        : []
                    : [],
            },
            real_home_type_id: data_edit?.real_home_type_id || "",
            transaction_type_id: data_edit?.transaction_type_id || "",
            title_description: data_edit?.description?.title_description || "",
            short_description: data_edit?.description?.short_description || "",
            content_description:
                data_edit?.description?.content_description || "",
            price: data_edit?.description?.price || "",
            area: data_edit?.description?.area || "",
            bedroom: data_edit?.description?.bedroom || "",
            toilet: data_edit?.description?.toilet || "",
            price_id: data_edit?.price_id || "",
            area_id: data_edit?.area_id || "",
            province_id: data_edit?.province_id || "",
            number_home: "",
        };
        return init;
    });

    const resetPayload = () => {
        setpayload({
            address: "",
            images: {
                url: [],
            },
            real_home_type_id: "",
            transaction_type_id: "",
            title_description: "",
            short_description: "",
            content_description: "",
            price: "",
            area: 0,
            bedroom: 0,
            toilet: 0,
            price_id: "",
            area_id: "",
            province_id: "",
            number_home: "",
        });
    };

    const handleSubmit = async () => {
        //get min max from have front data
        let price_maxmin =
            payload.transaction_type_id === "645b56517cc26519dbcaad34"
                ? getCodePrice(prices.slice(0, 8))
                : getCodePrice(prices.slice(8, 16));
        let area_maxmin = getCodeArea(areas);

        let price_id;
        let area_id;
        let check_billion = payload?.price?.includes("tỷ");
        let check_million = payload?.price?.includes("triệu");
        let price_number;
        if (payload?.price) {
            price_number = FormatGetNummber(payload?.price);
        }

        let area_number;
        if (payload?.area) {
            area_number = FormatGetNummber(payload?.area);
        }

        //price_number != number is undefined: thỏa thuận or input error data

        payload.transaction_type_id === "645b56517cc26519dbcaad34"
            ? !price_number || !check_billion
                ? (price_id = "duoi_1ty")
                : (price_id = price_maxmin.find(
                      (price) =>
                          price_number >= +price.min &&
                          price_number < +price.max
                  )?._id)
            : !price_number || !check_million
            ? check_billion
                ? (price_id = "tren_15trieu")
                : (price_id = "duoi_1trieu")
            : (price_id = price_maxmin.find(
                  (price) =>
                      price_number >= +price.min && price_number < +price.max
              )?._id);

        !area_number
            ? //area_number khác số là undefined
              (area_id = "duoi_20m2")
            : (area_id = area_maxmin.find(
                  (area) => area_number >= +area.min && area_number < +area.max
              )?._id);

        let finalPayload = {
            ...payload,
            price_id,
            area_id,
            user_post: user_data._id,
        };
        let count = validate_data(finalPayload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Bài viết có lỗi!", "error");
        } else {
            // edit, had payment then active === true
            if (data_edit && data_edit?.active === true) {
                finalPayload = {
                    ...finalPayload,
                    real_home_id: data_edit._id,
                    description_id: data_edit.description._id,
                    images_id: data_edit?.images?._id,
                };
                const response = await apiUpdateRealHome(finalPayload);
                if (response.data.success === true) {
                    Swal.fire("Thành công!", response.data.message, "success");
                    resetPayload();
                    dispatch(delDataEdit());
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            }
            // create but have not payment then active === false
            if (data_edit && data_edit?.active === false) {
                finalPayload = {
                    ...finalPayload,
                    real_home_id: data_edit._id,
                    description_id: data_edit.description._id,
                    images_id: data_edit?.images?._id,
                };
                const response = await apiUpdateRealHome(finalPayload);
                if (response.data.success === true) {
                    dispatch(dataEdit(response.data.data));
                    setid_post(response.data.data._id);
                    setshowPayment(true);
                    setshowCreatePost(false);
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            }
            // create
            else {
                const response = await apiCreateRealHome(finalPayload);
                if (response.data.success === true) {
                    dispatch(dataEdit(response.data.data));
                    setid_post(response.data.data._id);
                    setshowPayment(true);
                    setshowCreatePost(false);
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            }
        }
    };
    return (
        <div>
            <div className="flex flex-col h-screen mb-10 items-center">
                {showCreatePost && (
                    <div
                        className={`${
                            edit
                                ? `text-left flex flex-col px-[10%] mt-4 w-[70%] bg-[#F5F5F5] pb-10`
                                : `text-left flex flex-col px-[10%] pt-4 w-[70%]`
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="font-bold text-4xl my-4">
                            {edit ? "Chỉnh sửa tin" : `Đăng tin mới`}
                        </div>
                        <Categories
                            payload={payload}
                            setpayload={setpayload}
                            errors={errors}
                            seterrors={seterrors}
                        />
                        <Address
                            payload={payload}
                            setpayload={setpayload}
                            errors={errors}
                            seterrors={seterrors}
                        />
                        <Description
                            payload={payload}
                            setpayload={setpayload}
                            errors={errors}
                            seterrors={seterrors}
                            edit={edit ? edit : undefined}
                        />
                        <Images
                            payload={payload}
                            setpayload={setpayload}
                            errors={errors}
                            seterrors={seterrors}
                            name="images"
                        />
                        <div className="flex justify-center items-center p-2 mt-4 rounded-xl bg-[#2957cc] cursor-pointer text-white">
                            <button
                                type="button"
                                className="flex text-lg justify-center items-center gap-1 w-full"
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                {repayment
                                    ? `Tiếp tục`
                                    : edit
                                    ? "Cập nhật"
                                    : `Tiếp tục`}
                                <AiOutlineArrowRight className="mt-1" />
                            </button>
                        </div>
                    </div>
                )}
                {showPayment && (
                    <Payment
                        setshowPayment={setshowPayment}
                        resetPayload={resetPayload}
                        setshowCreatePost={setshowCreatePost}
                        id_post={id_post}
                        address={payload.address}
                    />
                )}
                <div className="">
                    <div className=" flex mb-[120px]">
                        <Contact />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CreatePost);
