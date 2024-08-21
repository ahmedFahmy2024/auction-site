import '../css/landing.css'
import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContainedBtn from './buttons/ContainedBtn';
import OutlineBtn from './buttons/OutlineBtn';
import Cookie from 'cookie-universal';

import { Stack } from '@mui/material';
import Container from '@mui/material/Container';


export default function Landing() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const cookies = Cookie()
    const token = cookies.get('website_token')

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "landing"].join(" ")}>
            <div className="overlay"></div>
            <Container maxWidth="lg">
                <div className="text">
                    <div className="content">
                        <h3 style={{ color: "#D87631", fontSize: "20px" }}>{t("تبسيط اتصالات الأعمال")}</h3>
                        <h2>{t(" ربط الشركات عبر العالم العربي")}</h2>
                        <p>{t("مرحبًا بكم في بي تو بي العربية، المنصة الرائدة لربط الشركات التجارية في سوق العالم العربي. اكتشف الفرص، وشكل شراكات، ووسع آفاق عملك بثقة.")}</p>
                        <Stack sx={{ mt: 3, justifyContent: { xs: "center", md: "flex-start" } }} direction="row" spacing={2}>
                            {token ? null : <ContainedBtn title={t('سجل الأن')} color="black" onClick={() => navigate("/register")} />}
                            <OutlineBtn color="#D87631" bgColor="transparent" title={t('تصفح المشاريع')} onClick={() => navigate("/projects")} />
                        </Stack>
                    </div>
                </div>
            </Container>
        </div>
    )
}
