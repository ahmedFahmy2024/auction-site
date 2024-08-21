import { useContext, useState, useEffect } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/orderscontent.css'
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

export default function RequestsContent({ requests }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  if(!requests) return null
 
  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "orderscontent"].join(" ")}>
      <div className="pricerequest-container">

        {requests.map((request, index) => (
          request.status === "published" && (
            <NavLink to={`/request/${request?.id}`} key={index} className="nav-link">
              <div className="first-row" >
                <div className='firstsec'>
                  <div className="stack">
                    <div className='icon'></div>
                    <h3 className='header-price-requset'>{t(request?.type)}</h3>
                  </div>
                  <div className="category">
                    <div className='card-category'>{request?.category}</div>
                  </div>
                </div>

                <div className="secondsec">
                  <div className="date">
                    <Icon icon="healthicons:calendar-outline" width="20" height="20" color='#D87631' />
                    <div className="date-text">{formatCreatedAt(request?.created_at)}</div>
                  </div>

                  <div className="country">
                    <Icon icon="material-symbols-light:location-on-outline-rounded" width="20" height="20" color='#D87631' />
                    <div style={{ color: '#000' }} className="country-text">{t(request?.country)}</div>
                  </div>

                  <div className="state">
                    <Icon icon="material-symbols-light:location-on-outline-rounded" width="20" height="20" color='#D87631' />
                    <div style={{ color: '#000' }} className="state-text">{t(request?.state)}</div>
                  </div>

                </div>

                <div className="thirdSec">
                  <div style={{ color: '#000' }} className="main-title">{t("العنوان")}:</div>
                  <div style={{ color: '#000' }} className="title">{request?.name}</div>
                </div>

              </div>
            </NavLink>
          )
        ))}
      </div>
    </div>
  )
}
