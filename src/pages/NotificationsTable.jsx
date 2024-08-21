import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/notificationstable.css'
import { Icon } from '@iconify/react';

import Avatar from '@mui/material/Avatar';

export default function NotificationsTable() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "notificationstable"].join(" ")}>
      <div className="notificationstable-container">
        <div className="first-row">
          <div className="first-sec">
            <div className="stack">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <div className="name">{t("اسم المرسل")}</div>
            </div>
            <img style={{ width: "32px", height: "32px" }} src={require('../assets/carbon_notification-new.png')} alt="" />
          </div>
          <hr />
          <div className="second-sec">
            <p className="desc">{t("خسائر اللازمة ومطالبة حدة بل. الآخر الحلفاء أن غزو, إجلاء وتنامت عدد مع. لقهر معركة لبلجيكا، بـ")}</p>
          <div className="date">19\8\2024</div>
          </div>
        </div>
        <div className="first-row">
          <div className="first-sec">
            <div className="stack">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <div className="name">{t("اسم المرسل")}</div>
            </div>
            <img style={{ width: "32px", height: "32px" }} src={require('../assets/carbon_notification-new.png')} alt="" />
          </div>
          <hr />
          <div className="second-sec">
            <p className="desc">{t("خسائر اللازمة ومطالبة حدة بل. الآخر الحلفاء أن غزو, إجلاء وتنامت عدد مع. لقهر معركة لبلجيكا، بـ")}</p>
          <div className="date">19\8\2024</div>
          </div>
        </div>
      </div>
    </div>
  )
}
