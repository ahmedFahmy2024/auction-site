import { useContext, useState } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/filter1.css'
import { useTranslation } from 'react-i18next';
import Search from './Search';
import ContractorFilter from './ContractorFilter';

import Checkbox from '@mui/material/Checkbox';



export default function Filter1({ requests, setSelectedTypes, selectedTypes, setSelectedCategories, selectedCategories, onSearch, onCountryChange, onStateChange }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();

  if (!requests) return null

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleCategoryCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const uniqueTypes = [...new Set(requests.map(request => request.type))];
  const uniqueCategories = [...new Set(requests.map(request => request.category))];

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={['filter1', locale === "en" ? "ltr" : "rtl"].join(" ")}>
      <Search onSearch={onSearch}/>

      <div className='filter1-title'>
        <h3 className='filter1-title-header'>{t("نوع الطلب")}</h3>
        {uniqueTypes.map((type, index) => (
          <div className='check-one' key={index}>
            <Checkbox
              checked={selectedTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
            />
            <p className='check-desc'>{type}</p>
          </div>
        ))}
      </div>

      <div className='filter1-title'>
        <h3 className='filter1-title-header'>{t("الدولة")}</h3>
        <ContractorFilter onCountryChange={onCountryChange} onStateChange={onStateChange} />
      </div>

      <div className='filter1-title'>
        <h3 className='filter1-title-header'>{t("اسم التصنيف")}</h3>
        {uniqueCategories.map((category, index) => (
          <div className='check-one' key={index}>
            <Checkbox
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryCheckboxChange(category)}
            />
            <p className='check-desc'>{category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
