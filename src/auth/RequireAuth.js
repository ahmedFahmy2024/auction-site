import Cookie from 'cookie-universal';
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { PROFILE } from "../api/Api";
import { Axios } from "../api/Axios";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Err404 from '../pages/Err404';

export default function RequireAuth() {
    const [user, setUser] = useState("");
    const [currentSubscription, setCurrentSubscription] = useState([]);
    const cookies = Cookie()
    const token = cookies.get('website_token')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`${PROFILE}`)
                setUser(response.data.user)
                setCurrentSubscription(response.data.current_subscription)
                // console.log("profile", response.data.current_subscription)
            } catch (error) {
                console.log(error)
                navigate('/Login', { replace: true })
            }
        }

        fetchData()
    }, [token, navigate])

    // return token ? (
    //     user === "" ? (
    //         <Backdrop open
    //             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //         >
    //             <CircularProgress color="inherit" />
    //         </Backdrop>
    //     ) : (
    //         <Outlet />
    //     )
    // ) : (
    //     <Navigate to="/Login" replace={true} />);
    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    if (user === "") {
        return (
            <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (!currentSubscription) {
        return <Navigate to="/package" replace={true} />;
    }

    const scrapPackages = ["الباقة سكراب 3 شهور", "الباقة سكراب 6 شهور", "الباقة سكراب 12 شهور"];
    const isScrapPackage = scrapPackages.includes(currentSubscription.package_name);

    const goldenpackages = ["الباقة الذهبية 3 شهور", "الباقة الذهبية 6 شهور", "الباقة الذهبية 12 شهور"];
    const isGoldenPackage = goldenpackages.includes(currentSubscription.package_name);

    // Handle routes specifically related to Scrap
    if (isScrapPackage && (window.location.pathname.startsWith("/browesScrap") || window.location.pathname.startsWith("/settings"))) {
        return <Outlet />;
    }

    // For other routes, show Err404 for scrap packages
    if (isScrapPackage) {
        return <Err404 />;
    }

    // Handle routes specifically related to Scrap
    if (!isGoldenPackage && (window.location.pathname.startsWith("/contactUs"))) {
        return <Err404 />;
    }

// to check if the current subscription expired
if (currentSubscription?.suspend === 1) {
    return <Navigate to="/package" replace={true} />;
}

if (currentSubscription?.status === 'active') {
    return <Outlet />;
}

if (currentSubscription?.status === 'disabled') {
    return <Navigate to="/package" replace={true} />;
}

// to check if the current subscription expired

    return <Outlet />;
}