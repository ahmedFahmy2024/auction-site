import { useContext } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/registeredauctions.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import { useUser } from '../contexts/UserProvider';
import { useNavigate, useParams } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';

export default function RegisteredAuctions() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { scraps, setRunUseEffect } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!scraps) return null

  const handleNavigate = (e,scrap) => {
    console.log("scrap", scrap);
    e.preventDefault();
    e.stopPropagation();
    navigate(`/browesScrap/${scrap?.id}`);
  }

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "registeredauctions"].join(" ")}>
      <div className="registeredauctions-container">
        <Grid container spacing={2}>
          {scraps.map((scrap, index) => {
            const oneImage = scrap?.images?.split(",");
            return (
              <Grid xs={12} sm={6} md={4} key={index}>
                <div onClick={() => navigate(`/settings/${id}/registeredAuctions/${scrap?.id}/edit`)} className='box'>
                  <div className='img-container'>
                    <img src={oneImage[0]} alt="" />
                  </div>
                  <div className='text'>
                    <div className='stack-row'>
                      <h4>{scrap?.name}</h4>
                      <div className='category'>{scrap?.category}</div>
                    </div>
                    <div className='stack mb'>
                      <div className='stack icons border-left'>
                        <img src={require('../assets/boxes.png')} alt="" />
                        <div>{scrap?.quantity}</div>
                      </div>
                      <div className='stack icons'>
                        <img src={require('../assets/weight.png')} alt="" />
                        <div>{scrap?.unit}</div>
                      </div>
                    </div>
                    <div onClick={(e) => handleNavigate(e, scrap)} className='view-btn'>
                      {t("عرض")}
                    </div>
                  </div>
                </div>
              </Grid>
            )
          })}
        </Grid>
        <div style={{ marginTop: '20px' }}>
          <ContainedBtn title={t("اضافة مزاد")} onClick={() => navigate(`/settings/${id}/registeredAuctions/addscrab`)} />
        </div>
      </div>
    </div>
  )
}
