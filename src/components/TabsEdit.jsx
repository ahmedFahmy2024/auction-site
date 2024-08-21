import '../css/tabs.css'
import React, { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ToastContext from '../contexts/ToastProvider';
import { Axios } from '../api/Axios';
import { REQUEST_ID } from '../api/Api';
import TabsEditComponent from './TabsEditComponent';
import { getStatesForCountry } from '../helper/stateNames';
import { useUser } from '../contexts/UserProvider';

import ContainedBtn from './buttons/ContainedBtn';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const typeToTabIndex = {
    'request supplier': 1,
    'request contractor': 2,
    'request engineering drawing': 3,
};

export default function TabsEdit() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { priceRequestId } = useParams(); 
    const { setRunUseEffect } = useUser();

    // ============= dialog ===============
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setRunUseEffect((prev) => prev + 1);
    };
    // ============= dialog ===============

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    }

    //  ================ edit state ================
    const [updateInput, setUpdateInput] = useState({
        Id:'',
        Title: '',
        Category: "",
        Description: '',
        Country: '',
        State: '',
        Image: null,
        ImagePreview: null
    });

    function handleForm(e) {
        setUpdateInput({ ...updateInput, [e.target.name]: e.target.value })
    }

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setUpdateInput({ ...updateInput, Country: selectedCountry, State: '' });
    };

    const states = getStatesForCountry(updateInput.Country);
    //  ================ add state ================
    //  ================ edit state ================

    //  ================ get specific request ================
    const fetchRequest = async () => {
        setLoading(true);
        try {
            const response = await Axios.get(`${REQUEST_ID}/${priceRequestId}`);
            // console.log(response.data.request_quote);
            const data = await response.data.request_quote;
            setUpdateInput({
                ...updateInput,
                Id: data.id,
                Title: data.name,
                Category: data.category,
                Country: data.country,
                State: data.state,
                Description: data.description,
                ImagePreview: data.upload_file
            });
            setToggleState(typeToTabIndex[data.type]);
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
    //  ================ get specific request ================

    //  ================ add function ================

    function handleImageChange(event) {
        const imageFile = event.target.files[0];
        setUpdateInput({
            ...updateInput,
            Image: imageFile,
            ImagePreview: URL.createObjectURL(imageFile) // Create object URL for preview
        });
    }

    function removeImage() {
        setUpdateInput({
            ...updateInput,
            Image: null,
            ImagePreview: null
        });
    }

    const handleNavigate = () => {
        navigate('/');
        setRunUseEffect((prev) => prev + 1);
    }

    async function handleDialogSubmit(e) {
        e.preventDefault();
        setLoading(true);

        // Set the Type based on the selected tab
        let requestType = '';
        switch (toggleState) {
            case 1:
                requestType = 'request supplier';
                break;
            case 2:
                requestType = 'request contractor';
                break;
            case 3:
                requestType = 'request engineering drawing';
                break;
            default:
                requestType = '';
        }

        let form = new FormData();
        form.append("_method", "PUT");
        form.append("type", requestType);
        form.append("name", updateInput.Title);
        form.append("description", updateInput.Description);
        form.append("category", updateInput.Category);
        form.append("country", updateInput.Country);
        form.append("state", updateInput.State);
        form.append("status", "pending");
        if (updateInput.Image !== null) { // Check if an image is selected
            form.append('upload_file', updateInput.Image);
        }
        try {
            const response = await Axios.post(`${REQUEST_ID}/${updateInput.Id}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(response);
            // showHideToast(t("Added successfully"));
            setLoading(false);
            handleClickOpen();
        } catch (error) {
            console.log(error);
            setLoading(false);
            showHideToast(t("An error occurred. Please try again."), "error");
        }
    }

    // ======================= loading ========================
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
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "tabs-component"].join(" ")}>
            <div className="box">
                <div className="bloc-tabs">
                <div onClick={() => toggleTab(1)} className={toggleState === 1 ? "tabs active-tabs" : "tabs disabled-tabs"}>{t("طلب مورد")}</div>
                    <div onClick={() => toggleTab(2)} className={toggleState === 2 ? "tabs active-tabs" : "tabs disabled-tabs"}>{t("طلب مقاول")}</div>
                    <div onClick={() => toggleTab(3)} className={toggleState === 3 ? "tabs active-tabs" : "tabs disabled-tabs"}>{t("طلب رسم هندسي")}</div>
                </div>
                <div className="content-tabs">
                    {[1, 2, 3].map((tabIndex) => (
                        <div key={tabIndex} className={toggleState === tabIndex ? "content active-content" : "content"}>
                            <TabsEditComponent
                                updateInput={updateInput}
                                handleForm={handleForm}
                                handleImageChange={handleImageChange}
                                removeImage={removeImage}
                                handleCountryChange={handleCountryChange}
                                states={states}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <ContainedBtn title={t("تعديل الطلب")} onClick={handleDialogSubmit} />
            </div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent className="dialog-container">
                    <div className="center">
                        <div className="check-container">
                            <img src={require("../assets/Check_mark.png")} alt="" />
                        </div>
                        <div className="title">{t("تم تعديل طلب السعر بنجاح")}</div>
                        <p>{t("سيتم التواصل معك من خلال المقاولين و الموردين في اقرب وقت")}</p>
                        <div className="center">
                            <ContainedBtn title={t("الرجوع للصفحة الرئيسية")} width="200px" onClick={handleNavigate} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
