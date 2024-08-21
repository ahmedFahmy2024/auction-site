import { useState, useContext } from "react";
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import '../css/radiobtn.css'

export default function RadioBtns() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [ProductsView, setProductsView] = useState('');

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "radiobtn"].join(" ")}>
            <div style={{ display: 'flex', gap: '15px' }}>
                <div className="radio-buttons">
                    <label className="custom-radio">
                        <input value="1" checked={ProductsView === "1"} onChange={(e) => setProductsView(e.target.value)} type="radio" name="radioone" />
                        <span className="radio-btn"><Icon icon="solar:check-circle-outline" width="26" height="26" />
                            <div className="hobbies-icon">
                                <img alt='' src={require('../assets/scrap.png')} />
                                <h3 className="text">{t("خردوات")}</h3>
                            </div>
                        </span>
                    </label>
                </div>
                <div className="radio-buttons">
                    <label className="custom-radio">
                        <input value="2" checked={ProductsView === "2"} onChange={(e) => setProductsView(e.target.value)} type="radio" name="radiotwo" />
                        <span className="radio-btn"><Icon icon="solar:check-circle-outline" width="26" height="26" />
                            <div className="hobbies-icon">
                                <img alt='' src={require('../assets/scrap1.png')} />
                                <h3 className="text">{t("راكد")}</h3>
                            </div>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}
