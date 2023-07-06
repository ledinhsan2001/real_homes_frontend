import axiosConfig from "../axiosConfig";

export const apiGetAreas = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/get-area",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
