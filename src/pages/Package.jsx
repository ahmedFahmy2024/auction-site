import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../css/package.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import ToastContext from '../contexts/ToastProvider';
import { PACKAGES, PROFILE, SUBSCRIPTIONS } from '../api/Api';
import { Axios } from '../api/Axios';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Package() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [activeButton, setActiveButton] = useState(0);
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);
    const [users, setUsers] = useState([]);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    //  ====== get user ========
    useEffect(() => {
        setLoading(true);
        Axios.get(`${PROFILE}`,)
            .then(function (response) {
                // console.log(response.data);
                setUsers(response.data.user);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                // showHideToast(error.response.data.message, 'error');
                setLoading(false);
            });
    }, []);
    //  ====== get user ========

    //  ====== get all Packages ========
    useEffect(() => {
        setLoading(true);
        Axios.get(`${PACKAGES}`,)
            .then(function (response) {
                // console.log(response.data);
                setPackages(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                // showHideToast(error.response.data.message, 'error');
                setLoading(false);
            });
    }, []);
    //  ====== get all Packages ========

    // ======== add function ================

    const handleButtonClick = async (packageId) => {
        if (!packageId) {
            // navigate("/");
            window.location.pathname = "/";
            return;
        };
        setActiveButton(packageId);
        setLoading(true);

        const param = {
            user_id: users?.id,
            package_id: packageId,
            promocode: code
        }

        try {
            const response = await Axios.post(`${SUBSCRIPTIONS}`, param);
            // console.log(response.data);
            showHideToast(t("تم الاشتراك بنجاح"), "success");
            setLoading(false);
            // navigate("/");
            window.location.pathname = "/";
        } catch (error) {
            console.log("error package", error);
            showHideToast(error, "error");
            setLoading(false);
        }

    };

    const buttonSelect = (packageId) => {
        setActiveButton(packageId);
    }

    // ======== add function ================

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
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "package"].join(" ")}>
            <Container maxWidth="lg">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 className="title">{t("اختيار الباقة")}</h2>
                    <TextField className='whiteText' value={code} onChange={(e) => setCode(e.target.value)} size="small" name="Code" label={t("Code")} variant="outlined" />
                </div>

                <Grid container spacing={2}>
                    <Grid xs={12} lg={3}>
                        <div className='box'>
                            <div className="header-package">
                                <h3 className="title-first">{t("الباقة الاساسية")}</h3>
                            </div>
                            <hr />
                            <div className="body">
                                <ul>
                                    <li className='each-text'>
                                        <img className='row-fi-first' src={require('../assets/check.png')} alt="" />
                                        <p>{t("الدخول علي اشعارات الطلبات بدون اظهار هوية صاحب الطلب")}</p>
                                    </li>
                                    <li className='each-text'>
                                        <img className='row-fi-second' src={require('../assets/check.png')} alt="" />
                                        <p>{t("ستقبال الاشعارات دون امكانية الرد")}</p>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div className="foter">
                                <ContainedBtn title={t("اشترك الأن")} width="100%" fontWeight="900" fontSize="18px" onClick={() => window.location.pathname = "/"} />
                                <button className={`outline-btn ${activeButton === 10 ? 'active' : ''}`} onClick={() => buttonSelect(10)}>
                                    <img src={activeButton === 10 ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("مجاني")}
                                </button>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <div className='box'>
                            <div className="header-package">
                                <h3 className="title-first">{t("الباقة سكراب")}</h3>
                            </div>
                            <hr />
                            <div className="body">
                                <p className='text-header-li'>{t("كل مميزات الباقة الاساسية بالإضافة إلي")}</p>
                                <ul>
                                    <li className='each-text'>
                                        <img className='row-fi-second' src={require('../assets/check.png')} alt="" />
                                        <p>{t("دخول منصة سكراب و تصفح كل الاعلانات و تفاصيلها")}</p>
                                    </li>
                                    <li className='each-text'>
                                        <img className='row-fi-first' src={require('../assets/check.png')} alt="" />
                                        <p>{t("عمل اعلانات و مشاركة في المزادات و تسعيرات ال سكراب فقط")}</p>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div className="foter">
                                <ContainedBtn title={t("اشترك الأن")} width="100%" fontWeight="900" fontSize="18px" onClick={() => handleButtonClick(activeButton)} />
                                <button className={`outline-btn ${activeButton === packages[0]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[0]?.id)}>
                                    <img src={activeButton === packages[0]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("3 شهور : ")}
                                    {packages[0]?.price} $
                                </button>
                                <button className={`outline-btn ${activeButton === packages[1]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[1]?.id)}>
                                    <img src={activeButton === packages[1]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("6 شهور : ")}
                                    {packages[1]?.price} $
                                </button>
                                <button className={`outline-btn ${activeButton === packages[2]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[2]?.id)}>
                                    <img src={activeButton === packages[2]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("12 شهور : ")}
                                    {packages[2]?.price} $
                                </button>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <div className='box'>
                            <div className="header-package">
                                <h3 className="title-first">{t("الباقة الفضية")}</h3>
                            </div>
                            <hr />
                            <div className="body">
                                <p className='text-header-li'>{t("كل مميزات الباقة الاساسية بالإضافة إلي")}</p>
                                <ul>
                                    <li className='each-text'>
                                        <img className='row-fi-third' src={require('../assets/check.png')} alt="" />
                                        <p>{t("خدمة التواصل مع المقاولين والموردين والعملاء شات الاطلاع على البروفيل المقاولين والموردين الاطلاع على إعلانات المشاريع وعلي بعض بيانات اعلانات السكراب بدون القدرة على التسعير او دخول المزادات او معرفه")}</p>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div className="foter">
                                <ContainedBtn title={t("اشترك الأن")} width="100%" fontWeight="900" fontSize="18px" onClick={() => handleButtonClick(activeButton)} />
                                <button className={`outline-btn ${activeButton === packages[3]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[3]?.id)}>
                                    <img src={activeButton === packages[3]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("3 شهور : ")}
                                    {packages[3]?.price} $
                                </button>
                                <button className={`outline-btn ${activeButton === packages[4]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[4]?.id)}>
                                    <img src={activeButton === packages[4]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("6 شهور : ")}
                                    {packages[4]?.price} $
                                </button>
                                <button className={`outline-btn ${activeButton === packages[5]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[5]?.id)}>
                                    <img src={activeButton === packages[5]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("12 شهور : ")}
                                    {packages[5]?.price} $
                                </button>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} lg={3}>
                        <div className='box'>
                            <div className="header-package">
                                <h3 className="title-first">{t("الباقة الذهبية")}</h3>
                            </div>
                            <hr />
                            <div className="body">
                                <p className='text-header-li'>{t("كل مميزات الباقة الاساسية بالإضافة إلي ")}</p>
                                <ul>
                                    <li className='each-text'>
                                        <img className='row-fi-forth' src={require('../assets/check.png')} alt="" />
                                        <p>{t("جميع الخدمات التواصل طلب التسعير طلب دخول مزادات طلب التأهيليات للشركات مميزات كل الباقات و صلاحيات كل المنص")}</p>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div className="foter">
                                <ContainedBtn title={t("اشترك الأن")} width="100%" fontWeight="900" fontSize="18px" onClick={() => handleButtonClick(activeButton)} />
                                <button className={`outline-btn ${activeButton === packages[6]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[6]?.id)}>
                                    <img src={activeButton === packages[6]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("3 شهور : ")}
                                    {packages[6]?.price} $
                                </button>
                                <button className={`outline-btn ${activeButton === packages[7]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[7]?.id)}>
                                    <img src={activeButton === packages[7]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("6 شهور : ")}
                                    {packages[7]?.price} $
                                </button>
                                <button className={`outline-btn ${activeButton === packages[8]?.id ? 'active' : ''}`} onClick={() => buttonSelect(packages[8]?.id)}>
                                    <img src={activeButton === packages[8]?.id ? require('../assets/Group.png') : require('../assets/Group1.png')} alt="" />
                                    {t("12 شهور : ")}
                                    {packages[8]?.price} $
                                </button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
