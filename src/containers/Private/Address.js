import React, { useEffect, useState } from "react";
import { MapLeaflet, SelectAddress } from "../components/";
import { apiGetProvince, apiGetDistrict, apiGetWard } from "../../services";
import { useSelector } from "react-redux";

const Address = ({ payload, setpayload, errors, seterrors }) => {
    const [provinces, setprovinces] = useState([]);
    const [districts, setdistricts] = useState([]);
    const [wards, setwards] = useState([]);
    const [province, setprovince] = useState("");
    const [district, setdistrict] = useState("");
    const [ward, setward] = useState("");
    const { data_edit } = useSelector((state) => state.real_home);

    // create and put load re-data all null
    useEffect(() => {
        // then update or create
        if (payload.province_id === "") {
            setprovince("");
            setdistrict("");
            setward("");
        }

        if (data_edit) {
            // get number_home if have
            let arradd = data_edit.address.split(",");
            let number_home = arradd.length === 4 ? arradd[0] : "";
            payload.number_home = number_home;
        }
    }, [payload]);

    useEffect(() => {
        const fetchProvinces = async () => {
            const provinces = await apiGetProvince();
            if (provinces.status === 200) {
                setprovinces(provinces.data.results);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        setprovince(data_edit ? data_edit.province_id : "");
    }, [provinces]);

    useEffect(() => {
        // Province change 2 field district and ward change follow
        setdistrict("");

        const fetchDistrict = async () => {
            const districts = await apiGetDistrict(province);
            if (districts.status === 200) {
                setdistricts(districts.data.results);
            }
        };
        province ? fetchDistrict() : setdistricts(null);
    }, [province]);

    // useEffect(() => {
    //     if (data_edit) {
    //         let arradd = data_edit?.address?.split(",");
    //         let district_name = arradd?.length === 4 ? arradd[2] : arradd[1];
    //         let find_district_id = districts?.find((item) => {
    //             return item.district_name === district_name;
    //         });
    //         setdistrict(data_edit ? find_district_id?.district_id : "");
    //     }
    // }, [districts]);

    useEffect(() => {
        // Province change 2 field district and ward change follow
        setward("");

        const fetchWard = async () => {
            const wards = await apiGetWard(district);
            if (wards.status === 200) {
                setwards(wards.data.results);
            }
        };
        district ? fetchWard() : setwards(null);
    }, [district]);

    useEffect(() => {
        if (data_edit) {
            let arradd = data_edit.address.split(",");
            let ward_name = arradd.length === 4 ? arradd[1] : arradd[0];
            let find_ward_id = wards?.find((item) => {
                return item.ward_name === ward_name;
            });
            setward(data_edit ? find_ward_id?.ward_id : "");
        }
    }, [wards]);

    useEffect(() => {
        setpayload((prev) => ({
            ...prev,
            address: `${payload.number_home ? payload.number_home + "," : ""}${
                ward
                    ? wards?.find((item) => item.ward_id === ward)?.ward_name +
                      ","
                    : ""
            }${
                district
                    ? districts?.find((item) => item.district_id === district)
                          ?.district_name + ","
                    : ""
            }${
                province
                    ? provinces?.find((item) => item.province_id === province)
                          ?.province_name
                    : ""
            }`,
            province_id: province,
            district_id: district,
            ward_id: ward,
        }));
    }, [province, district, ward, payload.number_home]);

    return (
        <div className="flex-col bg-white p-3 rounded-md mt-4 w-full">
            <div className="font-bold text-gray-500 py-2 px-3 font-serif text-lg">
                Khu vực
            </div>
            <div className="flex my-3 px-3 gap-5">
                <SelectAddress
                    title={"Tỉnh/Thành phố"}
                    defaultValue={"--Chọn tỉnh thành phố--"}
                    obligate={"true"}
                    content={provinces}
                    type="province"
                    value={province}
                    setValue={setprovince}
                    errors={errors}
                    seterrors={seterrors}
                    name="province_id"
                />
                <SelectAddress
                    title={"Quận/Huyện"}
                    defaultValue={"--Chọn quận huyện--"}
                    obligate={"true"}
                    content={districts}
                    type="district"
                    value={district}
                    setValue={setdistrict}
                    errors={errors}
                    seterrors={seterrors}
                    name="district_id"
                />
            </div>
            <div className="flex my-3 px-3 gap-5">
                <SelectAddress
                    title={"Phường/Xã"}
                    defaultValue={"--Chọn phường xã--"}
                    obligate={"true"}
                    content={wards}
                    type="ward"
                    value={ward}
                    setValue={setward}
                    errors={errors}
                    seterrors={seterrors}
                    name="ward_id"
                />
            </div>
            <div className="flex my-3 px-3">
                <SelectAddress
                    title={"Đường"}
                    defaultValue={"ví dụ: 100"}
                    type="number_home"
                    simple="true"
                    value={payload.number_home}
                    setValue={setpayload}
                    data_edit={data_edit}
                />
            </div>
            <div className="flex flex-col my-3 px-3 w-full">
                <div className="font-bold my-2 flex">Địa chỉ chính xác</div>
                <input
                    type="text"
                    className="h-[50px] w-[95%] items-center pt-1 px-2 rounded-xl bg-gray-200 cursor-pointer border-solid border-2 border-gray-200 outline-none text-gray-500"
                    readOnly
                    placeholder="Ví dụ: 100 nguyễn lương bằng, hòa khánh bắc, liên chiểu, đàn nẵng"
                    value={`${
                        payload.number_home ? payload.number_home + "," : ""
                    }${
                        ward
                            ? wards?.find((item) => item.ward_id === ward)
                                  ?.ward_name + ","
                            : ""
                    }${
                        district
                            ? districts?.find(
                                  (item) => item.district_id === district
                              )?.district_name + ","
                            : ""
                    }${
                        province
                            ? provinces?.find(
                                  (item) => item.province_id === province
                              )?.province_name
                            : ""
                    }`}
                />
            </div>
            <div className="flex my-3 px-3 w-full">
                <div className="flex flex-col w-full">
                    <div className="font-bold my-2">Vị trí bản đồ</div>
                    {payload && (
                        <div className="mt-3 w-[95%] rounded-md">
                            <MapLeaflet address={payload?.address} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Address;
