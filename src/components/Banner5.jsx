import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/banner5.css'
import { useTranslation } from 'react-i18next';

export default function Banner5({ title, desc }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "banner5"].join(" ")}>
            <div className="overlay"></div>
            <div className='text'>
                <h3 style={{ color: "#D87631" }}>{t("شركة بي تو بي")}</h3>
                <h2 className="title">{t(title)}</h2>
                <p>{t(desc)}</p>
            </div>
        </div>
    )
}