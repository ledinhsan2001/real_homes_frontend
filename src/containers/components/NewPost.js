import React, { memo } from "react";
import { ItemSide } from "./index";
import { useSelector } from "react-redux";

const NewPost = () => {
    const { new_posts } = useSelector((state) => state.real_home);
    return (
        <div className="gap-3">
            <div className="text-md font-['inherit'] mt-[14px]">
                <b>TIN MỚI ĐĂNG</b>
            </div>
            <div className="w-full flex flex-col mt-3 gap-3">
                {new_posts.length > 0 &&
                    new_posts.map((item) => {
                        return (
                            <ItemSide
                                key={item._id}
                                id={item._id}
                                img={JSON.parse(item?.images?.url)}
                                title={item.description.title_description}
                                price={item.description.price}
                                upAt={item.createdAt}
                                news_type_id={item?.news_type_id}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(NewPost);
