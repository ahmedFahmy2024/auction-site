import React, { useContext } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import "../css/favourite.css";

const Favourite = () => {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "favourite"].join(" ")}
    >
      <NavLink className="favourite-icon" to="/favourite">
      <Icon icon="lets-icons:favorite-light" width="30" height="30" />
      </NavLink>
    </div>
  );
};

export default Favourite;
