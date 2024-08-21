import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import '../css/settings.css'

import Container from '@mui/material/Container';


export default function Settings() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 769px)'
    })

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "settings"].join(" ")}>
            <Container maxWidth="lg">
                {isDesktopOrLaptop && (
                    <div style={{ backgroundColor: "white", padding: "20px", display: "flex", }}>
                        <Sidebar />
                        <Outlet />
                    </div>
                )}

                {isMobile && (
                    <div style={{ backgroundColor: "white", padding: "20px", }}>
                        <Sidebar />
                        <Outlet />
                    </div>
                )}

            </Container>
        </div>
    )
}
