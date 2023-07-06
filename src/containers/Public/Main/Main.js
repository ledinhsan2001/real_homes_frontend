import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "../List";
import { useSelector } from "react-redux";
import { ItemSidebarMain, NewPost, Recommend } from "../../components/index";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Main = ({ content }) => {
    const { prices, areas } = useSelector((state) => state.price_area);
    const location = useLocation();
    const [titleSearch, settitleSearch] = useState("");

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        //get cac name from search to show title page search data
        let title_search = "";
        let obj_search_name = {};

        for (let i of searchParams.entries()) {
            // real_home:Mua bán, real_home_id:35256346
            if (!i[0].includes("_id") && !i[0].includes("page")) {
                obj_search_name[i[0]] = i[1];
            }
        }

        const exist_category =
            obj_search_name.transaction_type || obj_search_name.real_home_type
                ? true
                : false;

        if (exist_category) {
            for (let i in obj_search_name) {
                title_search += `${obj_search_name[i]}, `;
            }
        } else {
            // only have price, area, province
            title_search = "Bất động sản";
            for (let i in obj_search_name) {
                title_search += `${obj_search_name[i]}, `;
            }
        }
        settitleSearch(title_search);
    }, [location.search]);

    return (
        <div>
            <div>
                <div className="text-black mt-2 text-2xl">
                    <b>{content ? content : titleSearch}</b>
                </div>
                <div className="main flex justify-evenly mt-3">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List />
                    </div>
                    {/* follow real_home_type */}
                    {content && (
                        <div className="sidebar mt-5 flex flex-col justify-start items-center w-[28%] bg-[#F5F5F5]">
                            {!content.includes("Bán") ? (
                                <ItemSidebarMain
                                    title="Xem theo giá"
                                    data_link={prices}
                                    isDouble="ok"
                                    price="price"
                                    type="price_id"
                                    rental="rental"
                                    real_home_type
                                />
                            ) : (
                                <ItemSidebarMain
                                    title="Xem theo giá"
                                    data_link={prices}
                                    isDouble="ok"
                                    price="price"
                                    type="price_id"
                                    real_home_type
                                />
                            )}

                            <ItemSidebarMain
                                title="Xem theo diện tích"
                                data_link={areas}
                                isDouble="ok"
                                type="area_id"
                                real_home_type
                            />
                        </div>
                    )}
                    {/* Search */}
                    {!content && (
                        <div className="sidebar mt-5 flex flex-col justify-start items-center w-[28%] bg-white p-2">
                            <div className="h-fit">
                                <Recommend />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
