import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import ToastContext from '../contexts/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../api/Axios';
import { PORTFOLIOS } from '../api/Api';
import "../css/prevprojectcrud.css"
import ContainedBtn from '../components/buttons/ContainedBtn';
import { useUser } from '../contexts/UserProvider';

import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function PrevProjectsNew() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { setRunUseEffect, user: {id} } = useUser();

    //  ================ add state ================
    const [addInput, setAddInput] = useState({
        Name: '',
        Description: '',
        Image: null,
        ImagePreview: null
    })

    function handleForm(e) {
        setAddInput({ ...addInput, [e.target.name]: e.target.value })
    }
    //  ================ add state ================

    //  ================ add function ================

    function handleImageChange(event) {
        const imageFile = event.target.files[0];
        setAddInput({
            ...addInput,
            Image: imageFile,
            ImagePreview: URL.createObjectURL(imageFile) // Create object URL for preview
        });
    }

    function removeImage() {
        setAddInput({
            ...addInput,
            Image: null,
            ImagePreview: null
        });
    }

    async function handleDialogSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let form = new FormData();
        form.append("name", addInput.Name);
        form.append("description", addInput.Description);
        if (addInput.Image !== null) { // Check if an image is selected
            form.append('image', addInput.Image);
        }
        try {
            const response = await Axios.post(`${PORTFOLIOS}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(response);
            showHideToast(t("Added successfully"));
            setAddInput({
                Name: '',
                Description: '',
                Image: null,
                ImagePreview: null
            });
            setLoading(false);
            setRunUseEffect((prev) => prev + 1);
            navigate(`/settings/${id}/prevProjects`);
        } catch (error) {
            console.log(error);
            setLoading(false);
            showHideToast(t("An error occurred. Please try again."), "error");
        }
    }

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
    const btnIsDisabled = !addInput.Name || !addInput.Description || !addInput.Image;

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "prevprojectNew"].join(" ")}>
            <h3 style={{ marginBottom: '16px' }}>{t("إنشاء صفحة أعمال جديدة")}</h3>
            <TextField
                label={t("إسم المشروع")}
                name="Name"
                size="small"
                fullWidth
                value={addInput.Name}
                onChange={handleForm}
                sx={{ mb: 2 }}
            />
            <TextField
                label={t("نبذة عن المشروع")}
                name="Description"
                size="small"
                fullWidth
                multiline
                rows={4}
                value={addInput.Description}
                onChange={handleForm}
                sx={{ mb: 2 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h6 style={{ fontSize: '14px', margin: '0' }}>{t("الصور")}</h6>
                <div style={{ width: '100%', position: 'relative' }}>
                    <div className='images' onClick={() => document.querySelector('.input-field').click()}>
                        <input onChange={handleImageChange} className='input-field' style={{ display: 'none' }} accept="image/*" type="file" />
                        <div className='image'>
                            <CloudUploadIcon sx={{ fontSize: '150px', color: '#212b36' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
                                <h6 style={{ fontSize: '1.125rem', margin: '0', fontWeight: 700 }}>{t("Drop or Select file")}</h6>
                                <p className='para'>
                                    {t("Drop files here or click")}
                                    <span className='browse'>{t("browse")}</span>
                                    {t("thorough your machine")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ margin: '24px 0 24px 0' }}>
                        {addInput.ImagePreview && (
                            <div className='preview'>
                                <span className='prev-image'>
                                    <img src={addInput.ImagePreview} alt="" />
                                    <button className='close' onClick={() => removeImage()}>
                                        <CloseIcon sx={{ fontSize: '14px', color: 'white' }} />
                                    </button>
                                </span>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <ContainedBtn title={t("اضافة")} onClick={handleDialogSubmit} btnIsDisabled={btnIsDisabled} />
            </div>
        </div>
    )
}

export default PrevProjectsNew