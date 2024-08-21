import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../css/search.css'
import { useTranslation } from 'react-i18next';

export default function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { t, i18n } = useTranslation();

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className='search'>
            <input
                type="text"
                placeholder={t("نص البحث")}
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <SearchIcon />
        </div>
    )
}
