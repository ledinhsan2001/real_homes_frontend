import React, { memo } from "react";
import { useSelector } from "react-redux";
import { formatUniToString } from "../../utils/constant";
import { Link } from "react-router-dom";

const Recommend = () => {
    const { blogs } = useSelector((state) => state.blog);
    return (
        <div className="gap-3">
            <div className="text-md font-['inherit'] mt-[14px]">
                <b>CÓ THỂ BẠN QUAN TÂM</b>
            </div>
            <div className="w-full flex flex-col mt-3 gap-3">
                {blogs.length > 0 &&
                    blogs.map((item) => {
                        return (
                            <Link
                                key={item?._id}
                                to={`/blog/chi-tiet/${
                                    item?._id
                                }?${formatUniToString(item?.title)}`}
                                className="w-full flex items-center gap-1 border-b border-b-gray-300 pb-2 hover:font-bold gap-2"
                            >
                                <img
                                    className="w-[80px] h-[80px] object-cover flex-none rounded-md"
                                    src={item?.thumbnail_url}
                                    alt="ảnh item sidebar"
                                ></img>
                                <div className="flex flex-col flex-auto">
                                    <div
                                        className={`max-h-[45px] text-ellipsis text-left items-center whitespace-pre-line overflow-hidden text-sm cursor-pointer`}
                                    >
                                        {`${item?.title?.slice(0, 100)}?`}
                                    </div>
                                    <div className="flex mt-1 justify-between">
                                        <span className="text-[13px] text-gray-400">
                                            {item?.createdAt?.split("T")[0]}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(Recommend);
