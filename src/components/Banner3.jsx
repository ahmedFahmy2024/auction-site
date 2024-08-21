import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/banner3.css'

export default function Banner3() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "banner3"].join(" ")}>
            <div className="overlay"></div>
            <div className='text'>
                <h3 style={{ color: "#D87631" }}>{t("شركة بي تو بي")}</h3>
                <h2 className="title">{t("سكراب (المزاد)")}</h2>
                <p>{t("اكتشف عالم السكراب والمزادات معنا، حيث نقدم لك فرصًا متميزة للشراء والبيع، وتجارب فريدة تلبي احتياجاتك وتطلعاتك في هذا القطاع المتنوع والمثير.")}</p>
            </div>
        </div>
    )
}
