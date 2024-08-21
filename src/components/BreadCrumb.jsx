import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/breadcrumb.css'
import { useTranslation } from 'react-i18next';

import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default function BreadCrumb({ project, secTitle, secLocation }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "breadcrumb"].join(" ")}>
            <Breadcrumbs aria-label="breadcrumb" separator={<span></span>}>
                <Link underline="hover" color="inherit" href="/">
                    {t("الرئيسية")}
                </Link>
                {secTitle && (
                    <Link
                        underline="hover"
                        color="inherit"
                        href={secLocation}
                    >
                        {secTitle}
                    </Link>
                )}
                <Typography color="text.primary">{project ? project?.name : (t("اسم المشروع"))}</Typography>
            </Breadcrumbs>
        </div>
    )
}
