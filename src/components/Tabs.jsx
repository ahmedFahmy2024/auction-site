import '../css/tabs.css'
import React, { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ToastContext from '../contexts/ToastProvider';
import { Axios } from '../api/Axios';
import { ADD_REQUESTS } from '../api/Api';
import { getStatesForCountry } from '../helper/stateNames';
import TabsComponent from './TabsComponent';
import { useUser } from '../contexts/UserProvider';
import pdf from '../assets/pdf.svg';

import ContainedBtn from './buttons/ContainedBtn';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Tabs() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
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
        setAddInput({ ...addInput, Country: '', State: '', Image: null, ImagePreview: null, Title: '', Category: '', Description: '', Notification: '' });
    }

    //  ================ add state ================
    const [addInput, setAddInput] = useState({
        Title: '',
        Category: '',
        Description: '',
        Country: '',
        State: '',
        Notification:'',
        Image: null,
        ImagePreview: null
    });

    function handleForm(e) {
        setAddInput({ ...addInput, [e.target.name]: e.target.value })
    }

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setAddInput({ ...addInput, Country: selectedCountry, State: '' });
    };

    const states = getStatesForCountry(addInput.Country);
    //  ================ add state ================

    //  ================ add function ================

    function handleImageChange(event) {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const isImage = imageFile.type.startsWith('image/');
            setAddInput({
                ...addInput,
                Image: imageFile,
                ImagePreview: isImage ? URL.createObjectURL(imageFile) : pdf // Create object URL for preview
            });
        }
    }

    function removeImage() {
        setAddInput({
            ...addInput,
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
        form.append("type", requestType);
        form.append("name", addInput.Title);
        form.append("description", addInput.Description);
        form.append("category", addInput.Category);
        form.append("notification_type", addInput.Notification);
        form.append("country", addInput.Country);
        form.append("state", addInput.State);
        if (addInput.Image !== null) { // Check if an image is selected
            form.append('upload_file', addInput.Image);
        }
        console.log(addInput);
        try {
            const response = await Axios.post(`${ADD_REQUESTS}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            // showHideToast(t("Added successfully"));
            setAddInput({
                Title: '',
                Type: '',
                Description: '',
                Category: '',
                Country: '',
                State: '',
                Notification: '',
                Image: null,
                ImagePreview: null
            });
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

    // ============== btn classes ==============
    const btnIsDisabled = !addInput.Title || !addInput.Category || !addInput.Description || !addInput.Image || !addInput.Country || !addInput.State;

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "tabs-component"].join(" ")}>
            <div className="box">
                <div className="bloc-tabs">
                    <div onClick={() => toggleTab(1)} className={toggleState === 1 ? "tabs active-tabs" : "tabs"}>{t("طلب مورد")}</div>
                    <div onClick={() => toggleTab(2)} className={toggleState === 2 ? "tabs sec-tabs active-tabs" : "tabs"}>{t("طلب مقاول")}</div>
                    <div onClick={() => toggleTab(3)} className={toggleState === 3 ? "tabs active-tabs" : "tabs"}>{t("طلب رسم هندسي")}</div>
                </div>
                <div className="content-tabs">
                    <div className={toggleState === 1 ? "content  active-content" : "content"}>
                        <TabsComponent
                            addInput={addInput}
                            handleForm={handleForm}
                            handleImageChange={handleImageChange}
                            removeImage={removeImage}
                            handleCountryChange={handleCountryChange}
                            states={states}
                            setAddInput={setAddInput}
                        />
                    </div>

                    <div className={toggleState === 2 ? "content  active-content" : "content"}>
                        <TabsComponent
                            addInput={addInput}
                            handleForm={handleForm}
                            handleImageChange={handleImageChange}
                            removeImage={removeImage}
                            handleCountryChange={handleCountryChange}
                            states={states}
                            setAddInput={setAddInput}
                        />
                    </div>
                    <div className={toggleState === 3 ? "content  active-content" : "content"}>
                        <TabsComponent
                            addInput={addInput}
                            handleForm={handleForm}
                            handleImageChange={handleImageChange}
                            removeImage={removeImage}
                            handleCountryChange={handleCountryChange}
                            states={states}
                            setAddInput={setAddInput}
                        />
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <ContainedBtn title={t("اتمام الطلب")} onClick={handleDialogSubmit} btnIsDisabled={btnIsDisabled} />
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
                        <div className="title">{t("تم اضافة طلب السعر بنجاح")}</div>
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
