import React, { useEffect } from "react";
import { apigetPayment } from "../../services/payment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../utils/constant";
import Swal from "sweetalert2";

const GetPayment = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    // getPayment
    useEffect(() => {
        const fetchGetPayment = async () => {
            const PayerID = params.get("PayerID");
            const paymentId = params.get("paymentId");
            const total_price = params.get("total_price");
            const VND = params.get("VND");
            const id_post = params.get("id_post");
            const news_type = params.get("news_type");
            const number_day = params.get("number_day");
            try {
                const response = await apigetPayment({
                    PayerID,
                    paymentId,
                    total_price,
                    id_post,
                    news_type,
                    number_day,
                    VND,
                });
                Swal.fire("Thành công!", response.data.message, "success");
                navigate(`/rieng-tu/${path.MANAGEMENT_PAGE}`);
            } catch (error) {
                Swal.fire("Lỗi!", error.response.data.message, "error");
                navigate(`/rieng-tu/${path.PAYMENT_FAIL}`);
            }
        };
        window.location.pathname.includes("payment-success") &&
            fetchGetPayment();
        // eslint-disable-next-line
    }, [window.location.pathname]);
    return (
        <div>
            <div>
                <div class="grid h-[800px] px-4 bg-white place-content-center">
                    <div class="text-center">
                        <div class="font-black text-green-400 text-6xl">
                            Đang thực hiện thanh toán.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetPayment;
