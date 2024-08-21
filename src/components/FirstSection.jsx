import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/firstsection.css'
import Myimage from './Myimage';

import Grid from '@mui/material/Unstable_Grid2';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function FirstSection({ scraps }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  if (!scraps) return null

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "firstsection"].join(" ")}>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Myimage scraps={scraps} />
        </Grid>
        <Grid xs={12} md={6}>
          <div className='sec-section'>
            <div className='stack-first'>
              <h3 className='head-sec'>{scraps?.name}</h3>
              <div className='category'>{scraps?.category}</div>
            </div>
            <h4 className='sec-description'>{t("تفاصيل المنتج")}</h4>
            <div className='stack main-hold'>
              <div className='stack icons border-left'>
                <img src={require('../assets/boxes.png')} alt="" />
                <div className="one-box">
                  <div className='name-sec-last'>{t("الكمية")}:</div>
                  <div className='name-sec-last'>{scraps?.quantity}</div>
                </div>

              </div>
              <div className='stack icons border-left'>
                <img src={require('../assets/weight.png')} alt="" />
                <div className="one-box">
                  <div className='name-sec-last'>{t("الوحدة")}:</div>
                  <div className='name-sec-last'>{scraps?.unit}</div>
                </div>
              </div>
              <div className='stack icons'>
                <LocationOnOutlinedIcon sx={{ color: '#D87631' }} />
                <div className="one-box">
                  <div className='name-sec-last'>{t("المكان")}:</div>
                  <div className='name-sec-last'>{scraps?.location}</div>
                </div>
              </div>
            </div>
            <h4 className='sec-description-sec'>{t("الوصف")}</h4>
            <p className='sec-para'>{scraps?.description}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
