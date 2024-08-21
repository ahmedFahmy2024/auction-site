import { useContext, useState, useEffect } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import { useTranslation } from 'react-i18next';
import ToastContext from '../contexts/ToastProvider';
import '../css/secondsection.css'
import Amount from './Amount';
import ContainedBtn from './buttons/ContainedBtn';
import { Axios } from '../api/Axios';
import { BIDS } from '../api/Api';

import Grid from '@mui/material/Unstable_Grid2';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useUser } from '../contexts/UserProvider';
import ThirdSection from './ThirdSection';

// Function to calculate days since a given date
const daysSince = (createdAt) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const differenceInTime = currentDate - createdDate;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

// Function to check if the scrap duration has passed
const isScrapDurationPassed = (scrapDuration) => {
  const currentDate = new Date();
  const durationDate = new Date(scrapDuration);
  return currentDate > durationDate;
};

export default function SecondSection({ scraps, setRunUseEffect1 }) {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { showHideToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(scraps.min_quantity);
  const [price, setPrice] = useState(0);
  const { user: { id }, setRunUseEffect } = useUser();

  // Update amount to min_quantity when scraps changes
  useEffect(() => {
    if (scraps) {
      setAmount(scraps.min_quantity);
    }
  }, [scraps]);

  // increase and decrease amount
  const setDecrease = () => {
    amount > scraps.min_quantity ? setAmount(amount - 1) : setAmount(scraps.min_quantity);
  };
  const setIncrease = () => {
    amount < scraps.quantity ? setAmount(amount + 1) : setAmount(scraps.quantity);
  };

  if (!scraps) {
    return null;
  }

  //  ================ add function ================
  async function handleDialogSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const param = {
      user_id: id,
      scrap_id: scraps.id,
      quantity: amount,
      price: price,
    }

    try {
      const response = await Axios.post(`${BIDS}`, param);
      // console.log(response);
      showHideToast(t("Added successfully"));
      setAmount(1);
      setPrice(0);
      setRunUseEffect((prev) => prev + 1);
      setRunUseEffect1(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      showHideToast(t("An error occurred. Please try again."), "error");
    }
  }
  //  ================ add function ================

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  const btnIsDisabled = scraps?.user_id === id || isScrapDurationPassed(scraps.scrap_duration);

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "secondsection"].join(" ")}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <div className="first-section">
            <h3 className="head-sec">{t("تاريخ المزايدات")}</h3>
            <div className="gray-sec">
              <div className="first">
                <div className="text">{t("عدد المزايدات")}</div>
                <div className="num">{scraps?.bid_count}</div>
              </div>
              <div className="first">
                <div className="text">{t("اعلي مزايدة")}</div>
                <div className="num">
                  {scraps?.max_bid_price} {t("ر.س")}
                </div>
              </div>
              <div className="first">
                <div className="text">{t("اقل كمية")}</div>
                <div className="num">{scraps?.min_quantity}</div>
              </div>
            </div>

            {scraps?.bids &&
              scraps?.bids.map((bid) => (
                <div className="gray-sec sec" key={bid.id}>
                  <div className="first">
                    <img
                      src={require("../assets/gavel-law-black-icon.png")}
                      alt=""
                    />
                  </div>
                  <div className="first">
                    <div className="text">{t("السعر")}</div>
                    <div className="num">
                      {bid?.price} {t("ر.س")}
                    </div>
                  </div>
                  <div className="first">
                    <div className="text">{t("الكمية")}</div>
                    <div className="num">
                      {bid?.quantity + " " + scraps.unit}
                    </div>
                  </div>
                  <div className="first">
                    <div className="text">{t("منذ")}</div>
                    <div className="text2">
                      {daysSince(bid?.created_at)} {t("يوم")}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          {
            btnIsDisabled && isScrapDurationPassed(scraps.scrap_duration) ? (
              <ThirdSection scraps={scraps?.user_with_max_bid} />
            ) : (
              <div className="first-section">
                <h3 className="head-sec">{t("ابدأ في المزايدة")}</h3>
                <div className="second-section-row">
                  <div className="second">
                    <div className="title">{t("الكمية")}</div>
                    <Amount
                      amount={amount}
                      setAmount={setAmount}
                      setDecrease={setDecrease}
                      setIncrease={setIncrease}
                    />
                    <div className="unite">{t("علبة - طن - كيلو")}</div>
                  </div>
                  <div className="second">
                    <div className="title">{t("السعر للقطعة")}</div>
                    <input
                      type="text"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="unite">{t("ر.س")}</div>
                  </div>
                  <div className="second">
                    <ContainedBtn
                      title={btnIsDisabled && isScrapDurationPassed(scraps.scrap_duration) ? t("انتهى المزاد") : t("زايد الآن")}
                      onClick={handleDialogSubmit}
                      btnIsDisabled={btnIsDisabled}
                    />
                  </div>
                </div>
              </div>
            )
          }

        </Grid>
      </Grid>
    </div>
  );
}
