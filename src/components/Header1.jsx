import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Icon } from '@iconify/react';
import Badge from '@mui/material/Badge';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Notification from './Notification';

import '../css/header1.css';
import { useContext, useEffect, useState, useRef } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import ToastContext from '../contexts/ToastProvider';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ContainedBtn from './buttons/ContainedBtn';
import OutlineBtn from './buttons/OutlineBtn';
import { useAuth } from '../contexts/AuthProvider';
import { Axios } from '../api/Axios';
import { PROFILE } from '../api/Api';
import Logout from '../pages/Logout';
import Favourite from './Favourite';

const array = [
    { key: 'الرئيسية', path: "/", },
    { key: 'عن الشركة', path: "/aboutUs", },
    { key: 'المشاريع', path: "/projects", },
    { key: 'الموردين', path: "/suppliers", },
    { key: 'مقاولي الشركات', path: "/corporateContractor", },
    { key: 'مقاولى الأفراد', path: "/individualContractor", },
    { key: 'مكاتب هندسية', path: "/engineeringOffice", },
    { key: 'سكراب', path: "/browesScrap", },
    { key: 'الطلبات', path: "/requests", },
]

export default function Header1() {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const sideMenuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();      // to track if i logged in or not
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const { showHideToast } = useContext(ToastContext);

    //  ====== get user ========
    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await Axios.get(`${PROFILE}`);
            setUsers(response.data.user);
        } catch (error) {
            console.log(error);
            // showHideToast(error.response.data.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn]);
    //  ====== get user ========

    // =========== to hide hr in those pages ===========
    const isRegisterPage = location.pathname === '/register';
    const isLoginPage = location.pathname === '/login';
    const isPackagepage = location.pathname === '/package';
    const isForgotPassword = location.pathname === '/forgot';
    const isChangePassword = location.pathname === '/change';

    const isMobileOrTablet = useMediaQuery({
        query: '(max-width: 900px)'
    })

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 901px)'
    })

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    const closeSideMenu = (event) => {
        if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
            setIsSideMenuOpen(false);
        }
    };

    function handleChangeLanguage() {
        const newLocale = locale === "en" ? "ar" : "en";
        setLocale(newLocale);
        i18n.changeLanguage(newLocale);
        localStorage.setItem("language", newLocale);
    }

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            setLocale(storedLanguage);
            i18n.changeLanguage(storedLanguage);
        }

        document.addEventListener("mousedown", closeSideMenu);

        return () => {
            document.removeEventListener("mousedown", closeSideMenu);
        };

    }, []);

    // ================= loading =================
    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "header1"].join(" ")}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>

                    <Grid style={{ display: 'flex', justifyContent: 'flex-start' }} xs={3} md={6}>
                        <div className='logo' onClick={() => navigate("/")}>
                            <img style={{ height: '44px' }} src={require('../assets/mainLogo.png')} alt="" />
                        </div>
                    </Grid>

                    {isDesktopOrLaptop && (
                        <Grid style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end' }} xs={9} md={6}>
                            <Stack sx={{ cursor: 'pointer' }} direction="row" alignItems="center" spacing={1}>
                                <Stack>
                                    {locale === "ar" ? (<IconButton sx={{ width: "18px", height: "10px" }} onClick={() => {
                                        handleChangeLanguage()
                                    }}>
                                        <span id='switcheren' style={{ fontSize: "12px", fontWeight: "400" }}>EN</span>
                                    </IconButton>) : (<IconButton sx={{ width: "18px", height: "10px" }} onClick={() => handleChangeLanguage()}>
                                        <span id='switcherar' style={{ fontSize: "12px", fontWeight: "400" }}>AR</span>
                                    </IconButton>)}
                                </Stack>
                                <img onClick={() => { handleChangeLanguage() }} className='translate' src={require('../assets/cil_language.png')} alt="" />
                            </Stack>

                            {isLoggedIn ? (
                                <>
                                    {/* <Icon icon="material-symbols-light:notifications-outline-rounded" width="32" height="32" /> */}
                                    <Favourite />
                                    <Notification />
                                    <Logout users={users} />
                                    <OutlineBtn title={t('تفاصيل الحساب')} bgColor="white" onClick={() => navigate(`/settings/${users?.id}`)} />
                                    <ContainedBtn title={t('طلب تسعير')} onClick={() => navigate(`/settings/${users?.id}/priceRequest/add`)} />
                                </>
                            ) : (
                                <>
                                    <OutlineBtn title={t('تسجيل حساب')} bgColor="white" onClick={() => navigate('/register')} />
                                </>
                            )}


                        </Grid>
                    )}

                    <Grid style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end' }} xs={9} md={6}>
                        {isMobileOrTablet && (
                            <>
                                {isLoggedIn && (
                                    <div className="stack-row">
                                        <Favourite />
                                        <Notification />
                                        <Logout users={users} />
                                    </div>
                                )}

                                <IconButton onClick={toggleSideMenu}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </>
                        )}
                    </Grid>
                    {isMobileOrTablet && (
                        <div style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: isSideMenuOpen ? 'block' : 'none' }}>
                            <div ref={sideMenuRef} className="side-bar" style={{ width: isSideMenuOpen ? '220px' : '0px', display: 'flex', flexDirection: 'column' }}>
                                <div className="side-menu">
                                    {array.map((item) => (
                                        <NavLink key={item.path} to={item.path} onClick={toggleSideMenu}>
                                            <p className="link-header">{t(item.key)}</p>
                                        </NavLink>
                                    ))}
                                </div>
                                {isSideMenuOpen && (
                                    <Stack sx={{ cursor: 'pointer', justifyContent: 'center', marginTop: 'auto' }} direction="row" alignItems="center" spacing={1}>
                                        <Stack>
                                            {locale === "ar" ? (<IconButton sx={{ width: "18px", height: "10px" }} onClick={() => {
                                                handleChangeLanguage()
                                            }}>
                                                <span id='switcheren' style={{ fontSize: "12px", fontWeight: "400" }}>EN</span>
                                            </IconButton>) : (<IconButton sx={{ width: "18px", height: "10px" }} onClick={() => handleChangeLanguage()}>
                                                <span id='switcherar' style={{ fontSize: "12px", fontWeight: "400" }}>AR</span>
                                            </IconButton>)}
                                        </Stack>

                                        <img onClick={() => { handleChangeLanguage() }} className='translate' src={require('../assets/cil_language.png')} alt="" />
                                    </Stack>
                                )}
                                <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                                    {isLoggedIn ? (
                                        <>
                                            {/* <div className="stack-row">
                                                <Notification />
                                                <Logout users={users} />
                                            </div> */}
                                            <OutlineBtn bottom="20px" title={t('تفاصيل الحساب')} bgColor="white" onClick={() => navigate(`/settings/${users?.id}`)} />
                                            <ContainedBtn title={t('طلب تسعير')} margin="0 auto" onClick={() => navigate(`/settings/${users?.id}/priceRequest/add`)} />
                                        </>
                                    ) : (
                                        <>
                                            <OutlineBtn bottom="20px" title={t('تسجيل حساب')} bgColor="white" onClick={() => navigate('/register')} />

                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Grid>

                {isDesktopOrLaptop && !isRegisterPage && !isLoginPage && !isPackagepage && isForgotPassword && isChangePassword && <hr color='#D6D6D6' />}

            </Container>
        </div >
    )
}
