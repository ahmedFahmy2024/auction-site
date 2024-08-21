import React, { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/moreinfo.css'
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Unstable_Grid2';

export default function MoreInfo() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  
  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "moreinfo"].join(" ")}>
      <Grid container spacing={2}>
        <Grid xs={6} md={4}>
          <div className="moreinfo-card">
            <div>
              <img src={require('../assets/Telescope .png')} alt="" />
            </div>
            <h3>{t("رؤيتنا")}</h3>
            <p>{t("نسعى لأن نكون الشريك الاستراتيجي الأول للشركات في العالم العربي، من خلال تقديم حلول تكنولوجيا المعلومات المبتكرة والموثوقة.")}</p>
          </div>
        </Grid>
        <Grid xs={6} md={4}>
        <div className="moreinfo-card">
            <div>
              <img src={require('../assets/Business.png')} alt="" />
            </div>
            <h3>{t("رسالتنا")}</h3>
            <p>{t("نحن هنا لدعم الشركات في النمو والتطور، من خلال تمكينها من الابتكار والتفوق في بيئة أعمال متغيرة وتحديات اقتصادية دولية.")}</p>
          </div>
        </Grid>
        <Grid xs={6} md={4}>
        <div className="moreinfo-card">
            <div>
              <img src={require('../assets/City.png')} alt="" />
            </div>
            <h3>{t("هدفنا")}</h3>
            <p>{t("نسعى إلى تحقيق الشراكات الناجحة وبناء علاقات طويلة الأمد مع عملائنا، من خلال تقديم أفضل الخدمات والحلول التكنولوجية التي تلبي احتياجاتهم وتساعدهم في تحقيق أهدافهم الاستراتيجية.")}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
