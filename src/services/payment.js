import axiosConfig from "../axiosConfig";

export const apiCreatePayment = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: "/api/payment/create",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apigetPayment = (payload) =>
    // payload={PayerID,paymentId}
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/payment/get",
                params: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

// Payment History
export const apigetPaymentHistory = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/payment-history/get-limit-by-user",
                params: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
