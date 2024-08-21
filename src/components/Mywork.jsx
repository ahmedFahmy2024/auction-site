import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/mywork.css'
import { useTranslation } from 'react-i18next';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export default function Mywork({ portfolio }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  if (!portfolio) return null

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "mywork"].join(" ")}>
      <div className='container'>
        <div className='first-feat'>
          <h3 className='name'>{t("اعمال سابقة")}</h3>
        </div>
        <div className='second-feat'>
          <h3 className='name'>{t("اعمال سابقة")}</h3>
          <Grid container spacing={2}>
            {portfolio.map((project, index) => (
              project.status === "published" && (
                <Grid xs={12} sm={6} md={6} lg={4} key={index}>
                  <Card>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={project?.image_path}
                      title={project?.name}
                    />
                    <CardContent>
                      <Typography style={{ fontFamily: 'Tajawal' }} gutterBottom variant="h5" component="div">
                        {project?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
