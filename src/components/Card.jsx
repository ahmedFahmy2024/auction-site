import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/card.css'
import moment from 'moment';

import Grid from '@mui/material/Unstable_Grid2';
import { NavLink } from 'react-router-dom';

export default function Card({ project, categories }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    // Find the category name by matching the project_category_id with the categories array
    const category = categories.find(cat => cat.id === project?.project_category_id);
    // console.log("category", category);

    // Format the date using moment.js
    const formattedDate = moment(project?.created_at).locale(locale).fromNow();

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "card"].join(" ")}>
            <NavLink to={`/project/${project?.id}`}>
                <Grid container spacing={2} >
                    <Grid xs={12} md={6}>
                        <div className="card-img">
                            <img src={project?.image_path} alt="" />
                        </div>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <div className="card-text">
                            <h3>{project?.name}</h3>
                            <div className="stack">
                                <div className='card-location'>
                                    <div className='card-location-icon'></div>
                                    <p>{t(project?.country)}</p>
                                </div>
                                <div className='card-location'>
                                    <div className='card-location-icon'></div>
                                    <p>{t(project?.state)}</p>
                                </div>
                            </div>
                            <div className='card-date'>{formattedDate}</div>
                            <div className='card-category'>{category?.name}</div>
                            <p className='card-description'>{project?.description}</p>
                        </div>
                    </Grid>
                </Grid>
            </NavLink>
        </div>
    )
}
