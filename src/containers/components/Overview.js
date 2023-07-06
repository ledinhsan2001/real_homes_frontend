import React, { memo } from "react";
import { SellRental, sale, rental, User } from "../../assets/images/index";

const Overview = () => {
    return (
        <div className="items-center mt-5 p-4 w-[100%] flex justify-center ml-[1%]">
            <div className="flex justify-between bg-white w-[60%]">
                <div className="h-[294px] w-[500px]">
                    <img src={SellRental} alt="sellRental"></img>
                </div>

                <div className="flex flex-col items-center ml-2 mt-3 mr-7">
                    <div className="font-['Merriweather_Bold'] text-2xl">
                        Bán và cho thuê cùng RealHomes
                    </div>
                    <div>Nền tảng giao dịch bất động sản hàng đầu Việt Nam</div>
                    <div className="flex items-center mt-3 cursor-pointer justify-around">
                        <div className="flex flex-col mx-1 pt-2 items-center bg-white w-[150px] h-[150px]">
                            <img
                                src={User}
                                alt="user"
                                className="h-[50] w-[50px] rounded-[20px]"
                            ></img>
                            <p>50.000+</p>
                            <p>Người dùng</p>
                        </div>
                        <div className="flex flex-col mx-1 pt-2 items-center bg-white w-[150px] h-[150px]">
                            <img
                                src={sale}
                                alt="sale"
                                className="h-[50] w-[50px] rounded-[20px]"
                            ></img>
                            <p>137.351+</p>
                            <p>Bất động sản bán</p>
                        </div>
                        <div className="flex flex-col mx-1 pt-2 items-center bg-white w-[150px] h-[150px]">
                            <img
                                src={rental}
                                alt="sale"
                                className="h-[50] w-[50px] rounded-[20px]"
                            ></img>
                            <p>26.131+</p>
                            <p className="text-center">Bất động sản cho thuê</p>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500  text-white rounded-4 hover:bg-blue-300 w-[120px] h-[45px] border-[1px] overflow-hidden text-ellipsis whitespace-nowrap"
                        type="button"
                    >
                        Bắt đầu ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Overview);
