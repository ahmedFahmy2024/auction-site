import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useMediaQuery } from "react-responsive";
import '../css/header2.css';

import Container from '@mui/material/Container';


const array = [
  { key: 'الرئيسية', path: "/", },
  { key: 'عن الشركة', path: "/aboutUs", },
  { key: 'المشاريع', path: "/projects", },
  { key: 'الموردين', path: "/suppliers", },
  { key: 'مقاولي الشركات', path: "/corporateContractor", },
  { key: 'مقاولى الأفراد', path: "/individualContractor", },
  { key: 'مكاتب هندسية', path: "/engineeringOffice", },
  { key: 'سكراب', path: "/browesScrap", },
  { key: 'الطلبات', path: "/requests", },
]

export default function Header2() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 901px)'
  })

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "header2"].join(" ")}>
      <Container maxWidth="xl">
        {isDesktopOrLaptop && (
          <div className="links-container">
            {array.map((item) => (
              <NavLink key={item.path} to={item.path}>
                <p className="link-header">{t(item.key)}</p>
              </NavLink>
            ))}
          </div>
        )}

      </Container>
    </div>
  )
}
