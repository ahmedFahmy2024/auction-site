import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/cooperating.css'

import Container from '@mui/material/Container';

export default function Cooperating() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "cooperating"].join(" ")}>
            <Container maxWidth="lg">
                <div className="cooperating-container">
                    <h2 className='cooperating-title'>{t("شركاء النجاح")}</h2>
                    <p className='cooperating-text'>{t("نحن في بي تو بي العربية نقدم فرصًا لا مثيل لها لشركائنا للمشاركة في رحلة النجاح معنا. نؤمن بقوة التعاون والشراكات المثمرة التي تدفع بأعمالنا نحو التميز والازدهار.")}</p>
                </div>
                <div className="container-cooperating-logo">
                    <div className="cooperating-logo-first">
                        <div >
                            <img src={require('../assets/Logo.png')} alt="" />
                        </div>
                        <div>
                            <img src={require('../assets/Vector (1).png')} alt="" />
                        </div>
                        <div>
                            <img src={require('../assets/Vector.png')} alt="" />
                        </div>
                        <div>
                            <img src={require('../assets/Vector (1).png')} alt="" />
                        </div>
                    </div>
                    <div className="cooperating-logo-second" >
                        <div>
                            <img src={require('../assets/Logo (1).png')} alt="" />
                        </div>
                        <div>
                            <img src={require('../assets/Logo.png')} alt="" />
                        </div>
                        <div>
                            <img src={require('../assets/Logo (1).png')} alt="" />
                        </div>
                        <div>
                            <img src={require('../assets/Vector.png')} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
