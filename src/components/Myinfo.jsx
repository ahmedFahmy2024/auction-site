import { useContext, useState, useEffect } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/myinfo.css'
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { Axios } from '../api/Axios';
import { CHAT_ROOM } from '../api/Api';
import ToastContext from '../contexts/ToastProvider';
import { useUser } from '../contexts/UserProvider';
import { useFavorite } from '../contexts/FavouriteProvider';
import pdf from '../assets/pdf.svg';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function formatDate(isoString) {
  const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  return new Date(isoString).toLocaleString('en-US', options);
}

export default function Myinfo({ user }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const [showChatBar, setShowChatBar] = useState(false);
  const [isChatBarExpanded, setIsChatBarExpanded] = useState(false);
  const [addInput, setAddInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { showHideToast } = useContext(ToastContext);
  const [data, setData] = useState({
    sendName: "",
    sendPhoto: null,
    receiveName: "",
    receivePhoto: null,
    RoomId: ""
  });
  const [messages, setMessages] = useState([]);
  const { user: currentUser } = useUser();
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();

  // =========================== begin chat ===========================
  useEffect(() => {
    if (showChatBar) {
      setLoading(true);
      Axios.get(`${CHAT_ROOM}/${id}`,)
        .then(function (response) {
          // console.log(response.data.chat_room);
          const mydata = response.data.chat_room;
          setData({
            sendName: mydata.user1_name,
            sendPhoto: mydata.user1_profile_image,
            receiveName: mydata.user2_name,
            receivePhoto: mydata.user2_profile_image,
            RoomId: mydata.id
          });
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          showHideToast(error.response.data.message, 'error');
          setLoading(false);
        });
    }
  }, [showChatBar, id]);

  // =========================== get messages ===========================
  useEffect(() => {
    let interval;
    if (showChatBar && data.RoomId) {
      fetchMessages();
      interval = setInterval(fetchMessages, 3000); // Poll every 5 seconds
    }
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [showChatBar, data.RoomId]);

  // Function to fetch messages
  const fetchMessages = () => {
    Axios.get(`${CHAT_ROOM}/${data.RoomId}/messages`)
      .then(response => {
        // console.log(response.data);
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        showHideToast(error.response.data.message, 'error');
        setLoading(false);
      });
  };

  // ======================= send message =======================
  async function sendMessage(e) {
    e.preventDefault();

    const param = {
      message: addInput,
    }

    try {
      await Axios.post(`${CHAT_ROOM}/${data.RoomId}/messages`, param);
      setAddInput("");
      fetchMessages(); // Re-fetch messages after sending
    } catch (error) {
      showHideToast(t("An error occurred. Please try again."), "error");
    }
  }

  if (!user) {
    return null;
  }

  const handleChatClick = () => {
    setShowChatBar(!showChatBar);
  }
  const toggleChatBarHeight = () => {
    setIsChatBarExpanded(!isChatBarExpanded);
  }

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


  // ================= favourite =================
  const handleFavoriteClick = () => {
    if (isFavorite(user.id)) {
      removeFavorite(user.id);
    } else {
      addFavorite(user);
    }
  };

  // ================= image ==================
  function isImageFile(file) {
    if (typeof file === 'string') {
      // If it's a URL, check the file extension
      return /\.(jpeg|jpg|gif|png)$/i.test(file);
    } else if (file instanceof File) {
      // If it's a File object, check the MIME type
      return file.type.startsWith('image/');
    }
    return false;
  }

  const image = user?.accommodation_type ? (isImageFile(user?.accommodation_type) ? user?.accommodation_type : pdf) : null

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "myinfo"].join(" ")}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={4} className="first-grid">
          <Avatar
            className="avatar"
            alt={user?.name}
            src={user?.profile_image}
            sx={{ width: 150, height: 150 }}
          />
          <div className="myinfo-text">
            <h3 className="name">{user?.name}</h3>
            <div className="spacebetween">
              <div className="stack">
                <Icon
                  icon="carbon:location"
                  width="20"
                  height="20"
                  color="#D87631"
                />
                <div className="location">{t(user?.country)}</div>
              </div>
              <div className="stack">
                <Icon
                  icon="hugeicons:maps-location-01"
                  width="20"
                  height="20"
                  color="#D87631"
                />
                <div className="location">{t(user?.state)}</div>
              </div>
            </div>

            {
              user?.id !== currentUser?.id && (
                <>
                  <div className="stackblue stack" onClick={handleChatClick}>
                    <ChatIcon />
                    <div>{t("بدء محادثة")}</div>
                  </div>
                  <div className="stackblue stack" onClick={handleFavoriteClick}>
                    <Icon icon={isFavorite(user.id) ? "material-symbols-light:favorite" : "lets-icons:favorite-light"} width="30" height="30" />
                    <div>{t(isFavorite(user.id) ? "إزالة من المفضلة" : "إضافة الى المفضلة")}</div>
                  </div>
                </>
              )
            }


          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <div className="border-right">
            <h3 className="second-title">
              {t("نبذة")}
            </h3>
            {/* <div className="stack-row">
              <span style={{ fontWeight: '500' }}>{t("نوع الإقامة")}</span>
              <a href={user.accommodation_type} download target="_blank" rel="noopener noreferrer">
                    {isImageFile(user.accommodation_type) ? (
                      <img className='accommodation-img' src={user.accommodation_type} alt="" style={{ position: 'static' }} />
                    ) : (
                      <img src={pdf} alt="PDF icon" style={{ position: 'static' }} />
                    )}
                  </a>
            </div> */}
            <div className="stack-row">
              <span style={{ fontWeight: '500' }}>{t("السجل التجارى")}</span>
              <span>{user?.commercial_register}</span>
            </div>
            <div className="stack-row">
              <span style={{ fontWeight: '500' }}>{t("إسم الشركة")}</span>
              <span>{user?.company_name}</span>
            </div>
            <div className="stack-row">
              <span style={{ fontWeight: '500' }}>{t("الرقم الضريبى")}</span>
              <span>{user?.tax_number}</span>
            </div>
            <h4>{t("بيانات التواصل")}</h4>
            <div className="stack-cards">
              <div className="card-category">
                <PhoneIcon sx={{ color: "#034694" }} />
                <a href={`tel:+${user?.phone}`} target="_blank" rel="noreferrer">
                  {user?.phone}
                </a>
              </div>
              <div className="card-category">
                <ChatIcon sx={{ color: "#034694" }} />
                <a
                  href={`mailto:${user?.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.email}
                </a>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {showChatBar && (
        <div
          className={`chat-bar ${isChatBarExpanded ? "expanded" : "collapsed"
            }`}
        >
          <div className="chat-header" onClick={toggleChatBarHeight}>
            <div className="team1">
              <Avatar alt={data?.name} src={data?.receivePhoto} />
              <h3 className="chat-name">{data?.receiveName}</h3>
            </div>
            <div className="buttons">
              <IconButton onClick={() => setShowChatBar(false)}>
                <CloseIcon fontSize="small" color="error" />
              </IconButton>
              <IconButton onClick={toggleChatBarHeight}>
                {isChatBarExpanded ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>
            </div>
          </div>

          <div className="chat-bar-content">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-msg ${message.user_id === Number(id) ? "user" : "owner"
                  }`}
              >
                <div className="chat-msg-profile">
                  <Avatar
                    className="chat-msg-img"
                    src={message.user_profile_image}
                    alt={message.user_name}
                  />
                  <div className="chat-msg-date">
                    {formatDate(message.created_at)}
                  </div>
                </div>
                <div className="chat-msg-content">
                  <div className="chat-msg-text">{message.message}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sec-section">
            <input
              value={addInput}
              onChange={(e) => setAddInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e);
                }
              }}
              type="text"
              placeholder={t("Type a message...")}
            />
            <IconButton onClick={sendMessage}>
              <Icon icon="lets-icons:send-hor-light" width="28" height="28" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
