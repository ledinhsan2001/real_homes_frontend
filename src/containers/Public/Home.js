import React, { useEffect } from "react";
//Outlet đại diện route con cho Route mẹ. Khi có các route lồng nhau
import { Outlet, useLocation } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { NewPost } from "../components/index";
import * as actions from "../../store/actions";
import { Footer, Header, Search } from "./index";
import { Contact, Overview } from "../components/index";
import { path } from "../../utils/constant";

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(actions.actionPrices());
        dispatch(actions.actionAreas());
        dispatch(actions.actionProvince());
        dispatch(actions.newPost());
        dispatch(actions.actionTransactionType());
        dispatch(actions.realHomeTypes());
        dispatch(actions.actionGetNewsType());
        dispatch(actions.actionGetAllBlogType());
        dispatch(actions.actionGetAllBlog());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.actionUser());
        }, 2000);
        // eslint-disable-next-line
    }, [isLoggedIn, dispatch]);

    const checkUrl = (url) => {
        let incl = location.pathname.includes(url);
        if (incl) return true;
        return false;
    };

    const simplePage = () => {
        if (
            checkUrl("chi-tiet") ||
            location.pathname === `/${path.SERVICE_PRICE}` ||
            checkUrl(path.DETAIL_BLOG__TITLE_ID) ||
            checkUrl("trang-ca-nhan") ||
            checkUrl("blog")
        ) {
            return true;
        } else return false;
    };

    return (
        <>
            {!checkUrl("chi-tiet") &&
                !checkUrl("blog") &&
                !checkUrl(path.DETAIL_BLOG__TITLE_ID) &&
                location.pathname !== `/${path.SERVICE_PRICE}` &&
                !checkUrl("trang-ca-nhan") && (
                    <div className="row w-full">
                        <Header />
                        <Search />

                        <div className="column middle bg-[#F5F5F5]">
                            <Outlet />
                        </div>
                        <div className="column side right h-fit">
                            <NewPost />
                        </div>
                        {!checkUrl("chi-tiet") && <Overview />}
                        {!checkUrl("chi-tiet") && <Contact />}
                        <Footer />
                    </div>
                )}
            {simplePage() && (
                <div className="w-full">
                    <Header />
                    <div className="bg-[#D9D9D9]">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Home;
