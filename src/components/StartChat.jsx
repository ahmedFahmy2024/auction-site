import { useContext, useState, useEffect } from 'react'
import { Axios } from '../api/Axios';
import { CHAT_ROOM } from '../api/Api';
import ToastContext from '../contexts/ToastProvider';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import '../css/startchat.css';
import {LocalContext} from '../contexts/LocalContext';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function formatDate(isoString) {
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(isoString).toLocaleString('en-US', options);
  }

function StartChat({ scraps }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { showHideToast } = useContext(ToastContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [showChatBar, setShowChatBar] = useState(false);
    const [isChatBarExpanded, setIsChatBarExpanded] = useState(false);
    const [addInput, setAddInput] = useState("");
    const [data, setData] = useState({
        sendName: "",
        sendPhoto: null,
        receiveName: "",
        receivePhoto: null,
        RoomId: ""
    });
    const [messages, setMessages] = useState([]);
    // =========================== begin chat ===========================
    useEffect(() => {
        if (showChatBar) {
            setLoading(true);
            Axios.get(`${CHAT_ROOM}/${scraps?.user_id || scraps?.id}`,)
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
    }, [showChatBar, scraps?.user_id || scraps?.id]);

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
    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "startchat"].join(" ")}>
            <div className="stackblue stack" onClick={handleChatClick}>
                <ChatIcon />
                <div>{t("بدء محادثة")}</div>
            </div>


            {
                showChatBar && (
                    <div
                        className={`chat-bar ${isChatBarExpanded ? "expanded" : "collapsed"
                            }`}
                    >
                        <div className="chat-header" onClick={toggleChatBarHeight}>
                            <div className="team1">
                                <Avatar alt={data?.name} src={data?.receivePhoto} />
                                <h3 style={{ backgroundColor: "transparent"}} className="chat-name">{data?.receiveName}</h3>
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
                                    className={`chat-msg ${message.user_id === Number(scraps?.user_id || scraps?.id) ? "user" : "owner"
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
                )
            }
        </div>
    )
}

export default StartChat