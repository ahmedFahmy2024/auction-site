import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import ToastContext from '../contexts/ToastProvider';
import { useNavigate, useParams } from 'react-router-dom';
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

function PrevProjectsEdit() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { setRunUseEffect, user: {id} } = useUser();
    const { prevProjectsId } = useParams();

    //  ================ edit state ================
    const [updateInput, setUpdateInput] = useState({
        Id: '',
        Name: '',
        Description: '',
        Image: null,
        ImagePreview: null
    })

    function handleForm(e) {
        setUpdateInput({ ...updateInput, [e.target.name]: e.target.value })
    }
    //  ================ edit state ================

    //  ====== get specific Portfolios ========
    useEffect(() => {
        setLoading(true);
        Axios.get(`${PORTFOLIOS}/${prevProjectsId}`,)
            .then(function (response) {
                // console.log(response.data.portfolio);
                const data = response.data.portfolio;
                setUpdateInput({
                    ...updateInput,
                    Id: data.id,
                    Name: data.name,
                    Description: data.description,
                    ImagePreview: data.image_path
                })
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                showHideToast(error.response.data.message, 'error');
                setLoading(false);
            });
    }, []);
    //  ====== get specific Portfolios ========

    //  ================ edit function ================

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

    async function handleDialogSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let form = new FormData();
        form.append("_method", "PUT");
        form.append("name", updateInput.Name);
        form.append("description", updateInput.Description);
        form.append("status", "pending");
        if (updateInput.Image !== null) { // Check if an image is selected
            form.append('image', updateInput.Image);
        }
        try {
            const response = await Axios.post(`${PORTFOLIOS}/${updateInput.Id}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(response);
            showHideToast(t("Edited successfully"));
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

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "prevprojectNew"].join(" ")}>
            <h3 style={{ marginBottom: '16px' }}>{t("تعديل صفحة الاعمال ")}</h3>
            <TextField
                label={t("إسم المشروع")}
                name="Name"
                size="small"
                fullWidth
                value={updateInput.Name}
                onChange={handleForm}
                sx={{ mb: 2 }}
            />
            <TextField
                label={t("نبذة عن المشروع")}
                name="Description"
                size="small"
                fullWidth
                multiline
                rows={5}
                value={updateInput.Description}
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
                        {updateInput.ImagePreview && (
                            <div className='preview'>
                                <span className='prev-image'>
                                    <img src={updateInput.ImagePreview} alt="" />
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
                <ContainedBtn title={t("حفظ")} onClick={handleDialogSubmit} />
            </div>
        </div>
    )
}

export default PrevProjectsEdit