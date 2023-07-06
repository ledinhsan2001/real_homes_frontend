export const path = {
    HOME: "/*",
    LOGIN: "dang-nhap",
    REGISTER: "dang-ky",
    MAIN: "main",
    RENTAL: "cho-thue",
    BUYSELL: "mua-ban",
    SERVICE_PRICE: "bang-gia-dich-vu",
    BLOG: "blog",
    DETAIL_BLOG__TITLE_ID: "blog/chi-tiet/:id",
    DETAIL_REALHOMES__TITLE_ID: "chi-tiet/:id",
    SEARCH: "tim-kiem",
    RESET_PASSWORD: "quen-mat-khau",

    PRIVATE: "/rieng-tu/*",
    CREATE_POST: "dang-tin",
    SAVED_POST: "tin-dang-da-luu",
    MANAGEMENT_PAGE: "trang-quan-ly",
    POST_MANAGEMENT: "quan-ly-tin-dang",
    EDIT_INFOR: "sua-thong-tin-ca-nhan",
    PAGE_PERSONAL: "trang-ca-nhan/:id",
    HISTORY_PAYMENT: "lich-su-thanh-toan",
    PAYMENT_STATUS: "trang-thai-thanh-toan",
    GET_PAYMENT: "payment-success",
    PAYMENT_FAIL: "payment-fail",

    SELL_APARTMENTS: "ban-can-ho",
    SELL_VILLA: "ban-biet-thu",
    SELL_FRONT_HOMES: "ban-nha-mat-tien",
    SELL_OWN_HOME: "ban-nha-rieng",
    SELL_PROJECT_LAND: "ban-dat-nen-du-an",
    SELL_LAND: "ban-dat",
    SELL_HOTELS: "ban-khach-san",
    SELL_BOARDING_HOMES: "ban-nha-tro",
    SELL_SHOP: "ban-cua-hang",
    SELL_WAREHOUSE: "ban-kho-xuong",

    RENTAL_LAND: "cho-thue-dat",
    RENTAL_WAREHOUSE: "thue-kho-xuong",
    RENTAL_HOTELS: "thue-khach-san",
    RENTAL_APARTMENTS: "cho-thue-can-ho",
    RENTAL_OFFICE: "van-phong",
    RENTAL_FRONT_HOMES: "thue-nha-mat-tien",
    RENTAL_MOTEL_ROOM: "phong-tro",
    RENTAL_IN_COMPOUND: "o-ghep",
    RENTAL_WHOLE_HOUSE: "thue-nha-nguyen-can",
    RENTAL_GROUND: "mat-bang",
};

export const title = {
    HeaderSearch: "TÌM KIẾM NHÀ ĐẤT",
    HeaderMain: "Mua bán bất động sản giá tốt 2023",
    titleSale: "Nhà Đất Bán",
    titleRental: "Nhà Đất Cho Thuê",
};
//Mua bán bất động sản => mua-ban-bat-dong-san
export const formatUniToString = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f-,./]/g, "")
        .replace(/đ/g, "d")
        .split(" ")
        .join("-");
};

export const GetNummberFromString = (string) => {
    let number = +string.replace(/[^0-9]/g, "");
    if (number) {
        return number.toString().slice(0, 6);
    }
};

// Từ 1 tỷ - 2 tỷ => [1,2]
export const getNumbersPrice = (string) =>
    string.split(" ").filter((item) => +item);
// Từ 20m2 - 30m2 => [20,30]
export const getNumbersArea = (string) =>
    string
        .split(" ")
        .map((item) => item.match(/\d+/))
        .filter((item) => item !== null);
// \d same as [0-9] +: groups. ex: not +: 23r2 => 2. have +: 23r2 => 23

//Search
export const getCodePrice = (arrType) => {
    return arrType.map((item) => {
        let arr = getNumbersPrice(item.name);
        if (arr.length === 1) {
            if (+arr[0] === 1) {
                return {
                    ...item,
                    min: 0,
                    max: +arr[0],
                };
            }
            if (+arr[0] === 15) {
                return {
                    ...item,
                    min: +arr[0],
                    max: 999,
                };
            }
        } else {
            return {
                ...item,
                min: +arr[0],
                max: +arr[1],
            };
        }
    });
};

export const getCodeArea = (arrType) => {
    return arrType.map((item) => {
        let arr = getNumbersArea(item.name);
        if (arr.length === 1) {
            if (+arr[0] === 20) {
                return {
                    ...item,
                    min: 0,
                    max: +arr[0][0],
                };
            }
            if (+arr[0] === 90) {
                return {
                    ...item,
                    min: +arr[0][0],
                    max: 999,
                };
            }
        } else {
            return {
                ...item,
                min: +arr[0][0],
                max: +arr[1][0],
            };
        }
    });
};

export const getCodeRangePrice = (range_maxmin, prices) => {
    let price_maxmin = getCodePrice(prices);
    return price_maxmin.filter(
        (item) =>
            (item.min >= range_maxmin[0] && item.min < range_maxmin[1]) ||
            (item.min < range_maxmin[1] && item.max > range_maxmin[0])
    );
};
export const getCodeRangeArea = (range_maxmin, areas) => {
    let area_maxmin = getCodeArea(areas);
    return area_maxmin.filter(
        (item) =>
            (item.min >= range_maxmin[0] && item.min < range_maxmin[1]) ||
            (item.max > range_maxmin[0] && item.min < range_maxmin[1])
    );
};

// create Post
export const FormatGetNummber = (string) => {
    string = string.toString();
    let number = +string?.match(/\d+/);
    if (number) {
        return number;
    }
};
