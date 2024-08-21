import { Container } from '@mui/material';
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react'
import "../css/livechat.css"
import "../css/userMessage.css"
import LiveChatLeft from '../components/LiveChatLeft';
import LiveChatRight from '../components/LiveChatRight';

import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { useUser } from '../contexts/UserProvider';
import moment from 'moment';

function LiveChat() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const { messages } = useUser();
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);

    if (!messages) return null

    const timePassed = (timestamp) => {
        const now = moment();
        const past = moment(timestamp);
        const diffMinutes = now.diff(past, 'minutes');
        const diffHours = now.diff(past, 'hours');
        const diffDays = now.diff(past, 'days');
        const diffWeeks = now.diff(past, 'weeks');
    
        if (diffMinutes < 60) {
            return t("minutes_ago", { count: diffMinutes });
        } else if (diffHours < 24) {
            return t("hours_ago", { count: diffHours });
        } else if (diffDays < 7) {
            return t("days_ago", { count: diffDays });
        } else {
            return t("weeks_ago", { count: diffWeeks });
        }
    };

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "livechat"].join(" ")}>
                <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {t('Chat')}
                    </Typography>
                </Stack>
                <div className="paper">
                    <LiveChatLeft messages={messages} setSelectedUser={setSelectedUser} selectedUser={selectedUser} timePassed={timePassed} setSelectedChat={setSelectedChat} />
                    <LiveChatRight messages={messages} selectedUser={selectedUser} timePassed={timePassed} selectedChat={selectedChat} />
                </div>
        </div>
    )
}

export default LiveChat