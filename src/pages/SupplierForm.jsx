import { useContext, useEffect, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/supplierform.css'
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import ToastContext from '../contexts/ToastProvider';
import { Axios } from '../api/Axios';
import { REQUEST_ID } from '../api/Api';
import pdf from '../assets/pdf.svg'

import Container from '@mui/material/Container';
import EastIcon from '@mui/icons-material/East';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const formatCreatedAt = (createdAt, locale) => {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' };
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', options);
};

// Check if the file is an image or file
const isImageFile = (fileName) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const extension = fileName.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
};

export default function SupplierForm() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const { id } = useParams();
    const { priceRequestId } = useParams();  // Update to use the correct parameter name
    const [request, setRequest] = useState({});

    const fetchRequest = async () => {
        setLoading(true);
        try {
            const response = await Axios.get(`${REQUEST_ID}/${priceRequestId}`);
            // console.log(response.data.request_quote);
            setRequest(response.data.request_quote);
            setLoading(false);

        } catch (error) {
            console.log(error);
            showHideToast(error.response.data.message, 'error');
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

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

    const renderFilePreview = (fileUrl) => {
        if (isImageFile(fileUrl)) {
            return <img src={fileUrl} alt="file preview" />;
        }
        return <img src={pdf} alt="pdf icon" />;
    };

// console.log(request)
    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "supplierform"].join(" ")}>
                <h2 className='head-title'>{t("طلب سعر مفتوح")}</h2>
                <div className="section-one">
                    <div className="between">
                        <div className="stack">
                            <div className="outline-btn" onClick={() => navigate(-1)}>
                                {locale === "en" ? <Icon icon="dashicons:arrow-left-alt2" /> : <Icon icon="dashicons:arrow-right-alt2" /> }
                                <div>{t("عودة")}</div>
                            </div>
                            <div className="contain-btn" onClick={() => navigate(`/settings/${id}/priceRequest/${priceRequestId}/edit`)}>
                                <BorderColorIcon />
                                <div>{t("تعديل")}</div>
                            </div>
                        </div>
                        <div className="category">
                            <div className='card-category'>{request?.category}</div>
                        </div>
                    </div>

                    <div className="text-sec">
                        <div className="stack-row">
                            <div className='header-title-text-word'>{t("نوع الطلب")}:</div>
                            <h4 style={{ color: '#606060' }} className="title">{t(request?.type)}</h4>
                        </div>
                        <div className="stack-row">
                            <div className='header-title-text-word'>{t("إسم الطلب")}:</div>
                            <h3 style={{ color: '#606060' }} className="name">{request?.name}</h3>
                        </div>
                        <div className="stack-row">
                            <div className='header-title-text-word'>{t("تاريخ الطلب")}:</div>
                            <p style={{ color: '#606060' }} className="date">{formatCreatedAt(request?.created_at, locale)}</p>
                        </div>
                    </div>

                    <div className="location">
                        <div className="country">
                            <Icon icon="material-symbols-light:location-on-outline-rounded" width="24" height="24" color='#D87631' />
                            <div className="country-text">{t(request?.country)}</div>
                        </div>
                        <div className="state">
                            <Icon icon="material-symbols-light:location-on-outline-rounded" width="24" height="24" color='#D87631' />
                            <div className="state-text">{t(request?.state)}</div>
                        </div>
                    </div>
                    <div className="stack-row-two">
                        <div className='header-title-text-word'>{t("وصف الطلب")}</div>
                        <p className="content">{request?.description}</p>
                    </div>

                    <div className="file">{t("ملف مواصفات")}</div>
                    <div className="file-input">
                        <input
                            type="file"
                            name="file-input"
                            id="file-input"
                            className="file-input__input"
                        />

                        <div>
                            {request.upload_file && (
                                <div className='preview'>
                                    <span className='prev-image'>
                                        <a href={request.upload_file} download target="_blank" rel="noopener noreferrer">
                                            {renderFilePreview(request.upload_file)}
                                        </a>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
        </div>
    )
}
