import { useContext } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from 'react-i18next';
import '../css/cityfilter.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CityFilter({ addInput, handleCountryChange, states, handleForm }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "cityfilter"].join(" ")}>
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
                        <MenuItem value="" disabled>{t('select state')}</MenuItem>
                        {states.map((state) => (
                            <MenuItem key={state.name} value={state.name}>{locale === 'en' ? state.labelEn : state.labelAr}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default CityFilter