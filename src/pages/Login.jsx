import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import ToastContext from '../contexts/ToastProvider';
import '../css/login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import ContainedBtn from '../components/buttons/ContainedBtn';
import { BASE_URL, LOGIN } from '../api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal';
import { useAuth } from '../contexts/AuthProvider';


import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function Login() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const cookies = Cookie()
    const navigate = useNavigate();
    const { login } = useAuth();  // to track if i logged in or not

    const [addInput, setAddInput] = useState({
        Email: '',
        Password: '',
    });

    const handleform = (e) => {
        setAddInput({ ...addInput, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        const param = {
            email: addInput.Email,
            password: addInput.Password
        }

        try {
            const response = await axios.post(`${BASE_URL}${LOGIN}`, param);
            // console.log(response.data);
            const accessToken = response?.data?.access_token;
            cookies.set('website_token', accessToken)
            showHideToast(t("تم تسجيل الدخول بنجاح"), "success");
            setLoading(false);
            login(accessToken);
            // navigate("/");
            window.location.pathname = '/';
        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.message) {
                        showHideToast("The email field must be a valid email address", "error");
                    } else {
                        const errorMessage = locale === "ar" ? error.response.data.message_ar : error.response.data.message_en;
                        showHideToast(errorMessage, "error");
                    }
                } else {
                    showHideToast("An unexpected error occurred.", "error");
                }
            } else if (error.request) {
                showHideToast("No response received from server.", "error");
            } else {
                showHideToast("Error setting up the request.", "error");
            }
            setLoading(false);
        }
    }

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

    const btnIsDisabled = !addInput.Email || !addInput.Password

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "login"].join(" ")}>
            <Grid container spacing={2}>
                <Grid className='grid-text' xs={12} md={6}>
                    <div className='padding'>
                        <h2>{t("تسجيل دخول")}</h2>
                        <TextField
                            label={t("البريد الالكتروني")}
                            size="small"
                            name='Email'
                            type='email'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={addInput.Email}
                            onChange={handleform}
                            required
                        />
                        <TextField
                            label={t("كلمة السر")}
                            size="small"
                            name='Password'
                            type='password'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={addInput.Password}
                            onChange={handleform}
                            required
                        />
                        <div className='stack'>
                            <input type="checkbox" id="rememberMe" name="rememberMe" />
                            <label htmlFor="rememberMe">{t("احفظ بيانات الدخول")}</label>
                        </div>
                        <ContainedBtn title={t("تسجيل دخول")} onClick={handleSubmit} btnIsDisabled={btnIsDisabled} />
                        <div className='stack one'>
                            <p>{t("نسيت كلمة المرور؟")}</p>
                            <NavLink to="/forgot">
                                <span>{t("اضغط هنا")}</span>
                            </NavLink>
                        </div>
                        <div className='stack one'>
                            <p>{t("ليس لديك حساب؟")}</p>
                            <NavLink to="/register">
                                <span>{t("قم بانشاء حساب جديد")}</span>
                            </NavLink>
                        </div>
                    </div>
                </Grid>
                <Grid className='grid-image' md={6}>
                    <div className='image-container'>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
