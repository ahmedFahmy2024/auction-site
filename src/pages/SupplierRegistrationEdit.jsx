import { useContext, useEffect, useState } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import ToastContext from "../contexts/ToastProvider";
import { useParams } from "react-router-dom";
import { Axios } from "../api/Axios";
import { Supplier_Registration } from "../api/Api";
import { Icon } from "@iconify/react";
import "../css/complainEdit.css";
import { green, orange, blue, blueGrey } from "@mui/material/colors";
import pdf from "../assets/pdf.svg";

import IconButton from "@mui/material/IconButton";

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

function SupplierRegistrationEdit() {
  const [addInput, setAddInput] = useState("");
  const [specificComplain, setSpecificComplain] = useState(null);
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { showHideToast } = useContext(ToastContext);
  const { supplierRegistrationId } = useParams();

  const fetchComplaint = async () => {
    try {
      const response = await Axios.get(`${Supplier_Registration}/${supplierRegistrationId}`);
      console.log(response.data);
      setSpecificComplain(response.data);
    } catch (error) {
      console.log(error);
      showHideToast(t("An error occurred. Please try again."), "error");
    }
  };

  useEffect(() => {
    let interval;
    if (supplierRegistrationId) {
      fetchComplaint();
      interval = setInterval(fetchComplaint, 10000); // Poll every 10 second
    }
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [supplierRegistrationId]);

  // ================= edit complain ================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const param = {
      response: addInput,
    };

    try {
      const response = await Axios.post(
        `${Supplier_Registration}/${supplierRegistrationId}/respond`,
        param
      );
      // console.log(response);
      setAddInput("");
      fetchComplaint();
    } catch (error) {
      console.log(error);
      showHideToast(t("An error occurred. Please try again."), "error");
    }
  };
  // ================= edit complain ================

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      month: "short", // Display month in short format (e.g., "May")
      day: "numeric", // Display day of the month (e.g., "20")
      hour: "numeric", // Display hour (e.g., "3")
      minute: "numeric", // Display minute (e.g., "36")
      hour12: true, // Use 12-hour clock with "AM" and "PM"
    };
    return date.toLocaleString(undefined, options);
  }

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "chat-area-main"].join(" ")}
    >
      <div className="first-box">
        <div className="first-row-title modifysize" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <div className="stack">
            <div className="item-row">
              <h4 className="title">{t("Name")}:</h4>
              <div className="header-title">{specificComplain?.contact_person_name}</div>
            </div>
            <div
              className="status-colors"
              style={{
                backgroundColor:
                  specificComplain?.status === "open"
                    ? blue[100]
                    : specificComplain?.status === "in_progress"
                      ? orange[100]
                      : specificComplain?.status === "resolved"
                        ? green[100]
                        : blueGrey[100],
                color:
                  specificComplain?.status === "open"
                    ? blue[700]
                    : specificComplain?.status === "in_progress"
                      ? orange[700]
                      : specificComplain?.status === "resolved"
                        ? green[700]
                        : blueGrey[700],
              }}
            >
              {t(specificComplain?.status)}
            </div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Email")}:</h4>
            <div className="header-title">{specificComplain?.email_address}</div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Phone")}:</h4>
            <div className="header-title">{specificComplain?.phone_number}</div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Job Title")}:</h4>
            <div className="header-title">{specificComplain?.job_title}</div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Location")}:</h4>
            <div className="header-title">{specificComplain?.location}</div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Company Name")}:</h4>
            <div className="header-title">{specificComplain?.company_name}</div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Company Qualification")}:</h4>
            <div className="header-title">{specificComplain?.company_name_qualification}</div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Commercial Registration Number")}:</h4>
            <div className="header-title">{specificComplain?.commercial_registration_number}</div>
          </div>
          <div className="item-row">
            <h4 className="title">{t("Website")}:</h4>
            <a style={{ color: "inherit" }} href={specificComplain?.website} className="header-title">{specificComplain?.website}</a>
          </div>
          <div className="stack">
            <div className="item-row">
              <h4 className="title">{t("Official Document")}:</h4>
              <a style={{ width: "40px", aspectRatio: "1/1" }} href={specificComplain?.official_document} target="_blank" rel="noopener noreferrer">
                <img className="img-limit" src={isImageFile(specificComplain?.official_document) ? specificComplain?.official_document : pdf} alt="" />
              </a>
            </div>
            <div className="item-row">
              <h4 className="title">{t("Profile")}:</h4>
              <a style={{ width: "40px", aspectRatio: "1/1" }} href={specificComplain?.profile} target="_blank" rel="noopener noreferrer">
                <img className="img-limit" src={isImageFile(specificComplain?.profile) ? specificComplain?.profile : pdf} alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className="first-row-chat">
          {specificComplain?.responses?.map((response) => (
            <div className="message" key={response.id}>
              {response?.user_id !== specificComplain?.user_id ? (
                <div className="chat-msg user">
                  <div className="chat-msg-profile">
                    <img
                      className="chat-msg-img"
                      src={response?.user?.profile_image}
                      alt=""
                    />
                    <div className="chat-msg-date">
                      {formatTimestamp(response?.created_at)}
                    </div>
                  </div>
                  <div className="chat-msg-content">
                    <div className="chat-msg-text">{response?.response}</div>
                  </div>
                </div>
              ) : (
                <div className="chat-msg admin">
                  <div className="chat-msg-profile">
                    <img
                      className="chat-msg-img"
                      src={response?.user?.profile_image}
                      alt=""
                    />
                    <div className="chat-msg-date">
                      {formatTimestamp(response?.created_at)}
                    </div>
                  </div>
                  <div className="chat-msg-content">
                    <div className="chat-msg-text">{response?.response}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="first-row-input">
          <div className="input-box">
            <input
              value={addInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              onChange={(e) => setAddInput(e.target.value)}
              type="text"
              placeholder={t("Type here...")}
            />
            <IconButton onClick={handleSubmit}>
              <Icon
                className="send-icon"
                icon="lets-icons:send-hor-light"
                width="28"
                height="28"
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierRegistrationEdit;
