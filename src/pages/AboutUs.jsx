import React from "react";
import { useContext } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import Banner1 from "../components/Banner1";
import Info from "../components/Info";
import MoreInfo from "../components/MoreInfo";

import Container from "@mui/material/Container";
import Cooperating from "../components/Cooperating";

export default function AboutUs() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "aboutus"].join(" ")}
    >
      <Banner1
        title={t("عن الشركة")}
        desc={t(
          "منصة بي تو بي العربية تجمع بين الشركات لتعزيز التعاون والشراكات الناجحة، تقديم حلول مبتكرة لدعم الأعمال وتعزيز النمو المستدام."
        )}
      />
      <div style={{ backgroundColor: "#F2F2F2" }}>
        <Container maxWidth="lg">
          <Info />
          <MoreInfo />
          <Cooperating />
        </Container>
      </div>
    </div>
  );
}
