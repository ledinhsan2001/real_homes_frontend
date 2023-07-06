import React from "react";
import { title } from "../../utils/constant";
import "bootstrap/dist/css/bootstrap.min.css";
import { UrlHomePage } from "./index";
import List from "./List";
import { ItemSidebarMain } from "../components/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { bds, bds1, bds2 } from "../../assets/images";
import { useSelector } from "react-redux";

const HomePage = () => {
    const { prices, areas } = useSelector((state) => state.price_area);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <div className="p-4 bg-gray-700 justify-center">
                <Slider {...settings} className="slidderr">
                    <div className="ml-[10%] z-[10]">
                        <img
                            src={bds}
                            alt="bds1"
                            className="object-cover w-[80%] h-[250px]"
                        ></img>
                    </div>
                    <div className="ml-[10%]">
                        <img
                            src={bds1}
                            alt="bds2"
                            className="object-cover w-[80%] h-[250px]"
                        ></img>
                    </div>
                    <div className="ml-[10%]">
                        <img
                            src={bds2}
                            alt="bds3"
                            className="object-cover w-[80%] h-[250px]"
                        ></img>
                    </div>
                </Slider>
            </div>
            <div>
                <div className="text-black mt-4 text-2xl">
                    <b>{title.HeaderMain}</b>
                </div>
                <div className="column-main flex w-[98%]">
                    <UrlHomePage />
                </div>
                <div className="main flex justify-evenly mt-4">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List />
                    </div>
                    <div className="sidebar mt-5 flex flex-col justify-start items-center w-[28%] bg-[#F5F5F5]">
                        <ItemSidebarMain
                            title="Xem theo giá"
                            data_link={prices}
                            isDouble="ok"
                            price="price"
                            type="price_id"
                            home="home"
                        />
                        <ItemSidebarMain
                            title="Xem theo diện tích"
                            data_link={areas}
                            isDouble="ok"
                            type="area_id"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
