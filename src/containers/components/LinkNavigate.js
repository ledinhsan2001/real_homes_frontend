import React from "react";
import { formatUniToString } from "../../utils/constant";
import { createSearchParams, useNavigate } from "react-router-dom";

const LinkNavigate = ({ id, text, icon, className }) => {
    const navigate = useNavigate();

    return (
        <>
            {/* buysell or rental */}
            {className && (
                <div className="linknav p-2 mx-2 justify-center max-h-[45px] w-[195px] text-start">
                    <div
                        className="items-center inline-flex hover:translate-x-3 hover:text-blue-500 hover:cursor-pointer"
                        onClick={() =>
                            navigate({
                                pathname: `/${formatUniToString(text)}`,
                                search: createSearchParams({
                                    real_home_type_id: id,
                                }).toString(),
                            })
                        }
                    >
                        {icon}
                        {text}
                    </div>
                </div>
            )}
            {!className && (
                <div className="linknav p-2 mx-4 justify-center max-h-[45px]">
                    <div
                        className="items-center inline-flex hover:translate-x-3 hover:text-blue-500 hover:cursor-pointer"
                        onClick={() =>
                            navigate({
                                pathname: `/${formatUniToString(text)}`,
                                search: createSearchParams({
                                    real_home_type_id: id,
                                }).toString(),
                            })
                        }
                    >
                        {icon}
                        {text}
                    </div>
                </div>
            )}
        </>
    );
};

export default LinkNavigate;
