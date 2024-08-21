import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import '../css/pagination.css';

export default function Paginations({ currentPage, setCurrentPage, totalProjects, projectsPerPage }) {
  const { t, i18n } = useTranslation();
  const { locale, setLocale } = useContext(LocalContext);
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "mypagination"].join(" ")}>
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={handleChange} 
        shape="rounded" 
        color="primary"
        showFirstButton
        showLastButton 
        siblingCount={1}
        boundaryCount={2}
      />
    </div>
  );
}
