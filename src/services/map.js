// import axiosConfig from "../axiosConfig";
//axios default of library axios to call url difference
import axiosDefault from "axios";

export const apiGetProvince = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: "https://vapi.vnappmob.com/api/province/",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetDistrict = (province_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetWard = (district_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
