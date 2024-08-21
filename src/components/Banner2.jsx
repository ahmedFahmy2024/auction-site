import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/banner2.css'
import { NavLink } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


export default function Banner2({ user }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    if (!user) return null
    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "banner2"].join(" ")}>
            <div className="overlay"></div>
            <Container maxWidth="lg">
                <div role="presentation" >
                    {/* <Breadcrumbs className='breadcrumps' separator={<NavigateBeforeIcon sx={{color: "#FFFFFFA8"}} fontSize="small" />} aria-label="breadcrumb">
                        <NavLink className="link-header" to="/suppliers">{t("الموردين")}</NavLink>
                        <Typography className="header-title" color="text.primary">{user.name}</Typography>
                    </Breadcrumbs> */}
                </div>
            </Container>
        </div>
    )
}
