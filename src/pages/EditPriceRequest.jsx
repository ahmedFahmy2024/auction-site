import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/addpricerequest.css'
import TabsEdit from '../components/TabsEdit';

import Container from '@mui/material/Container';


export default function EditPriceRequest() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "addpricerequest"].join(" ")}>
      <Container maxWidth="sm">
        <h1 className="title">{t("طلب تسعير")}</h1>
        <TabsEdit />
      </Container>
    </div>
  )
}