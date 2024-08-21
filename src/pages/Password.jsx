import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import ToastContext from '../contexts/ToastProvider';
import '../css/password.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import OutlineBtn from '../components/buttons/OutlineBtn';
import { Axios } from '../api/Axios';
import { CHANGE_PASSWORD } from '../api/Api';

import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Password() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const { showHideToast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const [addinput, setAddinput] = useState({
        Old: '',
        New: '',
        Confirm: '',
    });

    const handleform = (e) => {
        setAddinput({ ...addinput, [e.target.name]: e.target.value })
    }

     // Validation function
     const validateForm = () => {
        if (!addinput.Old) {
            showHideToast(t("Old Password is required"), "error");
            return false;
        }
        if (!addinput.New) {
            showHideToast(t("New Password is required"), "error");
            return false;
        }
        if (addinput.New !== addinput.Confirm) {
            showHideToast(t("Passwords do not match"), "error");
            return false;
        }
        return true;
    };

    // handle change password
    const handleChangePassword = async (e) => {
        if (!validateForm()) return;
        e.preventDefault();
        setLoading(true);
        const param = {
            old_password: addinput.Old,
            new_password: addinput.New
        }

        try {
            const response = await Axios.post(CHANGE_PASSWORD, param);
            // console.log(response.data);
            showHideToast(t("تم تغيير كلمة المرور بنجاح"), "success");
            setLoading(false);
            setAddinput({
                Old: '',
                New: '',
                Confirm: '',
            })
        } catch (error) {
            console.log(error);
            // showHideToast(error, "error");
            setLoading(false);
        }
    }


    // ======================= loading ========================
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
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "password"].join(" ")}>
            <div className="password-container">
                <div className="first-row">
                    <TextField onChange={handleform} value={addinput.Old} sx={{ mb: 2 }} type='password' name='Old' size='small' label={t("كلمة المرور القديمة")} variant="outlined" fullWidth />
                    <TextField onChange={handleform} value={addinput.New} sx={{ mb: 2 }} type='password' name='New' size='small' label={t("كلمة المرور الجديدة")} variant="outlined" fullWidth />
                    <TextField onChange={handleform} value={addinput.Confirm} type='password' name='Confirm' size='small' label={t("تأكيد كلمة المرور")} variant="outlined" fullWidth />
                </div>
                <div className="forth-row">
                    <ContainedBtn title={t("حفظ التعديلات")} padding='5px' fontSize='14px' onClick={handleChangePassword} />
                    {/* <OutlineBtn title={t("إلغاء")} bgColor='white' bdColor="#767676" color='#838383' fontsize='14px' padding='5px' width='130px' /> */}
                </div>
            </div>
        </div>
    )
}
