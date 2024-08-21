import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { Axios } from "../api/Axios";
import { CHAT_ROOM } from "../api/Api";
import ToastContext from "../contexts/ToastProvider";
import ChatMessage from "./ChatMessage";

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Icon } from "@iconify/react";

function LiveChatRight({ messages, selectedUser, timePassed, selectedChat }) {
  const [addInput, setAddInput] = useState("");
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { showHideToast } = useContext(ToastContext);
  const [messages2, setMessages2] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // =========================== get messages ===========================
  // Function to fetch messages
  const fetchMessages = () => {
    setLoading(true);
    Axios.get(`${CHAT_ROOM}/${selectedUser}/messages`)
      .then((response) => {
        setMessages2(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    let interval;
    if (selectedUser) {
      fetchMessages();
      interval = setInterval(fetchMessages, 3000); // Poll every 5 seconds
    }
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [selectedUser]);

  // to scroll to the bottom of the chat
  // useEffect(() => {
  //   if (chatEndRef.current) {
  //     chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages2]);

  // ======================= send message =======================
  async function sendMessage(e) {
    e.preventDefault();

    const param = {
      message: addInput,
    };

    try {
      const response = await Axios.post(
        `${CHAT_ROOM}/${selectedUser}/messages`,
        param
      );
      setAddInput("");
      fetchMessages();
    } catch (error) {
      showHideToast(t("An error occurred. Please try again."), "error");
    }
  }

  const secondPerson = useMemo(
    () => messages.find((msm) => msm.id === selectedUser),
    [messages, selectedUser]
  );

  const TheOneYouTalkWithName = secondPerson?.user2_name;
  const TheOneYouTalkWithImage = secondPerson?.user2_profile_image;

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "livechatright"].join(" ")}
    >
      <div className="header-livechat">
        <div className="stack">
          <div className="img-container">
            <Avatar
              alt="Remy Sharp"
              src={TheOneYouTalkWithImage}
              sx={{ width: 48, height: 48 }}
            />
            <div className="active-dot dot"></div>
          </div>
          <div className="feet">
            <div className="name">{TheOneYouTalkWithName}</div>
            <div className="online">online</div>
          </div>
        </div>
      </div>

      <div className="body-chat">
        <div className="stack">
          <div className="message">
            <div className="first-sec">
              {messages2?.map((message, index) => (
              <ChatMessage
              key={index}
              message={message}
              timePassed={timePassed}
              selectedChat={selectedChat}
            />
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="sec-section">
              <input
                value={addInput}
                onChange={(e) => setAddInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
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
        </div>
      </div>
    </div>
  );
}

export default LiveChatRight;
