import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { formatUniToString } from "../../utils/constant";

const ItemSide = ({ id, title, price, img, upAt, news_type_id }) => {
    return (
        <Link
            to={`/chi-tiet/${id}?${formatUniToString(title)}`}
            className="w-full flex items-center gap-1 border-b border-b-gray-300 pb-2 hover:font-bold"
        >
            <img
                className="w-[80px] h-[80px] object-cover flex-none rounded-md"
                src={img[0]?.url}
                alt="ảnh item sidebar"
            ></img>
            <div className="flex flex-col flex-auto">
                <div
                    className={`max-h-[45px] text-ellipsis text-left items-center whitespace-pre-line overflow-hidden text-sm cursor-pointer ${
                        news_type_id === 0
                            ? `text-red-500`
                            : news_type_id === 1
                            ? "text-[#ED0CC9]"
                            : `text-blue-500`
                    }`}
                >
                    {`${title?.slice(0, 46)}...`}
                </div>
                <div className="flex mt-1 justify-between">
                    <span className="text-[#16c784] text-[16px] ml-2">
                        {price}
                    </span>
                    <span className="text-[13px] text-gray-400">
                        {moment(upAt).fromNow()}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default memo(ItemSide);
