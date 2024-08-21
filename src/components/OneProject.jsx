import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NavLink } from 'react-router-dom';

const formatCreatedAt = (createdAt, locale) => {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", options);
};

function OneProject({ project, categories }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();

    const category = categories.find((cat) => cat.id === project?.project_category_id);

    return (
        <NavLink to={`/project/${project?.id}`} dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "oneproject"].join(" ")}>
            <Card >
                <CardMedia
                    sx={{ height: 140 }}
                    image={project?.image_path}
                    title={project?.name}
                />
                <CardContent>
                    <div className="card-text">
                        <h3>{project?.name}</h3>
                        <div className="stack">
                            <div className='card-location'>
                                <div className='card-location-icon'></div>
                                <p>{project?.country}</p>
                            </div>
                            <div className='card-location'>
                                <div className='card-location-icon'></div>
                                <p>{project?.state}</p>
                            </div>
                        </div>
                        <div className='card-date'>{formatCreatedAt(project?.created_at, locale)}</div>
                        <div className='card-category'>{category?.name}</div>
                        <p className='card-description'>{project?.description}</p>
                    </div>
                </CardContent>
            </Card>
        </NavLink>
    )
}

export default OneProject