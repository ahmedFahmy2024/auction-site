import { useContext, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import ToastContext from '../contexts/ToastProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/register.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import profileUpload from '../assets/profileUpload.png';
import { BASE_URL, REGISTER } from '../api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal'
import { getStatesForCountry } from '../helper/stateNames';
import pdf from '../assets/pdf.svg'

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

export default function Register() {
    const { locale, setLocale } = useContext(LocalContext);
    const { showHideToast } = useContext(ToastContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const cookies = Cookie()

    const [addInput, setAddInput] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Phone: '',
        AccoutType: '',
        CompanyName: '',
        CommercialRegister: '',
        TaxNumber: '',
        Country: '',
        State: '',
        Image: null,
        ImagePreview: null,
        File: null,
        FilePreview: null,
        Agree: false
    });

    // console.log(addInput);
    const handleform = (e) => {
        setAddInput({ ...addInput, [e.target.name]: e.target.value })
        // setAddInput({ ...addInput, [e.target.name]: e.target.value, State: '' });
    }

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setAddInput({ ...addInput, Country: selectedCountry, State: '' });
    };

    const states = getStatesForCountry(addInput.Country);

    //  ================ add function ================
    function handleImageChange(event) {
        const imageFile = event.target.files[0];
        setAddInput({
            ...addInput,
            Image: imageFile,
            ImagePreview: URL.createObjectURL(imageFile) // Create object URL for preview
        });
    }

    function handleFileChange(event) {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const isImage = imageFile.type.startsWith('image/');
            setAddInput({
                ...addInput,
                File: imageFile,
                FilePreview: isImage ? URL.createObjectURL(imageFile) : pdf // Create object URL for preview
            });
        }
    }
    function removeFile() {
        setAddInput({
            ...addInput,
            File: null,
            FilePreview: null
        });
    }

    // Validation function
    const validateForm = () => {
        if (!addInput.FirstName) {
            showHideToast(t("First name is required"), "error");
            return false;
        }
        if (!addInput.LastName) {
            showHideToast(t("Last name is required"), "error");
            return false;
        }
        if (!addInput.Email) {
            showHideToast(t("Email is required"), "error");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(addInput.Email)) {
            showHideToast(t("The email field must be a valid email address."), "error");
            return false;
        }
        if (!addInput.Password) {
            showHideToast(t("Password is required"), "error");
            return false;
        }
        if (addInput.Password !== addInput.ConfirmPassword) {
            showHideToast(t("Passwords do not match"), "error");
            return false;
        }
        if (!addInput.Phone) {
            showHideToast(t("Phone number is required"), "error");
            return false;
        }
        if (!addInput.AccoutType) {
            showHideToast(t("Account type is required"), "error");
            return false;
        }
        if (!addInput.CompanyName) {
            showHideToast(t("Company name is required"), "error");
            return false;
        }
        if (!addInput.CommercialRegister) {
            showHideToast(t("Commercial register is required"), "error");
            return false;
        }
        if (!addInput.TaxNumber) {
            showHideToast(t("Tax number is required"), "error");
            return false;
        }
        if (!addInput.Country) {
            showHideToast(t("Country is required"), "error");
            return false;
        }
        if (!addInput.State) {
            showHideToast(t("State is required"), "error");
            return false;
        }
        // if (!addInput.Image) {
        //     showHideToast(t("Profile image is required"), "error");
        //     return false;
        // }
        return true;
    };

    async function handleDialogSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        let form = new FormData();
        form.append('name', addInput.FirstName + " " + addInput.LastName);
        form.append('email', addInput.Email);
        form.append('password', addInput.Password);
        form.append('phone', addInput.Phone);
        form.append('account_type', addInput.AccoutType);
        form.append('company_name', addInput.CompanyName);
        form.append('commercial_register', addInput.CommercialRegister);
        form.append('tax_number', addInput.TaxNumber);
        form.append('country', addInput.Country);
        form.append('state', addInput.State);
        if (addInput.Image !== null) { // Check if an image is selected
            form.append('profile_image', addInput.Image);
        }
        if (addInput.File !== null) { // Check if an image is selected
            form.append('accommodation_type', addInput.File);
        }

        // console.log(addInput);
        try {
            const response = await axios.post(`${BASE_URL}${REGISTER}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(response);
            const accessToken = response?.data?.access_token;
            cookies.set('website_token', accessToken)
            showHideToast(t("Added successfully"));
            setAddInput({
                Name: "",
                Email: "",
                Password: "",
                Phone: "",
                AccoutType: "",
                CompanyName: "",
                CommercialRegister: "",
                TaxNumber: "",
                Country: "",
                State: "",
                Image: null,
                ImagePreview: null,
                File: null,
                FilePreview: null,
            });

            setLoading(false);
            // navigate("/package");
            window.location.pathname = '/package';
        } catch (error) {
            console.log(error);
            setLoading(false);
            showHideToast((error.response.data.message), "error");
        }
    }
    //  ================ add function ================

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
    const btnIsDisabled = !addInput.FirstName || !addInput.Email || !addInput.Password || !addInput.Phone || !addInput.AccoutType || !addInput.CompanyName || !addInput.CommercialRegister || !addInput.TaxNumber || !addInput.Country || !addInput.State || !addInput.Agree;

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "register"].join(" ")}>
            <Grid container spacing={2}>
                <Grid className='grid-text' xs={12} md={6}>
                    <div className='padding'>
                        <h2>{t("انشاء حساب")}</h2>

                        <div className="profile-pic">
                            <input onChange={handleImageChange} accept="image/*" type="file" id='file' />
                            <label htmlFor="file" id="uploadBtn">
                                <img src={addInput.ImagePreview ? addInput.ImagePreview : profileUpload} alt="" id='photo' />
                            </label>
                        </div>

                        <div className='two-inputs'>
                            <TextField
                                label={t("الاسم الاول")}
                                size="small"
                                name='FirstName'
                                type='text'
                                fullWidth
                                value={addInput.FirstName}
                                onChange={handleform}
                            />
                            <TextField
                                label={t("الاسم الاخير")}
                                size="small"
                                name='LastName'
                                type='text'
                                fullWidth
                                value={addInput.LastName}
                                onChange={handleform}
                            />
                        </div>
                        <TextField
                            label={t("البريد الالكتروني")}
                            size="small"
                            name='Email'
                            type='email'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={addInput.Email}
                            onChange={handleform}
                        />
                        <TextField
                            label={t("كلمة المرور")}
                            size="small"
                            name='Password'
                            type='password'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={addInput.Password}
                            onChange={handleform}
                        />
                        <TextField
                            label={t("تأكيد كلمة المرور")}
                            size="small"
                            name='ConfirmPassword'
                            type='password'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={addInput.ConfirmPassword}
                            onChange={handleform}
                        />
                        <TextField
                            label={t("رقم الهاتف")}
                            size="small"
                            name='Phone'
                            type='tel'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={addInput.Phone}
                            onChange={handleform}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }} size="small">
                            <InputLabel id="demo-select-small-label">{t("نوع الحساب")}</InputLabel>
                            <Select
                                className={[locale === 'en' ? 'ltr' : 'rtl', 'accounttypereg'].join(' ')}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={addInput.AccoutType}
                                onChange={handleform}
                                name='AccoutType'
                                label={t("نوع الحساب")}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            '& .MuiMenuItem-root': {
                                                justifyContent: locale === 'en' ? 'flex-start' : 'flex-end',
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="supplier">{t("supplier")}</MenuItem>
                                <MenuItem value="individual_contractor">{t("individual contractor")}</MenuItem>
                                <MenuItem value="corporate_contractor">{t("corporate contractor")}</MenuItem>
                                <MenuItem value="engineering_office">{t("engineering office")}</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label={t("اسم الشركة")}
                            size="small"
                            name='CompanyName'
                            type='text'
                            fullWidth
                            sx={{ mb: 2 }}
                            value={addInput.CompanyName}
                            onChange={handleform}
                        />
                        <div className='two-inputs'>
                            <TextField
                                label={t("السجل التجاري")}
                                size="small"
                                name='CommercialRegister'
                                type='text'
                                fullWidth
                                value={addInput.CommercialRegister}
                                onChange={handleform}
                            />
                            <TextField
                                label={t("الرقم الضريبي")}
                                size="small"
                                name='TaxNumber'
                                type='number'
                                fullWidth
                                value={addInput.TaxNumber}
                                onChange={handleform}
                            />
                        </div>
                        <div className='two-inputs'>
                            <FormControl fullWidth size="small" required sx={{ minWidth: 120 }} >
                                <InputLabel id="demo-select-small-label1">{t("Select Country")}</InputLabel>
                                <Select
                                    className={[locale === 'en' ? 'ltr' : 'rtl', 'checkout-select'].join(' ')}
                                    labelId="demo-select-small-label1"
                                    id="demo-select-small1"
                                    name='Country'
                                    value={addInput.Country}
                                    label={t("Select Country")}
                                    onChange={handleCountryChange}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                '& .MuiMenuItem-root': {
                                                    justifyContent: locale === 'en' ? 'flex-start' : 'flex-end',
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>{t('select country')}</MenuItem>
                                    <MenuItem value="Egypt">{t("Egypt")}</MenuItem>
                                    <MenuItem value="Saudi Arabia">{t("Saudi Arabia")}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth size="small" required sx={{ minWidth: 120 }} >
                                <InputLabel id="demo-select-small-label2">{t("Select State")}</InputLabel>
                                <Select
                                    className={[locale === 'en' ? 'ltr' : 'rtl', 'checkout-select'].join(' ')}
                                    labelId="demo-select-small-label2"
                                    id="demo-select-small2"
                                    name='State'
                                    value={addInput.State}
                                    label={t("Select State")}
                                    onChange={handleform}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                '& .MuiMenuItem-root': {
                                                    justifyContent: locale === 'en' ? 'flex-start' : 'flex-end',
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>{t('select state')}</MenuItem>
                                    {states.map((state) => (
                                        <MenuItem key={state.name} value={state.name}>{locale === 'en' ? state.labelEn : state.labelAr}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <h6 style={{ fontSize: '14px', margin: '0', color: 'rgb(0 0 0 / 60%)' }}>{t("نوع الإقامة")}</h6>
                            <div style={{ width: '100%', position: 'relative' }}>
                                <div className='images' onClick={() => document.querySelector('.input-field').click()}>
                                    <input onChange={handleFileChange} className='input-field' style={{ display: 'none' }} accept="image/*" type="file" />
                                    <div className='image'>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
                                            <h6 style={{ fontSize: '1.125rem', margin: '0', fontWeight: 700 }}>{t("Drop or Select file")}</h6>
                                            <p className='para'>
                                                {t("Drop file here or click")}
                                                <span className='browse'>{t("browse")}</span>
                                                {t("thorough your machine")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ margin: '10px 0 10px 0' }}>
                                    {addInput.FilePreview && (
                                        <div className='preview'>
                                            <span className='prev-image'>
                                                <img src={addInput.FilePreview} alt="" />
                                                <button className='close' onClick={() => removeFile()}>
                                                    <CloseIcon sx={{ fontSize: '14px', color: 'white' }} />
                                                </button>
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <p className='details-info-imp'>{t("The upload file field must be a file of type: jpeg, png, jpg, gif, pdf, doc, docx.")}</p>

                            </div>
                        </div>

                        <p className='privacy-info'>
                            <input type="checkbox" checked={addInput.Agree} onChange={(event) => setAddInput({ ...addInput, Agree: event.target.checked })}/>
                            {t("I agree to the terms of agreement.")}
                        </p>

                        <div className='stack'>
                            <ContainedBtn onClick={handleDialogSubmit} title={t("اختيار الباقة")} btnIsDisabled={btnIsDisabled} />
                            <ContainedBtn title={t("عودة")} disabled={true} onClick={() => navigate("/")} />
                        </div>
                        <div className='stack2'>
                            <div>{t("هل تمتلك حساب؟")}</div>
                            <NavLink to="/login">
                                <span>{t("قم بتسجيل الدخول")}</span>
                            </NavLink>
                        </div>

                    </div>
                </Grid>
                <Grid className='grid-image' md={6}>
                    <div className='image-container'>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
