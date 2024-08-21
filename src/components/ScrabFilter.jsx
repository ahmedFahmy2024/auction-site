import { useContext, useState, useEffect } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import '../css/filter.css'
import { useTranslation } from 'react-i18next';
import Search from './Search';

import Checkbox from '@mui/material/Checkbox';

function ScrabFilter({ onCategoryChange, onSearch, scraps }) {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Extract unique categories from scraps
        const uniqueCategories = [...new Set(scraps.map(scrap => scrap.category))];
        setCategories(uniqueCategories);
    }, [scraps]);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            onCategoryChange(category);
        } else {
            onCategoryChange(null); // Pass null to show all scraps
        }
    };

    const handleSearch = (value) => {
        onSearch(value);
    };

    return (
        <div dir={locale === 'en' ? 'ltr' : 'rtl'} className={[locale === 'en' ? 'ltr' : 'rtl', 'filter'].join(' ')}>
            <Search onSearch={handleSearch} />
            <div className="filter-title">
                <h3 className="filter-title-header">{t("اسم التصنيف")}</h3>
                {categories.map((category, index) => (
                    <div className="check-one" key={index}>
                        <Checkbox onChange={handleCategoryChange} value={category} />
                        <p className="check-desc">{category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScrabFilter