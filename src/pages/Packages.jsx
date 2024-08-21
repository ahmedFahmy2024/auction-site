import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import ContainedBtn from '../components/buttons/ContainedBtn';
import OutlineBtn from '../components/buttons/OutlineBtn';
import '../css/packages.css'
import { useUser } from '../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';

export default function Packages() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const { currentSubscription } = useUser();
    const navigate = useNavigate();

    const [addinput, setAddinput] = useState({
        Subscription: '',
        Date: '',
        Days: '',
    });

    const handleform = (e) => {
        setAddinput({ ...addinput, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (currentSubscription) {
            setAddinput({
                Subscription: currentSubscription.package_name,
                Date: currentSubscription.end_date,
                Days: currentSubscription.remaining_days
            })
        }
    }, [currentSubscription])

    if(!currentSubscription) return null;


    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "packages"].join(" ")}>
            <div className="packages-container">
                <div className="first-row">
                <TextField disabled onChange={handleform} value={addinput.Subscription} sx={{ mb: 2 }} type='text' name='Subscription' size='small' label={t("الباقة الحالية")} variant="outlined" fullWidth />
                <TextField disabled onChange={handleform} value={addinput.Date} sx={{ mb: 2 }} type='text' name='Date' size='small' label={t("تاريخ الإنتهاء")} variant="outlined" fullWidth />
                <TextField disabled onChange={handleform} value={addinput.Days} sx={{ mb: 2 }} type='text' name='Days' size='small' label={t("الأيام المتبقية")} variant="outlined" fullWidth />
                </div>
                <div className="second-row">
                    <ContainedBtn title={t("تغيير الباقة")} padding='5px' fontSize='14px' onClick={() => navigate('/package')}  />
                </div>
                <div className="forth-row">
                    {/* <ContainedBtn title={t("حفظ التعديلات")} padding='5px' fontSize='14px' /> */}
                    {/* <OutlineBtn title={t("إلغاء")} bgColor='white' bdColor="#767676" color='#838383' fontsize='14px' padding='5px' width='130px' /> */}
                </div>
            </div>
        </div>
    )
}
