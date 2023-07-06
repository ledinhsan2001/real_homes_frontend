import axiosConfig from "../axiosConfig";

export const apiGetPrices = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/get-price",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
