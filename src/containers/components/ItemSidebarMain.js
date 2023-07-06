import React, { memo } from "react";
import icons from "../../utils/icons";
import { formatUniToString } from "../../utils/constant";
import {
    useLocation,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from "react-router-dom";

const { IoIosArrowForward } = icons;

const ItemSidebarMain = ({
    title,
    data_link,
    isDouble,
    price,
    type,
    home,
    rental,
    transaction_type,
    real_home_type,
}) => {
    data_link =
        price && !home && !rental
            ? data_link.slice(0, 8)
            : rental
            ? data_link.slice(8, 16)
            : data_link;

    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();

    const handleFilter = (code) => {
        let sort = params.get("sort_id");
        let news_type_id = params.get("news_type_id");

        let sort_code = sort;
        let sort_type = "sort_id";

        let news_type_code = news_type_id ? news_type_id : undefined;
        let news_type_type = news_type_id ? "news_type_id" : undefined;

        let transaction_type_code;
        let transaction_type_type;
        if (transaction_type) {
            transaction_type_code = params.get("transaction_type_id");
            transaction_type_type = "transaction_type_id";
        }

        let real_home_type_code;
        let real_home_type_type;
        if (real_home_type) {
            real_home_type_code = params.get("real_home_type_id");
            real_home_type_type = "real_home_type_id";
        }

        let objparams = {};
        // always filter follow type: price_id, area_id and transaction_typr
        objparams[type] = code;
        if (transaction_type) {
            objparams[transaction_type_type] = transaction_type_code;
        }
        if (real_home_type) {
            objparams[real_home_type_type] = real_home_type_code;
        }

        if (news_type_type) {
            objparams[news_type_type] = news_type_code;
        }
        if (sort) {
            objparams[sort_type] = sort_code;
        }

        navigate({
            pathname: location.pathname,
            search: createSearchParams(objparams).toString(),
        });
    };

    return (
        <div className="m-2 p-3 w-full bg-white">
            <div className="text-lg font-semibold">{title}</div>
            {/* List Buysell or Rental */}
            {!isDouble &&
                data_link?.length > 0 &&
                data_link.map((item) => {
                    return (
                        <div
                            className="flex items-center m-3 hover:text-orange-400 cursor-pointer border-b border-gray-300 border-dashed text-sm hover:translate-x-2"
                            key={item._id}
                            onClick={() =>
                                navigate({
                                    pathname: `/${formatUniToString(
                                        item.name
                                    )}`,
                                    search: createSearchParams({
                                        real_home_type_id: item._id,
                                    }).toString(),
                                })
                            }
                        >
                            <IoIosArrowForward
                                size={15}
                                color="text-gray-300"
                                className="mr-2"
                            />
                            <p>{item.name}</p>
                        </div>
                    );
                })}

            {/*  Display follow areas */}
            {isDouble && !price && (
                <div className=" flex flex-wrap">
                    {data_link?.length > 0 &&
                        data_link.map((item) => {
                            return (
                                <div
                                    onClick={() => handleFilter(item._id)}
                                    className="flex items-center my-2 hover:text-orange-400 cursor-pointer border-b border-gray-300 border-dashed text-xs text-start overflow-hidden textflow-ellipsis whitespace-pre-line w-[47%] pb-1 hover:translate-x-3"
                                    key={item._id}
                                >
                                    <IoIosArrowForward
                                        size={15}
                                        color="text-gray-300"
                                    />
                                    <p>{item.name}</p>
                                </div>
                            );
                        })}
                </div>
            )}
            {/* Display follow prices */}
            {isDouble && price && (
                <div className=" flex flex-wrap">
                    {data_link?.length > 0 &&
                        data_link.map((item) => {
                            return (
                                <div
                                    onClick={() => handleFilter(item._id)}
                                    key={item._id}
                                    className="flex items-center my-2 hover:text-orange-400 cursor-pointer border-b border-gray-300 border-dashed text-xs text-start overflow-hidden textflow-ellipsis whitespace-pre-line w-[47%] pb-1 hover:translate-x-3"
                                >
                                    <IoIosArrowForward
                                        size={15}
                                        color="text-gray-300"
                                    />
                                    <p>{item.name}</p>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default memo(ItemSidebarMain);
