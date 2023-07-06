import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectCategories } from "../components";
import { apiGetRealHomeTypeByTrans } from "../../services";

const Categories = ({ payload, setpayload, errors, seterrors }) => {
    const { transaction_types } = useSelector((state) => state.real_home);
    const [RH_types, setRH_types] = useState([]);

    useEffect(() => {
        const fetchRHByTrans = async () => {
            const real_home_types = await apiGetRealHomeTypeByTrans(
                payload?.transaction_type_id
            );
            if (real_home_types?.data.success === true) {
                setRH_types(real_home_types?.data.data);
            }
        };
        payload?.transaction_type_id ? fetchRHByTrans() : setRH_types(null);
    }, [payload]);

    return (
        <div className="flex-col bg-white p-3 rounded-md w-full">
            <div className="font-bold text-gray-500 py-2 px-3 font-serif text-lg">
                Loại giao dịch
            </div>
            <div className="flex my-3 px-3 gap-5">
                <SelectCategories
                    title={"Loại giao dịch"}
                    defaultValue={"--- Chọn loại giao dịch ---"}
                    content={transaction_types}
                    value={payload.transaction_type_id}
                    setValue={setpayload}
                    errors={errors}
                    seterrors={seterrors}
                    name="transaction_type_id"
                />
                <SelectCategories
                    title={"Loại bất động sản"}
                    defaultValue={"--- Chọn loại bất động sản ---"}
                    content={RH_types}
                    value={payload.real_home_type_id}
                    setValue={setpayload}
                    errors={errors}
                    seterrors={seterrors}
                    name="real_home_type_id"
                />
            </div>
        </div>
    );
};

export default Categories;
