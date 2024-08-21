import React from 'react'
import '../css/footer.css'
import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import ContactUsBody from './ContactUsBody';

export default function Footer() {
    const { locale, setLocale } = useContext(LocalContext);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    
    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "footer"].join(" ")} >
            <Container maxWidth="lg">
                <Grid className='footer-grid' container spacing={5}>
                    <Grid xs={12} md={6} lg={6}>
                        <div className='footer-first-col'>
                            <div className='footer-first-col-logo' onClick={() => navigate("/")}>
                                <img src={require('../assets/footerLogo.png')} alt="" />
                            </div>
                            <div className='footer-first-col-text'>{t("مرحبًا بكم في بي تو بي العربية، المنصة الرائدة لربط الشركات التجارية في سوق العالم العربي. اكتشف الفرص، وشكل شراكات، ووسع آفاق عملك بثقة.")}</div>
                        </div>
                    </Grid>
                    <Grid xs={12} md={6} lg={3}>
                        <h3 className='footer-grid-title'>{t("روابط هامة")}</h3>
                        <ul className='footer-ul'>
                            <li onClick={() => navigate("/")}>{t("الرئيسية")}</li>
                            <li onClick={() => navigate("/aboutUs")}>{t("عن الشركة")}</li>
                            <li onClick={() => navigate("/projects")}>{t("المشاريع")}</li>
                            <li onClick={() => navigate("/browesScrap")}>{t("سكراب")}</li>
                        </ul>
                    </Grid>
                    <Grid xs={12} md={6} lg={3}>
                        <h3 className='footer-grid-title'>{t("روابط هامة")}</h3>
                        <ul className='footer-ul'>
                            <li onClick={() => navigate("/suppliers")} >{t("الموردين")}</li>
                            <li onClick={() => navigate("/corporateContractor")}>{t("مقاولي الباطن")}</li>
                            <li onClick={() => navigate("/individualContractor")}>{t("مقاولى الأفراد")}</li>
                            <li onClick={() => navigate("/engineeringOffice")}>{t("مكاتب هندسية")}</li>
                        </ul>
                    </Grid>
                </Grid>

                <ContactUsBody />
                
            </Container>
        </div>
    )
}
