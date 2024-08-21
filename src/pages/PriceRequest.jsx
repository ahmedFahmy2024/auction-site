import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/pricerequest.css'
import { Icon } from '@iconify/react';
import ContainedBtn from '../components/buttons/ContainedBtn';
import { NavLink, useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { ADD_REQUESTS } from '../api/Api';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from '../components/Delete';

const formatCreatedAt = (createdAt, locale) => {
  const date = new Date(createdAt);
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' };
  return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', options);
};

export default function PriceRequest() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { requests, setRunUseEffect } = useUser();

  //  ====== open && close delete state ========
  // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [rowToDelete, setRowToDelete] = useState(null);
  //  ====== open && close delete state ========

  // ================ delete function ================
  // function handleDeleteClick(event, id) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   setRowToDelete(id);
  //   setShowDeleteDialog(true);
  // }

  if (!requests) return null

  console.log(requests)

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "pricerequest"].join(" ")}>
      <div className="pricerequest-container">

        {requests.map((request, index) => {
          return (
            <NavLink style={{ position: 'relative' }} to={`/settings/${id}/pricerequest/${request?.id}/view`} key={index} >
              <div className="first-row" >
                <div className='firstsec'>
                  <div className="stack">
                    <div className='icon'></div>
                    <h3 className='header-price-requset'>{t(request?.type)}</h3>
                  </div>
                  <div className="category">
                    <div className='card-category'>{t(request?.category)}</div>
                  </div>
                </div>

                <div className="secondsec">
                  <div className="date">
                    <Icon icon="healthicons:calendar-outline" width="20" height="20" color='#D87631' />
                    <div className="date-text">{formatCreatedAt(request?.created_at, locale)}</div>
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
                  <div style={{ color: '#000' }} className="main-title">{t("الوصف")}:</div>
                  <div style={{ color: '#000' }} className="title">{request?.name}</div>
                </div>

                {/* <IconButton className='delete-icon-all-project' color='error' size="small" onClick={(event) => handleDeleteClick(event, request?.id)} >
                  <DeleteIcon color='error' fontSize='small' />
                </IconButton> */}
              </div>
              <div className='status-position'>{t(request?.status)}</div>
            </NavLink>
          )
        })}

        <div style={{ marginTop: '20px' }}>
          <NavLink to={`/settings/${id}/priceRequest/add`}>
            <ContainedBtn title={t("اضافة طلب")} />
          </NavLink>
        </div>
      </div>

      {/* ================ delete dialog ================ */}
      {/* <Delete type={ADD_REQUESTS} setShowDeleteDialog={setShowDeleteDialog} rowToDelete={rowToDelete} showDeleteDialog={showDeleteDialog} setRunUseEffect={setRunUseEffect}/> */}
      {/* ================ delete dialog ================ */}
    </div>
  )
}
