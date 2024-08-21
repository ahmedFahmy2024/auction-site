import { useContext } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import Amount from './Amount';

import Grid from '@mui/material/Unstable_Grid2';

const FakeSection = () => {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    return (
        <div style={{}} dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "secondsection", "blur"].join(" ")}>
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <div className='first-section'>
                        <h3 className='head-sec'>{t("تاريخ المزايدات")}</h3>
                        <div className='gray-sec'>
                            <div className='first'>
                                <div className='text'>{t("عدد المزايدات")}</div>
                                <div className='num'>0</div>
                            </div>
                            <div className='first'>
                                <div className='text'>{t("اعلي مزايدة")}</div>
                                <div className='num'>0 {t("ر.س")}</div>
                            </div>
                            <div className='first'>
                                <div className='text'>{t("اقل كمية")}</div>
                                <div className='num'>0</div>
                            </div>
                        </div>

                            <div className='gray-sec sec'>
                                <div className='first'>
                                    <img src={require('../assets/gavel-law-black-icon.png')} alt="" />
                                </div>
                                <div className='first'>
                                    <div className='text'>{t("السعر")}</div>
                                    <div className='num'>0 {t("ر.س")}</div>
                                </div>
                                <div className='first'>
                                    <div className='text'>{t("الكمية")}</div>
                                    <div className='num'>0</div>
                                </div>
                                <div className='first'>
                                    <div className='text'>{t("منذ")}</div>
                                    <div className='text2'>0 {t("يوم")}</div>
                                </div>
                            </div>

                    </div>
                </Grid>
                <Grid xs={8}>
                    <div className='first-section'>
                        <h3 className='head-sec'>{t("ابدأ في المزايدة")}</h3>
                        <div className='second-section-row'>
                            <div className="second">
                                <div className='title'>{t("الكمية")}</div>
                                <Amount amount={1} disabled />
                                <div className='unite'>{t("علبة - طن - كيلو")}</div>
                            </div>
                            <div className="second">
                                <div className='title'>{t("السعر للقطعة")}</div>
                                <input type="text" placeholder='0' value={0} />
                                <div className='unite'>{t("ر.س")}</div>
                            </div>
                            <div className="second">
                                <button style={{ minWidth: "fit-content", cursor: "pointer", borderRadius: "5px", border: "none", color: "white", backgroundColor: "#D87631", padding: "10px", fontSize: "16px", fontWeight: "500", width: "130px" }}>{t("بدء المزايدة")}</button>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default FakeSection