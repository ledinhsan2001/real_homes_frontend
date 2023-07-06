import React from "react";

const PaymentFail = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div>
            <div class="grid h-[800px] px-4 bg-white place-content-center">
                <div class="text-center">
                    <div class="font-black text-blue-300 text-9xl">404</div>

                    <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Lỗi!
                    </p>

                    <p class="mt-4 text-gray-500 text-lg">
                        Lỗi thanh toán. Vui lòng thử lại
                    </p>

                    <p
                        class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
                        onClick={() => {
                            handleBack();
                        }}
                    >
                        Quay lại
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;
