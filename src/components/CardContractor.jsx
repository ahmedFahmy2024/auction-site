import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/cardcontractor.css'
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';

export default function CardContractor({ user }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  if (!user) return;
  // console.log(user)
  
  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "cardcontractor"].join(" ")}>
      <NavLink to={`/contractor/${user?.id}`} className='card-body'>
        <div className='card-bg'></div>
        <div className='card-img'>
          <Avatar
            alt={user?.name}
            src={user?.profile_image}
            sx={{ width: 106, height: 106 }}
          />
        </div>
        <div className='card-text'>
          <h3>{user?.name}</h3>
          <div className="spacebetween">
            <div className='stack'>
              <Icon icon="carbon:location" width="20" height="20" color='#D87631' />
              <div>{t(user?.country)}</div>
            </div>
            <div className='stack'>
              <Icon icon="hugeicons:maps-location-01" width="20" height="20" color='#D87631' />
              <div className='lastone'>{t(user?.state)}</div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  )
}
