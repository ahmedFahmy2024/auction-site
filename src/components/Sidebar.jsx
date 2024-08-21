import { useContext } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import '../css/sidebar.css';
import auction from '../assets/auction.svg';

const array1 = [
  { key: 'بيانات أساسية', icon: <Icon icon="fluent:person-16-regular" width="20" height="20" />, path: "." },
  { key: 'كلمة المرور', icon: <Icon icon="material-symbols-light:password" width="20" height="20" />, path: "password" },
  { key: 'الباقات', icon: <Icon icon="ph:package-thin" width="20" height="20" />, path: "packages" },
  { key: 'طلب تسعير', icon: <img style={{ width: "20px", height: "20px" }} src={require('../assets/credit_request.png')} alt="" />, path: "priceRequest" },
  { key: 'اعمال سابقة', icon: <Icon icon="circum:view-list" width="20" height="20" />, path: "prevProjects" },
  // { key: 'تاريخ الرسائل', icon: <Icon icon="material-symbols-light:notifications-unread-outline" width="20" height="20" />, path: "notificationsTable" },
  { key: 'سكراب', icon: <img style={{ width: "20px", height: "20px" }} src={auction} alt="" />, path: "registeredAuctions" },
  { key: 'المحادثات', icon: <Icon icon="lets-icons:chat-alt-2" width="20" height="20" />, path: "Chat" },
  { key: 'الشكاوى', icon: <Icon icon="hugeicons:complaint" width="20" height="20" />, path: "complaint" },
  { key: 'المعاملات', icon: <Icon width='20' height='20' icon="ep:money" />, path: "transcation" },
  { key: 'المزايدات', icon: <Icon icon="streamline:justice-hammer" width="20" height="20" />, path: "bids" },
  { key: 'طلبات المستخدمين', icon: <Icon icon="fluent-mdl2:activity-feed" width="20" height="20" />, path: "userRequest" },
  { key: 'تأهيل الشركات', icon: <Icon icon="fluent-mdl2:company-directory" width="20" height="20" />, path: "supplierRegistration" },
  { key: 'التحول الرقمي', icon: <Icon icon="carbon:data-vis-1" width="20" height="20" />, path: "digitalTransformation" },
];

export default function Sidebar() {
  const { locale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 769px)' });

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "sidebar"].join(" ")}>
      {isDesktopOrLaptop && (
        <div>
          {array1.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => isActive ? 'active' : ''} 
              end
            >
              <div className="sidebar-item">
                {item.icon}
                <p className="sidebar-item-text">{t(item.key)}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}

      {isMobile && (
        <div className='mobile'>
          {array1.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => isActive ? 'active' : ''} 
              end
            >
              <div className="sidebar-item">
                {item.icon}
                <p className="sidebar-item-text">{t(item.key)}</p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
