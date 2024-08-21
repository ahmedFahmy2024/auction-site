
import CityFilter from './CityFilter';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import pdf from '../assets/pdf.svg';

import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { categoryNames } from '../helper/categoryNames';

function TabsEditComponent({
    updateInput,
    handleForm,
    handleImageChange,
    removeImage,
    handleCountryChange,
    states,
}) {

    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    return (
        <div>
            <TextField
                label={t("اسم الطلب")}
                size="small"
                sx={{ mb: 2, mt: 1 }}
                fullWidth
                name='Title'
                value={updateInput.Title}
                onChange={handleForm}
            />
            <h3>{t("تخصصات المورد")}</h3>
            <div className="category">
                <FormControl className='category-name' fullWidth size="small" required sx={{ minWidth: 120, mb: 2, mt: 1 }} >
                    <InputLabel id="demo-select-small-label5">{t("Select Category")}</InputLabel>
                    <Select
                        className={[locale === 'en' ? 'ltr' : 'rtl', 'checkout-select'].join(' ')}
                        labelId="demo-select-small-label5"
                        id="demo-select-small5"
                        name='Category'
                        value={updateInput.Category}
                        label={t("Select Category")}
                        onChange={handleForm}
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
                        <MenuItem value="" disabled>{t('select category')}</MenuItem>
                        {categoryNames.map((cat) => (
                            <MenuItem key={cat.name_en} value={cat.value}>{locale === 'en' ? cat.name_en : cat.name_ar}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="tabs-filter-new" style={{ marginBottom: '24px' }}>
                <h3>{t("نطاق المشروع")}</h3>
                <CityFilter addInput={updateInput} handleForm={handleForm} handleCountryChange={handleCountryChange} states={states} />
            </div>
            <h3>{t("الوصف")}</h3>
            <TextField
                label={t("وصف")}
                multiline
                rows={5}
                fullWidth
                sx={{ mb: 2, mt: 1 }}
                name='Description'
                value={updateInput.Description}
                onChange={handleForm}
            />
            <h3>{t("ملف مواصفات")}</h3>
            <div className="file-input">
                <input
                    type="file"
                    name="file-input"
                    id="file-input"
                    className="file-input__input"
                    onChange={handleImageChange}
                />

                <label className="file-input__label" htmlFor="file-input" >
                    <Icon icon="material-symbols-light:upload" width="20" height="20" />
                    <span>{t("رفع ملف")}</span>
                </label>

                <div style={{ margin: '24px 0 24px 0' }}>
                    {updateInput.ImagePreview && (
                        <div className='preview' style={{ border: "none" }}>
                            <span className='prev-image'>
                                <a href={updateInput.ImagePreview} download target="_blank" rel="noopener noreferrer">
                                    <img src={pdf} alt="" style={{ position: "static" }} />
                                </a>
                                <button className='close' onClick={() => removeImage()}>
                                    <CloseIcon sx={{ fontSize: '14px', color: 'white' }} />
                                </button>
                            </span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default TabsEditComponent