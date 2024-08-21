import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react'
import { Icon } from '@iconify/react';


import Avatar from '@mui/material/Avatar';

function LiveChatLeft({ messages, setSelectedUser, selectedUser, timePassed, setSelectedChat }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [searchInput, setSearchInput] = useState("");

    const handleChatClick = (id, id2) => {
        setSelectedUser(id);
        setSelectedChat(id2);
    };

    // Filter messages based on search input
    const filteredMessages = messages.filter((message) => {
        return message.user1_id !== message.user2_id &&
               message.user2_name.toLowerCase().includes(searchInput.toLowerCase());
    });

    // console.log(filteredMessages)

    const UserProfileImage = messages[0]?.user1_profile_image;

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "livechatleft"].join(" ")}>
            <div className="header-livechat">
                <div className="img-container">
                    <Avatar alt="Remy Sharp" src={UserProfileImage} sx={{ width: 48, height: 48 }} />
                    <div className="active-dot dot"></div>
                </div>
            </div>
            <div className="search-container">
                <div className="serach">
                    <div className="final-search">
                        <Icon icon="system-uicons:search" width="24" height="24" color='#637381' />
                        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder={t("Search Contacts...")} />
                    </div>
                </div>
            </div>
            <div className="list-container">

                {filteredMessages.map((message, index) => {
                    const createdAt = message?.latest_user2_message?.created_at;
                    const timeDisplay = createdAt ? timePassed(createdAt) : "";
                    return (
                        <div key={index} className={`user ${selectedUser === message?.id ? "active" : ""}`} onClick={() => handleChatClick(message?.id, message?.user1_id)}>
                            <div className="img-container">
                                <Avatar alt="Remy Sharp" src={message?.user2_profile_image} sx={{ width: 48, height: 48 }} />
                                <div className="active-dot dot"></div>
                            </div>
        
                            <div className="user-details">
                                <div className="name">{message?.user2_name}</div>
                                <div className="last-meesage">{message?.latest_user2_message ? message?.latest_user2_message?.message : ""}</div>
                            </div>
        
                            <div className="date">
                                <span className='time'>{timeDisplay}</span>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default LiveChatLeft