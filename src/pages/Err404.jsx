import React from 'react'
import '../css/err404.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';

function Err404() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "err403"].join(" ")}>
            <div className='column-row'>
                <div className='image-container'>
                    <img className='image' src={require('../assets/403.png')} alt="" />
                </div>
                <h3>{t("you dont have permission to access this page")}</h3>
            </div>
        </div>
    )
}

export default Err404