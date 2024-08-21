import { useContext, useState } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/filter.css'
import { useTranslation } from 'react-i18next';
import Search from './Search';

import Checkbox from '@mui/material/Checkbox';

export default function Filter({ onCategoryChange, onCountryChange, onSearch, categories, projects }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  const handleCategoryCheckboxChange = (event, categoryId) => {
    onCategoryChange(categoryId, event.target.checked);
  };

  const handleCountryCheckboxChange = (event, country) => {
    onCountryChange(country, event.target.checked);
  };

  const uniqueCountries = [...new Set(projects.map(project => project.country))];  // to remove the dublicate country 

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "filter"].join(" ")}>
      <Search onSearch={onSearch} />
      <div className='filter-title'>
        <h3 className='filter-title-header'>{t("اسم التصنيف")}</h3>
        {categories.map((category, index) => {
          return (
            <div className='check-one' key={index}>
              <Checkbox onChange={(event) => handleCategoryCheckboxChange(event, category.id)} />
              <p className='check-desc'>{category?.name}</p>
            </div>
          )
        })}

      </div>
      <div className='filter-title'>
        <h3 className='filter-title-header'>{t("المكان")}</h3>
        <div >
          {uniqueCountries.map((country, index) => {
            return (
              <div className='check-one' key={index}>
                <Checkbox  onChange={(event) => handleCountryCheckboxChange(event, country)}/>
                <p className='check-desc'>{country}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
