import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/change.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import ToastContext from '../contexts/ToastProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL, UPDATE_PASSWORD } from '../api/Api';
import axios from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function ChangePassword() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ''; // Retrieve the email from the location state
    const [inputs, setInputs] = useState({
        Password: '',
        ConfirmPassword: '',
    });

    // Validation function
    const validateForm = () => {
        if (!inputs.Password) {
            showHideToast(t("Password is required"), "error");
            return false;
        }
        if (inputs.Password !== inputs.ConfirmPassword) {
            showHideToast(t("Passwords do not match"), "error");
            return false;
        }
        return true;
    };

    // ================ Form Submit Function ================
    async function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true)

        const param = {
            email: email,
            password: inputs.Password
        }

        try {
            const response = await axios.post(`${BASE_URL}${UPDATE_PASSWORD}`, param);
            // console.log(response.data);
            showHideToast(response.data.message, "success");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 422) {
                    showHideToast(error.response.data.message, "error");
                } else {
                    showHideToast(error.response.data.message, "error");
                }
            } else if (error.request) {
                showHideToast(t("An unexpected error occurred."), "error");
            } else {
                showHideToast(t("An unexpected error occurred."), "error");
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


    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "change"].join(" ")}>
            <Grid container spacing={2}>
                <Grid className='grid-text' xs={12} md={6}>
                    <div className='padding'>
                        <h2>{t("تغيير كلمة المرور")}</h2>
                        <TextField
                            label={t("كلمة المرور الجديدة")}
                            size="small"
                            name='Password'
                            type='password'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={inputs.Password}
                            onChange={(e) => setInputs({ ...inputs, Password: e.target.value })}
                        />
                        <TextField
                            label={t("تأكيد كلمة المرور")}
                            size="small"
                            name='ConfirmPassword'
                            type='password'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={inputs.ConfirmPassword}
                            onChange={(e) => setInputs({ ...inputs, ConfirmPassword: e.target.value })}
                        />
                        <div className="stack">
                            <ContainedBtn title={t("ارسال كود")} width="170px" onClick={handleSubmit} />
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
