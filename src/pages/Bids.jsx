import { useContext } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/bids.css'
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

function Bids() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { bids } = useUser();

  if (!bids) return null

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "bids"].join(" ")}>
      <div className="bids-container">

        {bids.map((bid, index) => {
          return (
            <div to={`/settings/${id}/pricerequest/${bid?.id}/view`} key={index} >
              <div className="first-row" >
                <div className='firstsec'>
                  <div className="stack">
                    <div className='icon'></div>
                    <h3 className='header-price-requset'>{bid?.scrap?.name}</h3>
                  </div>
                  <div className="category">
                    <div className='card-category'>{bid?.scrap?.category}</div>
                  </div>
                </div>

                <div className="secondsec">
                  <div className="date">
                    <Icon icon="healthicons:calendar-outline" width="20" height="20" color='#D87631' />
                    <div className="date-text">{formatCreatedAt(bid?.created_at)}</div>
                  </div>

                  <div className="country">
                    <Icon icon="game-icons:money-stack" width="20" height="20" color='#D87631' />
                    <div style={{ color: '#000', fontWeight: 'bold' }} className="country-text">${bid?.price}</div>
                  </div>

                  <div className="state">
                    <Icon icon="fluent-mdl2:quantity" width="20" height="20" color='#D87631' />
                    <div style={{ color: '#000', fontWeight: 'bold' }} className="state-text">{bid?.quantity}</div>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Bids