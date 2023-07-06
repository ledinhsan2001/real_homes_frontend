import React, { memo } from "react";
import { Link } from "react-router-dom";
import { formatUniToString } from "../../utils/constant";
import { createSummary } from "../../utils/dropTagHtml";

const ItemBlog = ({ item }) => {
    return (
        <div className="flex gap-4 items-center mb-[16px]">
            <img
                src={item?.thumbnail_url}
                alt="thumbnail_url"
                className="w-[260px] h-[220px] object-cover"
            />
            <div className="text-left flex flex-col gap-3">
                <Link
                    to={`/blog/chi-tiet/${item._id}?${formatUniToString(
                        item?.title
                    )}`}
                    className="font-bold text-lg"
                >
                    {item?.title}
                </Link>
                <p className="text-gray-400">{item?.createdAt.split("T")[0]}</p>
                <p>{`${createSummary(item?.content.slice(0, 900))}...`}</p>
            </div>
        </div>
    );
};

export default memo(ItemBlog);
