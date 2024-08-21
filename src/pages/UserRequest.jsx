import { useContext, useState, useEffect, useCallback } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/userRequest.css'
import moment from "moment";
import "moment/locale/ar";
import { Axios } from '../api/Axios';
import { USER_REQUEST } from '../api/Api';

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const UserRequest = () => {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);

  // to change time based on locale
  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  // ========================== get all notifications ==========================
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await Axios.get(`${USER_REQUEST}`);
      // console.log(Object.values(response.data.notifications));
      setNotification(Object.values(response.data.notifications));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);


  //   ====================== show mareked all notification icon ======================
  const getMessage = (item) => {
    const type = item.type;
    if (
      type === "App\\Notifications\\ScrapCreated" ||
      type === "App\\Notifications\\QuoteRequested"
    ) {
      return locale === "en"
        ? [item.data.message_en_1]
        : [item.data.message_ar_1];
    } else {
      return locale === "en" ? [item.data.message_en] : [item.data.message_ar];
    }
  };

  // ================= loading =================
  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  // Function to handle navigation based on notification data
  const handleNavigate = (item) => {
    if (item?.data?.scrap_id) {
      window.location.href = `/browesScrap/${item?.data?.scrap_id}`;
    } else if (item?.data?.quote_request_id) {
      window.location.href = `/request/${item?.data?.quote_request_id}`;
    }
  };

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "userrequest"].join(" ")}>

      <div className="second-box">
        <div data-simplebar="init" className="massages">
          <div className="simplebar-wrapper">
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer"></div>
            </div>
            <div className="simplebar-mask">
              <div className="simplebar-offset">
                <div className="simplebar-content-wrapper">
                  <div className="simplebar-content">
                    <div className="list">
                      {notification?.map((item) => (
                        <div
                          key={item?.id}
                          className="item"
                          style={{
                            backgroundColor: "hsl(211, 68%, 94%)",
                          }}
                        >
                          <div className="avatar-img">
                            <div className="avatar-container">
                              <Avatar
                                sx={{ width: 50, height: 50, mx: "10px" }}
                                src={item?.data?.user_profile_image}
                                alt={item?.data?.user_name}
                              />
                            </div>
                          </div>
                          <div className="text">
                            <div className="main-text">
                              <div className="first-line">
                                <p className="sentence">
                                  <strong>{item?.data?.user_name}</strong>
                                  {moment(item?.created_at).fromNow()}
                                </p>

                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                  {item?.data?.scrap_id || item?.data?.quote_request_id ? (
                                    <IconButton className='nav-icon' onClick={() => handleNavigate(item)}>
                                      <KeyboardBackspaceIcon />
                                    </IconButton>
                                  ) : null}
                                </div>

                              </div>
                              <div className="second-line">
                                {getMessage(item).map((msg, index) => (
                                  <p key={index}>{msg}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="simplebar-track simplebar-vertical">
            <div className="simplebar-scrollbar"></div>
          </div>
        </div>
      </div>
      {/* <hr className="hr" /> */}
      <div className="third-box"></div>
    </div>
  )
}

export default UserRequest