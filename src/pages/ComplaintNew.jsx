import React, { useContext, useEffect, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/addscrab.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import { Axios } from '../api/Axios';
import { COMPLAINS } from '../api/Api';
import ToastContext from '../contexts/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function ComplaintNew() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { setRunUseEffect } = useUser();

    // =============== add state ===============
    const [addInput, setAddInput] = useState({
        Name: "",
        Category: "",
    })

    function handleForm(e) {
        setAddInput({ ...addInput, [e.target.name]: e.target.value })
    }
    // =============== add state ===============


    //    =============== add functions ================
    async function handleDialogSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const param = {
            subject: addInput.Name,
            body: addInput.Description,
          };

        try {
            const response = await Axios.post(`${COMPLAINS}`, param)
            // console.log(response);
            showHideToast(t("Added successfully"));
            setAddInput({
                Name: "",
                Description: "",
            });
            setRunUseEffect((prev) => prev + 1);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            showHideToast(t("An error occurred. Please try again."), "error");
        }
    }
    //    =============== add functions ================

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

    // ============== btn classes ==============
    const btnIsDisabled = !addInput.Name || !addInput.Description;

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "addscrab"].join(" ")}>
            <Grid container spacing={2}>
                <Grid className='grid-text' xs={12} md={12}>
                    <div className='padding'>
                        <h2>{t("اضافة شكوى")}</h2>

                        <div className="product-type">
                            <TextField
                                label={t("عنوان الشكوى")}
                                name="Name"
                                size="small"
                                fullWidth
                                value={addInput.Name}
                                onChange={handleForm}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label={t("محتوى الشكوى")}
                                multiline
                                rows={3}
                                fullWidth
                                name="Description"
                                sx={{ mb: 2 }}
                                value={addInput.Description}
                                onChange={handleForm}
                            />
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <ContainedBtn title={t("اضافة")} onClick={handleDialogSubmit} btnIsDisabled={btnIsDisabled} />
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div >
    )
}

export default ComplaintNew