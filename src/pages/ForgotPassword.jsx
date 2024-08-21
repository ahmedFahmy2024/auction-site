import React, { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/forgot.css'
import OutlineBtn from '../components/buttons/OutlineBtn';
import ContainedBtn from '../components/buttons/ContainedBtn';
import ToastContext from '../contexts/ToastProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import { BASE_URL, FORGOT, OTP } from '../api/Api';
import axios from 'axios';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { Icon } from '@iconify/react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ForgotPassword() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [inputs, setInputs] = useState({
        OTP1: '',
        OTP2: '',
        OTP3: '',
        OTP4: '',
    });

    const handleForm = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        const param = {
            email: email
        }
        try {
            const response = await axios.post(`${BASE_URL}${FORGOT}`, param);
            // console.log(response.data);
            setLoading(false);
            showHideToast(t("تم إرسال رسالة للبريد الالكتروني"), "success");
            handleClickOpen();
        } catch (error) {
            console.log(error);
            if (error.response.status === 422) {
                showHideToast(error.response.data.message, "error");
            } else {
                showHideToast("An unexpected error occurred.", "error");
            }
            setLoading(false);
        }
    }
    async function handleOTP(e) {
        e.preventDefault();
        setLoading(true)

        const param = {
            email: email,
            otp: inputs.OTP1 + inputs.OTP2 + inputs.OTP3 + inputs.OTP4
        }
        try {
            const response = await axios.post(`${BASE_URL}${OTP}`, param);
            // console.log(response.data);
            const data = await response.data;
            setLoading(false);
            handleClose();
            showHideToast(locale === "ar" ? data?.message_ar : data.message_en , "success");
            navigate("/change", { state: { email: email } });
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                showHideToast(locale === "ar" ? error.response.data.message_ar : error.response.data.message_en, "error");
            } else {
                showHideToast("An unexpected error occurred.", "error");
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
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "forgot"].join(" ")}>
            <Grid container spacing={2}>
                <Grid className='grid-text' xs={12} md={6}>
                    <div className='padding'>
                        <h2>{t("استرجاع كلمة المرور")}</h2>
                        <TextField
                            label={t("البريد الالكتروني")}
                            id="outlined-size-small"
                            size="small"
                            name='Email'
                            type='email'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="stack">
                            <NavLink to="/change">
                                <ContainedBtn title={t("ارسل رسالة استرجاع")} width="170px" onClick={handleSubmit} />
                            </NavLink>
                            <OutlineBtn title={t("عودة")} width="120px" onClick={() => navigate("/login")} />
                        </div>
                    </div>
                </Grid>
                <Grid className='grid-image' md={6}>
                    <div className='image-container'>
                    </div>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className='dialog'
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    <Icon icon="hugeicons:mobile-protection" width="75" height="75" color="#D87631" />
                        <h3>{t("الرجاء إدخال رمز التحقق")}</h3>
                        <p>{t("تم ارسال رمز التحقق على بريدك الالكتروني")}.</p>
                        <form className='otp-form' id='OTP-form'>
                        <div className="container">
                                <input value={inputs.OTP1} onChange={handleForm} type="text" name="OTP1" id="otp1" maxLength="1" />
                                <input value={inputs.OTP2} onChange={handleForm} type="text" name="OTP2" id="otp2" maxLength="1" />
                                <input value={inputs.OTP3} onChange={handleForm} type="text" name="OTP3" id="otp3" maxLength="1" />
                                <input value={inputs.OTP4} onChange={handleForm} type="text" name="OTP4" id="otp4" maxLength="1" />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                    <ContainedBtn title={t("تأكيد")} width="170px" onClick={handleOTP} />
                </DialogActions>
            </Dialog>
        </div>
    )
}
