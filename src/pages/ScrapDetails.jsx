import { useContext, useState, useEffect } from "react";
import { LocalContext } from "../contexts/LocalContext";
import ToastContext from "../contexts/ToastProvider";
import "../css/browsescrap.css";
import BreadCrumb from "../components/BreadCrumb";
import FirstSection from "../components/FirstSection";
import SecondSection from "../components/SecondSection";
import ThirdSection from "../components/ThirdSection";
import { Axios } from "../api/Axios";
import { SCRAPS } from "../api/Api";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FakeSection from "../components/FakeSection";

export default function ProjectName() {
    const { locale, setLocale } = useContext(LocalContext);
    const { showHideToast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [scraps, setScraps] = useState([]);
    const [runUseEffect1, setRunUseEffect1] = useState(false);
    const { currentSubscription } = useUser();

    // prevent user from open inspect page
    // useEffect(() => {
    //     // Disable right-click
    //     document.addEventListener('contextmenu', (e) => e.preventDefault());

    //     function ctrlShiftKey(e, keyCode) {
    //         return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    //     }

    //     document.onkeydown = (e) => {
    //         // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    //         if (
    //             e.keyCode === 123 ||
    //             ctrlShiftKey(e, 'I') ||
    //             ctrlShiftKey(e, 'J') ||
    //             ctrlShiftKey(e, 'C') ||
    //             (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    //         ) {
    //             return false;
    //         }
    //     };

    //     // Cleanup event listeners on component unmount
    //     return () => {
    //         document.removeEventListener('contextmenu', (e) => e.preventDefault());
    //         document.onkeydown = null;
    //     };
    // }, []);

    // Fetch all scraps
    useEffect(() => {
        setLoading(true);
        Axios.get(`${SCRAPS}/${id}`)
            .then(function (response) {
                // console.log(response.data.scrap);
                setScraps(response.data.scrap);
                setLoading(false);
            })
            .catch(function (error) {
                showHideToast(error.response.data.message, "error");
                setLoading(false);
            });
    }, [runUseEffect1]);

    if (loading) {
        return (
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const isSilverPackage =
        currentSubscription &&
        currentSubscription?.package_name?.includes("الباقة الفضية");

    return (
        <div
            dir={locale === "en" ? "ltr" : "rtl"}
            className={[locale === "en" ? "ltr" : "rtl", "browsescrap"].join(" ")}
        >
            <Container maxWidth="lg">
                <div className="first-row">
                    <BreadCrumb
                        project={scraps}
                        secTitle={locale === "en" ? "Scrap" : "السكراب"}
                        secLocation="/browesScrap"
                    />
                </div>
                <FirstSection scraps={scraps} />
                {!isSilverPackage ? (
                    <>
                        <ThirdSection scraps={scraps} />
                        <SecondSection scraps={scraps} setRunUseEffect1={setRunUseEffect1} />
                    </>
                ) : (
                    <FakeSection />
                )}
                    
            </Container>
        </div>
    );
}
