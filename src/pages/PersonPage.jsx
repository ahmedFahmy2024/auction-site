import { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { LocalContext } from '../contexts/LocalContext'
import ToastContext from '../contexts/ToastProvider';
import { useParams } from 'react-router-dom';
import { Axios } from '../api/Axios';
import { ONE_USER, USERS } from '../api/Api';
import Banner2 from '../components/Banner2';
import Myinfo from '../components/Myinfo';
import Mywork from '../components/Mywork';

import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function PersonPage() {
    const { locale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const { showHideToast } = useContext(ToastContext);
    const { id } = useParams();


    // =========================== to get specific user ===========================
    useEffect(() => {
        setLoading(true);
        Axios.get(`${ONE_USER}/${id}`,)
            .then(function (response) {
                console.log(response.data.user)
                setUser(response.data.user);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error)
                // showHideToast(error.response.data.message, 'error');
                setLoading(false);
            });
    }, []);
    // =========================== to get specific user ===========================
    // =========================== to get specific user portfolio ===========================
    useEffect(() => {
        setLoading(true);
        Axios.get(`${USERS}/${id}/portfolios`,)
            .then(function (response) {
                // console.log(response.data.portfolios)
                setPortfolio(response.data.portfolios);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error)
                // showHideToast(error.response.data.message, 'error');
                setLoading(false);
            });
    }, []);
    // =========================== to get specific user ===========================

    // =========================== loading ============================
    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
    // =========================== loading ============================

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "personpage"].join(" ")}>
            <Banner2 user={user}  />
            <div style={{ backgroundColor: '#F2F2F2' }}>
                <Container maxWidth="lg">
                    <Myinfo user={user} />
                    <Mywork portfolio={portfolio} />
                </Container>
            </div>
        </div>
    )
}
