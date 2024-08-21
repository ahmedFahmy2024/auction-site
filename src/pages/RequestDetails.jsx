import { useContext, useEffect, useState } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import "../css/supplierform2.css";
import { Icon } from "@iconify/react";
import ContainedBtn from "../components/buttons/ContainedBtn";
import { REQUEST_ID } from "../api/Api";
import { Axios } from "../api/Axios";
import { useParams, useNavigate } from "react-router-dom";
import ToastContext from "../contexts/ToastProvider";
import pdf from "../assets/pdf.svg";

import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ThirdSection from "../components/ThirdSection";
import { useUser } from "../contexts/UserProvider";

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

function isImageFile(file) {
  if (typeof file === 'string') {
    // If it's a URL, check the file extension
    return /\.(jpeg|jpg|gif|png)$/i.test(file);
  } else if (file instanceof File) {
    // If it's a File object, check the MIME type
    return file.type.startsWith('image/');
  }
  return false;
}

export default function RequestDetails() {
  const { locale } = useContext(LocalContext);
  const { t } = useTranslation();
  const { showHideToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState([]);
  const { id } = useParams();
  const { currentSubscription } = useUser();
  // console.log('currentSubscription', currentSubscription);

  //  ====== get specific requests ========
  useEffect(() => {
    setLoading(true);
    Axios.get(`${REQUEST_ID}/${id}`)
      .then(function (response) {
        // console.log(response.data.request_quote);
        setRequest(response.data.request_quote);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        showHideToast(error.response.data.message, "error");
        setLoading(false);
      });
  }, []);
  //  ====== get specific requests ========

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const isSCrapPackage =
  currentSubscription &&
  currentSubscription?.package_name?.includes("الباقة سكراب");

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "supplierform2"].join(" ")}
    >
      <Container className="container" maxWidth="lg">
        <h2 className="head-title">{t("طلب سعر مفتوح")}</h2>
        <div className="section-one">
          <div className="text-sec">
            <h4 className="title">{t(request?.type)}</h4>
            <h3 className="name">{request?.name}</h3>
            <div className="stack gap">
              <p className="date">{formatCreatedAt(request?.created_at)}</p>
            </div>
          </div>
          <div className="category">
            <div className="card-category">{request?.category}</div>
          </div>
          <div className="location">
            <div className="country">
              <Icon
                icon="material-symbols-light:location-on-outline-rounded"
                width="20"
                height="20"
              />
              <div className="country-text">{t(request?.country)}</div>
            </div>
            <div className="state">
              <Icon
                icon="material-symbols-light:location-on-outline-rounded"
                width="20"
                height="20"
              />
              <div className="state-text">{t(request?.state)}</div>
            </div>
          </div>
          <p className="content">{request?.description}</p>
          <div className="file">{t("ملف مواصفات")}</div>
          <div>
            {request.upload_file && (
              <div className="preview">
                <span className="prev-image">
                <img className="img" src={isImageFile(request.upload_file) ? request.upload_file : pdf} alt="" />
                </span>
              </div>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <a
              href={request.upload_file}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContainedBtn title={t("تحميل ملف المواصفات")} width="100%" />
            </a>
          </div>
        </div>

        {currentSubscription?.package_name && !isSCrapPackage && (
          <div>
            <ThirdSection scraps={request} />
          </div>
        )}
      </Container>
    </div>
  );
}
