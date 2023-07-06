import React from "react";
import { LinkNavigate } from "../../components";
import icons from "../../../utils/icons";
import List from "../List";
import { ItemSidebarMain } from "../../components/index";
import { useSelector } from "react-redux";

const { IoIosArrowForward } = icons;

const BuySell = () => {
    const { real_home_types_r } = useSelector((state) => state.real_home);
    const { prices, areas } = useSelector((state) => state.price_area);

    return (
        <div>
            <div>
                <div className="bg-[#F5F5F5]">
                    <div className="text-black mt-3 text-2xl">
                        <b>Cho thuê bất động sản ưu đãi 2023</b>
                    </div>
                    <div className="column-main-buysell ml-[20px] mt-4 p-[1%] rounded-[15px] bg-white w-[96%]">
                        <div className="container max-h-[100px] max-w-[100%] flex flex-wrap text-justify overflow-hidden textflow-ellipsis whitespace-pre-line">
                            {real_home_types_r?.length > 0 &&
                                real_home_types_r.map((item) => {
                                    return (
                                        <LinkNavigate
                                            key={item._id}
                                            id={item._id}
                                            text={item.name}
                                            icon={
                                                <IoIosArrowForward
                                                    color="red"
                                                    className="max-w-[30%] "
                                                />
                                            }
                                            className={"w-50px"}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="main flex justify-evenly mt-3">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List />
                    </div>
                    <div className="sidebar mt-5 flex flex-col justify-start items-center w-[28%] bg-[#F5F5F5]">
                        <ItemSidebarMain
                            title="Danh sách cho thuê"
                            data_link={real_home_types_r}
                        />
                        <ItemSidebarMain
                            title="Xem theo giá"
                            data_link={prices}
                            isDouble="ok"
                            price="price"
                            type="price_id"
                            rental="rental"
                            transaction_type
                        />
                        <ItemSidebarMain
                            title="Xem theo diện tích"
                            data_link={areas}
                            isDouble="ok"
                            type="area_id"
                            transaction_type
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuySell;
