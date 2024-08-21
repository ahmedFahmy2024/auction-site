import { useContext, useState, useEffect } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import "../css/complains.css";
import { Icon } from "@iconify/react";
import ContainedBtn from "../components/buttons/ContainedBtn";
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { green, orange, blue, grey } from "@mui/material/colors";

const formatCreatedAt = (createdAt, locale) => {
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  };
  return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", options);
};

function DigitalTransformation() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const { digitalTransformation } = useUser();

  if (!digitalTransformation) return null;

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "complains digital"].join(" ")}
    >
      <div className="complains-container">
        {digitalTransformation.map((complain, index) => {
          return (
            <NavLink
              to={`/settings/${id}/digitalTransformation/${complain?.id}/edit`}
              key={index}
            >
              <div className="first-row">
                <div className="firstsec">
                  <div className="stack">
                    <div className="icon"></div>
                    <h3 className="header-price-requset">
                      {complain?.company_name}
                    </h3>
                    <div
                      style={{
                        backgroundColor:
                          complain?.status === "open"
                            ? blue[100]
                            : complain?.status === "in_progress"
                              ? orange[100]
                              : complain?.status === "resolved"
                                ? green[100]
                                : grey[100],
                        color:
                          complain?.status === "open"
                            ? blue[700]
                            : complain?.status === "in_progress"
                              ? orange[700]
                              : complain?.status === "resolved"
                                ? green[700]
                                : grey[700],
                      }}
                      className="status"
                    >
                      {t(complain?.status)}
                    </div>
                  </div>
                  <div className="date">
                    <Icon
                      icon="healthicons:calendar-outline"
                      width="20"
                      height="20"
                      color="#D87631"
                    />
                    <div className="date-text">
                      {formatCreatedAt(complain?.created_at, locale)}
                    </div>
                  </div>
                </div>

                <div className="secondsec"></div>

                <div className="thirdSec">
                  <div className="stack">
                    <div className="my-label">{t("العنوان :")}</div>
                    <div style={{ color: "#000" }} className="title">
                      {complain?.address}
                    </div>
                  </div>
                  <div className="stack">
                  <div className="my-label">{t("تخصص الشركة :")}</div>
                  <div style={{ color: "#000" }} className="title">
                    {complain?.company_specialization}
                  </div>
                  </div>

                </div>
              </div>
            </NavLink>
          );
        })}

        <div style={{ marginTop: "20px" }}>
          <NavLink to={`/settings/${id}/digitalTransformation/add`}>
            <ContainedBtn title={t("اضافة خدمة جديدة")} width="200px" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default DigitalTransformation;