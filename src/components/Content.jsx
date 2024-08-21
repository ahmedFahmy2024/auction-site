import '../css/content.css'
import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserProvider';
import Cookie from 'cookie-universal';

import Grid from '@mui/material/Unstable_Grid2';
import Slide from './Slide';

export default function Content() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const { user } = useUser();
    const cookies = Cookie()
    const token = cookies.get('website_token')

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "content"].join(" ")}>
            <Grid container>
                <Grid xs={12} md={6} sx={{ order: { xs: 1, md: 1 } }}>
                    <Slide
                        header={t('خدمات تصميمات هندسيه')}
                        parg={t('تقديم طلب تصميم هندسي لمشروع بالموصفات وتحديد التفاصيل  تحديد الدولة  ارسال اشعار للمكتب الهندسي سوء خارج او داخل المملكة مع امكانيه التواصل مع العميل / سواء كان فرد مقدم خدمه')}
                        title1={token ? null : t('سجل الأن')}
                        title2={t("تقديم طلبك الان")}
                        firstBtnNav="/register"
                        secBtnNav={`/settings/${user?.id}/priceRequest/add`}
                    />
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 2, md: 2 } }}>
                    <div className='content-img'>
                        <img src={require('../assets/home1.jpg')} alt="" />
                    </div>
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 4, md: 3 } }}>
                    <div className='content-img1'>
                        <img src={require('../assets/home2.png')} alt="" />
                    </div>
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 3, md: 4 } }}>
                    <Slide
                        header={t('خدمه تأهيليات الشركات')}
                        parg={t('خدمه تتيح لك عن طريق خدمه عملاء الموقع التواصل معك لتحديد ١٠ جهات حكومية او شبه حكومية  للتأهيل وتقديم الاوارق حسب اختيارك وهذه من ضمن الباقة الذهبية  الزيادة عن ١٠ شركات بيكون برسوم حسب عدد الجهات المطلوبة')}
                        title1={t('تواصل معنا')}
                        firstBtnNav={`/settings/${user?.id}/supplierRegistration`}
                        // title2={t('استفسر عن رخصة استثمار')}
                        // pLeft="24%"
                        // pRight="10%"
                    />
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 5, md: 5 } }}>
                    <Slide
                        header={t('خدمه سكراب')}
                        parg={t('امكانية عرض و بيع سكربات - مزادات   الخردة')}
                        title1={t('اضافة سكراب جديد')}
                        // title2={t('اضافة خردة للمزاد')}
                        firstBtnNav={`/settings/${user?.id}/registeredAuctions/addscrab`}
                        // secBtnNav={`/settings/${user?.id}/registeredAuctions`}
                        width="160px"
                    />
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 6, md: 6 } }}>
                    <div className='content-img'>
                        <img src={require('../assets/home3.png')} alt="" />
                    </div>
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 8, md: 7 } }}>
                    <div className='content-img'>
                        <img src={require('../assets/home4.png')} alt="" />
                    </div>
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 7, md: 8 } }}>
                    <Slide
                        header={t('خدمه طلب تسعير')}
                        parg={t('امكانيه طلب العميل تسعير من المقاول او المورد بأرسل طلب تحديد  نوع الاعمال  نوع الخدمات المصنعيات  مكان العمل')}
                        title1={t("تقديم طلبك الان")}
                        firstBtnNav={`/settings/${user?.id}/priceRequest/add`}
                    />
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 9, md: 9 } }}>
                    <Slide
                        header={t('خدمات التحول الرقمي')}
                        parg={t('خدمه التسويق وعمل مواقع الإلكترونية وعمل ايميلات')}
                        title1={t('تواصل معنا')}
                        firstBtnNav={`/settings/${user?.id}/digitalTransformation`}
                    />
                </Grid>
                <Grid xs={12} md={6} sx={{ order: { xs: 10, md: 10 } }}>
                    <div className='content-img'>
                        <img src={require('../assets/home5.png')} alt="" />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
