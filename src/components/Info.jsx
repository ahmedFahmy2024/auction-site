import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/info.css'
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Unstable_Grid2';

export default function Info() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "info"].join(" ")}>
      <Grid container sx={{alignItems: 'center'}}>
        <Grid xs={12} md={6}>
          <div className='info-text'>
            <h3>{t("عن بي تو بي العربية")}</h3>
            <h2>{t("من نحن")}</h2>
            <p>{t("نحن في بي تو بي العربية نفخر بأن نكون روادًا في تعزيز التعاون والشراكات التجارية في العالم العربي. نقدم حلولًا مبتكرة وموثوقة تهدف إلى دعم الشركات والمؤسسات في تحقيق نجاحاتها وتحقيق أهدافها الاستراتيجية. يقوم فريقنا المتميز بتقديم خدمات تكنولوجيا المعلومات والاستشارات التي تتجاوز التوقعات، مما يساعد عملائنا على النمو والتميز في بيئة الأعمال التنافسية الحالية.")}</p>
            {/* <p className='last-para'>{t("خسائر اللازمة ومطالبة حدة بل. الآخر الحلفاء أن غزو, إجلاء وتنامت عدد مع. لقهر معركة لبلجيكا، بـ انه, ربع الأثنان المقيتة في, اقتصّت المحور حدة و. هذه ما طرفاً عالمية استسلام, الصين وتنامت حين ٣٠, ونتج والحزب")}</p> */}
          </div>
        </Grid>
        <Grid xs={12} md={6}>
        <div className='info-img'>
          <img src={require('../assets/info1.jpg')} alt="" />
        </div>
        </Grid>
      </Grid>
    </div>
  )
}
