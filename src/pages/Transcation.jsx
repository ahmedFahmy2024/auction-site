import { useContext, useState, useEffect } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import "../css/transcation.css";
import { Icon } from "@iconify/react";
import ContainedBtn from "../components/buttons/ContainedBtn";
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { red, green, orange } from "@mui/material/colors";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

function Transcation() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { transcations, subscription } = useUser();

  if (!transcations || !subscription) return null;

  const subscriptionMap = subscription.reduce((acc, subscription) => {
    acc[subscription.id] = subscription.package.name;
    return acc;
  }, {});

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "transcation"].join(" ")}
    >
      <div className="transcation-container">
        {transcations.map((transcation, index) => {
          const packageName = subscriptionMap[transcation.subscription_id];
          return (
            <div
              to={`/settings/${id}/pricerequest/${transcation?.id}/view`}
              key={index}
            >
              <div className="first-row">
                <div className="firstsec">
                  <div className="stack">
                    <div className="icon"></div>
                    <h3 className="header-price-requset">
                      {transcation?.transaction_id}
                    </h3>
                  </div>
                  <div className="category">
                    <div
                      style={{
                        backgroundColor:
                          transcation?.status === "success"
                            ? green[100]
                            : transcation?.status === "pending"
                            ? orange[100]
                            : red[100],
                            color:
                            transcation?.status === "success"
                              ? green[700]
                              : transcation?.status === "pending"
                              ? orange[700]
                              : red[700],
                      }}
                      className="card-category"
                    >
                      {t(transcation?.status)}
                    </div>
                  </div>
                </div>

                <div className="secondsec">
                  <div className="date">
                    <Icon
                      icon="healthicons:calendar-outline"
                      width="20"
                      height="20"
                      color="#D87631"
                    />
                    <div className="date-text">
                      {formatCreatedAt(transcation?.created_at)}
                    </div>
                  </div>

                  <div className="country">
                    <Icon
                      icon="game-icons:money-stack"
                      width="20"
                      height="20"
                      color="#D87631"
                    />
                    <div
                      style={{ color: "#000", fontWeight: "bold" }}
                      className="country-text"
                    >
                      {transcation?.amount}
                    </div>
                  </div>

                  <div className="state">
                    <Icon
                      icon="fluent:payment-24-filled"
                      width="20"
                      height="20"
                      color="#D87631"
                    />
                    <div style={{ color: "#000" }} className="state-text">
                      {transcation?.payment_method}
                    </div>
                  </div>
                </div>

                <div className="thirdSec">
                  <div style={{ color: "#000" }} className="title">
                    {packageName}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div style={{ marginTop: '20px' }}>
          <NavLink to={`/settings/${id}/priceRequest/add`}>
            <ContainedBtn title={t("اضافة طلب")} />
          </NavLink>
        </div> */}
      </div>
    </div>
  );
}

export default Transcation;
