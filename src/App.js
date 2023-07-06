import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { path } from "./utils/constant";
import "./App.css";
import {
    Home,
    Login,
    Register,
    Rental,
    BuySell,
    ServicePrice,
    Blog,
    Main,
    DetailRealHome,
    HomePage,
    PersonalPage,
    BlogDetail,
} from "./containers/Public/index";
import {
    Private,
    CreatePost,
    ManagePost,
    EditInfor,
    SavePost,
    GetPayment,
    PaymentFail,
    PaymentHistory,
} from "./containers/Private";
import ResetPassword from "./containers/Public/Account/ResetPassword";
import PaymentStatus from "./containers/Private/PaymentStatus";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "./store/actions";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { user_data } = useSelector((state) => state.user);

    useEffect(() => {
        if (isLoggedIn && !user_data) {
            dispatch(logout());
            navigate(`/${path.LOGIN}`);
        }
        // eslint-disable-next-line
    }, [user_data]);

    return (
        <div className="App overflow-hidden w-screen">
            <div className="auth-wrapper">
                <div className="auth-inner flex">
                    <Routes>
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route
                            path={path.RESET_PASSWORD}
                            element={<ResetPassword />}
                        />
                        <Route path={path.REGISTER} element={<Register />} />
                        <Route path={path.HOME} element={<Home />}>
                            <Route path="*" element={<HomePage />} />
                            <Route path={path.RENTAL} element={<Rental />} />
                            <Route
                                exact
                                path={path.BUYSELL}
                                element={<BuySell />}
                            />
                            <Route
                                path={path.PAGE_PERSONAL}
                                element={<PersonalPage />}
                            />
                            <Route
                                path={path.SERVICE_PRICE}
                                element={<ServicePrice />}
                            />
                            <Route path={path.BLOG} element={<Blog />} />
                            <Route
                                path={path.DETAIL_REALHOMES__TITLE_ID}
                                element={<DetailRealHome />}
                            />
                            <Route
                                path={path.DETAIL_BLOG__TITLE_ID}
                                element={<BlogDetail />}
                            />

                            {/* Search */}
                            <Route path={path.SEARCH} element={<Main />} />
                            {/* Buysell */}
                            <Route
                                path={path.SELL_APARTMENTS}
                                element={<Main content={"Bán căn hộ"} />}
                            />
                            <Route
                                path={path.SELL_BOARDING_HOMES}
                                element={<Main content={"Bán nhà trọ"} />}
                            />
                            <Route
                                path={path.SELL_FRONT_HOMES}
                                element={<Main content={"Bán nhà mặt tiền"} />}
                            />
                            <Route
                                path={path.SELL_HOTELS}
                                element={<Main content={"Bán khách sạn"} />}
                            />
                            <Route
                                path={path.SELL_LAND}
                                element={<Main content={"Bán đất"} />}
                            />
                            <Route
                                path={path.SELL_OWN_HOME}
                                element={<Main content={"Bán nhà riêng"} />}
                            />
                            <Route
                                path={path.SELL_PROJECT_LAND}
                                element={<Main content={"Bán đất nên dự án"} />}
                            />
                            <Route
                                path={path.SELL_SHOP}
                                element={<Main content={"Bán cửa hàng"} />}
                            />
                            <Route
                                path={path.SELL_VILLA}
                                element={<Main content={"Bán biệt thự"} />}
                            />
                            <Route
                                path={path.SELL_WAREHOUSE}
                                element={<Main content={"Bán nhà kho"} />}
                            />

                            {/* Rental */}
                            <Route
                                path={path.RENTAL_APARTMENTS}
                                element={<Main content={"Cho thuê căn hộ"} />}
                            />
                            <Route
                                path={path.RENTAL_FRONT_HOMES}
                                element={
                                    <Main content={"Cho thuê nhà mặt tiền"} />
                                }
                            />
                            <Route
                                path={path.RENTAL_GROUND}
                                element={<Main content={"Cho thuê mặt bằng"} />}
                            />
                            <Route
                                path={path.RENTAL_HOTELS}
                                element={
                                    <Main content={"Cho thuê khách sạn"} />
                                }
                            />
                            <Route
                                path={path.RENTAL_IN_COMPOUND}
                                element={<Main content={"Ở ghép"} />}
                            />
                            <Route
                                path={path.RENTAL_LAND}
                                element={<Main content={"Cho thuê đất"} />}
                            />
                            <Route
                                path={path.RENTAL_MOTEL_ROOM}
                                element={
                                    <Main content={"Cho thuê phòng trọ"} />
                                }
                            />
                            <Route
                                path={path.RENTAL_OFFICE}
                                element={
                                    <Main content={"Cho thuê văn phòng"} />
                                }
                            />
                            <Route
                                path={path.RENTAL_WAREHOUSE}
                                element={<Main content={"Cho thuê nhà kho"} />}
                            />
                            <Route
                                path={path.RENTAL_WHOLE_HOUSE}
                                element={
                                    <Main content={"Thuê nhà nguyên căn"} />
                                }
                            />
                        </Route>
                        {/* Private */}
                        <Route path={path.PRIVATE} element={<Private />}>
                            <Route
                                path={path.GET_PAYMENT}
                                element={<GetPayment />}
                            />
                            <Route
                                path={path.PAYMENT_FAIL}
                                element={<PaymentFail />}
                            />
                            <Route
                                path={path.MANAGEMENT_PAGE}
                                element={<ManagePost />}
                            />
                            <Route
                                path={path.CREATE_POST}
                                element={<CreatePost />}
                            />
                            <Route
                                path={path.POST_MANAGEMENT}
                                element={<ManagePost />}
                            />
                            <Route
                                path={path.EDIT_INFOR}
                                element={<EditInfor />}
                            />
                            <Route
                                path={path.PAYMENT_STATUS}
                                element={<PaymentStatus />}
                            />
                            <Route
                                path={path.HISTORY_PAYMENT}
                                element={<PaymentHistory />}
                            />
                            <Route
                                path={path.SAVED_POST}
                                element={<SavePost />}
                            />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
