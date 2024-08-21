import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { LocalContext } from '../contexts/LocalContext';
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { Axios } from '../api/Axios';
import { SUPPORT_CHAT, CHAT_ROOM } from '../api/Api';
import ToastContext from '../contexts/ToastProvider';
import Cookie from 'cookie-universal';
import { useUser } from '../contexts/UserProvider';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function formatDate(isoString) {
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(isoString).toLocaleString('en-US', options);
}

const ContactUsBody = () => {
    const { t, i18n } = useTranslation();
    const { locale, setLocale } = useContext(LocalContext);
    const [showChatBar, setShowChatBar] = useState(false);
    const [isChatBarExpanded, setIsChatBarExpanded] = useState(false);
    const [addInput, setAddInput] = useState("");
    const [loading, setLoading] = useState(false);
    // const { id } = useParams();
    const { user } = useUser();
    const { showHideToast } = useContext(ToastContext);
    const [data, setData] = useState({
        sendName: "",
        sendPhoto: null,
        receiveName: "",
        receivePhoto: null,
        RoomId: ""
    });
    const [messages, setMessages] = useState([]);

    const cookies = Cookie()
    const token = cookies.get('website_token')

    // =========================== begin chat ===========================
    useEffect(() => {
        if (showChatBar) {
            setLoading(true);
            Axios.get(`${SUPPORT_CHAT}`,)
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
    }, [showChatBar]);

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

    // open chatbar
    const handleChatClick = () => {
        setShowChatBar(!showChatBar);
    }

    const toggleChatBarHeight = () => {
        setIsChatBarExpanded(!isChatBarExpanded);
    }

    return (
            <div className={[locale === "en" ? "ltr" : "rtl", "footer"].join(" ")}>
                {token && (
                    <div className="support-chat">
                        <div style={{ display: showChatBar ? 'none' : 'flex' }} className='chat-background' onClick={handleChatClick}>
                            <Icon icon="token:chat" width="48" height="48" color="white" />
                        </div>
                        {showChatBar && (
                            <div
                                className={`chat-bar ${isChatBarExpanded ? "expanded" : "collapsed"
                                    }`}
                            >
                                <div className="chat-header" onClick={toggleChatBarHeight}>
                                    <div className="team1">
                                        <Avatar alt={data?.name} src={require('../assets/admin.jpg')} />
                                        <div className='verified-container'>
                                            <h3 className="chat-name">{t("Admin")}</h3>
                                            <Icon icon="solar:verified-check-bold" width="18" height="18" color="#034694" />
                                        </div>
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
                                    {messages.map((message, index) => {

                                        return (
                                            <div
                                                key={index}
                                                className={`chat-msg ${message?.user_id === user?.id ? "owner" : "user"
                                                    }`}
                                            >
                                                <div className="chat-msg-profile">
                                                    <img
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
                                        )
                                    })}
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
                )}
            </div>
    )
}

export default ContactUsBody