import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../api/Axios';
import { LOGOUT } from '../api/Api';
import { useAuth } from '../contexts/AuthProvider';
import ToastContext from '../contexts/ToastProvider';
import { useTranslation } from 'react-i18next';
import { LocalContext } from '../contexts/LocalContext';
import '../css/logout.css'

import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Logout({ users }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { showHideToast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    const menuRef = useRef();
    const imgRef = useRef();

 // useEffect to add and remove event listener
 useEffect(() => {
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            imgRef.current && !imgRef.current.contains(event.target)) {
            setOpen(false);
        }
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
        window.removeEventListener('click', handleClickOutside);
    };
}, []);

    async function handleLogout() {
        setLoading(true);
        try {
            const response = await Axios.post(LOGOUT, null);
            // console.log(response.data);
            logout();
            setLoading(false);
            navigate('/Login', { replace: true });
            showHideToast(t('تم تسجيل الخروج بنجاح'), 'success');
        } catch (error) {
            console.error('Logout Error:', error);
            setLoading(false);
            showHideToast(error.response?.data?.message || 'Failed to logout', 'error');
        }
    }

    if (!users) return null;

    // Loading state rendering
    if (loading) {
        return (
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    // Main JSX rendering
    return (
        <div dir={locale === 'en' ? 'ltr' : 'rtl'} className={[locale === 'en' ? 'ltr' : 'rtl', 'logout'].join(' ')}>
            <div className="img-container">
                <Avatar ref={imgRef} alt={users?.name} src={users?.profile_image} sx={{ cursor: 'pointer' }} onClick={() => setOpen(!open)} />
            </div>
            {open && (
                <Box ref={menuRef} className="menu-back">
                    <ul>
                        {/* <li className='li-items' onClick={() => {
                            navigate('/Users', { replace: true });
                            setOpen(false);
                        }}>{t('My account')}</li> */}
                        <li style={{color: 'rgb(255, 86, 48)'}} className='li-items' onClick={() => {
                            handleLogout();
                            setOpen(false);
                        }}>{t('Logout')}</li>
                    </ul>
                </Box>
            )}
        </div>
    );
}

export default Logout;
