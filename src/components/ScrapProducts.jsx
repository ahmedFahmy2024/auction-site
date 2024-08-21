import { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import '../css/scrapproducts.css'

import Grid from '@mui/material/Unstable_Grid2';
import { NavLink } from 'react-router-dom';

// Function to check if the scrap duration has passed
const isScrapDurationPassed = (scrapDuration) => {
  const currentDate = new Date();
  const durationDate = new Date(scrapDuration);
  return currentDate > durationDate;
};

// Custom component to conditionally render NavLink or div
const ConditionalNavLink = ({ to, children, condition }) => {
  if (condition) {
    return <div className="nav-link">{children}</div>;
  }
  return <NavLink to={to} className="nav-link">{children}</NavLink>;
};

export default function ScrapProducts({ scraps, filteredScraps, currentPage, projectsPerPage }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  if (!scraps) return null

    // Calculate the start and end index for the projects to be displayed on the current page
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredScraps.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "scrapproducts"].join(" ")}>
      <Grid container spacing={2}>
        {currentProjects.map((scrap, index) => {
          // console.log("scrap2", scrap)
          const image = scrap?.images?.split(",");
          const durationPassed = isScrapDurationPassed(scrap?.scrap_duration);
          return (
            <Grid className={durationPassed ? "finished" : ""} xs={6} md={4} key={index}>
              <ConditionalNavLink to={`/browesScrap/${scrap?.id}`} condition={durationPassed}>
                <div className='box'>
                  <div className='img-container'>
                    <img src={image[0]} alt="" />
                  </div>
                  <div className='text'>
                    <div className='stack-row'>
                      <h4>{scrap?.name}</h4>
                      <div className='category'>{scrap?.category}</div>
                    </div>
                    <div className='stack mb'>
                      <div className='stack icons border-left'>
                        <img src={require('../assets/boxes.png')} alt="" />
                        <div>{scrap?.quantity}</div>
                      </div>
                      <div className='stack icons'>
                        <img src={require('../assets/weight.png')} alt="" />
                        <div>{scrap?.unit}</div>
                      </div>
                    </div>
                  </div>
                  {durationPassed && <div className="auction-ended-overlay">{t("انتهى المزاد")}</div>}
                </div>
              </ConditionalNavLink>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
