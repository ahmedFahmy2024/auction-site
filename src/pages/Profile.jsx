import { useContext, useState, useEffect } from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import "../css/profile.css";
import ContainedBtn from "../components/buttons/ContainedBtn";
import OutlineBtn from "../components/buttons/OutlineBtn";
import { useUser } from "../contexts/UserProvider";
import ToastContext from "../contexts/ToastProvider";
import { Axios } from "../api/Axios";
import { EDIT_PROFILE } from "../api/Api";
import { getStatesForCountry } from "../helper/stateNames";
import pdf from "../assets/pdf.svg";
import { Icon } from "@iconify/react";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Tooltip } from "@mui/material";

export default function Profile() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { showHideToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const { user, setRunUseEffect } = useUser();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // console.log(user)

  //  ================ edit state ================
  const [update, setUpdate] = useState({
    AccountType: "",
    CommercialRegister: "",
    CompanyName: "",
    Country: "",
    Phone: "",
    State: "",
    TaxNumber: "",
    Name: "",
    Email: "",
    code: "",
    Image: null,
    ImagePreview: null,
    File: null,
    FilePreview: null,
  });

  const handleform = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setUpdate({ ...update, Country: selectedCountry, State: "" });
  };

  const states = getStatesForCountry(update.Country);
  //  ================ edit state ================

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

  useEffect(() => {
    if (user) {
      setUpdate({
        Name: user.name || "",
        Email: user.email || "",
        ImagePreview: user.profile_image || null,
        FilePreview: user.accommodation_type ? (isImageFile(user.accommodation_type) ? user.accommodation_type : pdf) : null,
        Country: user.country || "",
        State: user.state || "",
        Phone: user.phone || "",
        TaxNumber: user.tax_number || "",
        CommercialRegister: user.commercial_register || "",
        CompanyName: user.company_name || "",
        AccountType: user.account_type || "",
        code: user.promocode || "",
      });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  // ================= update profile ======================
  function handleImageChange(event) {
    const imageFile = event.target.files[0];
    const imagePreviewURL = URL.createObjectURL(imageFile);
    setUpdate({
      ...update,
      Image: imageFile,
      ImagePreview: imagePreviewURL,
    });
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setUpdate({
        ...update,
        File: file,
        FilePreview: isImageFile(file) ? URL.createObjectURL(file) : pdf // Create object URL for preview
      });
    }
  }

  // console.log('update', update)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", update.Name);
    formData.append("country", update.Country);
    formData.append("state", update.State);
    formData.append("phone", update.Phone);
    formData.append("tax_number", update.TaxNumber);
    formData.append("commercial_register", update.CommercialRegister);
    formData.append("company_name", update.CompanyName);
    formData.append("account_type", update.AccountType);

    if (update.Image) {
      // Check if an image is selected
      formData.append("profile_image", update.Image);
    }
    if (update.File) {
      // Check if an image is selected
      formData.append("accommodation_type", update.File);
    }

    try {
      const response = await Axios.post(`${EDIT_PROFILE}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setLoading(false);
      setRunUseEffect((prevState) => prevState + 1);
      showHideToast(t("Updated successfully"));
    } catch (error) {
      console.log(error);
      showHideToast(error, "error");
      setLoading(false);
    }
  };
  // ================= update profile ======================

  // ======================= loading ========================
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

  const handleCopy = () => {
    navigator.clipboard.writeText(update.code).then(() => {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 1000); // Hide tooltip after 1.5 seconds
    });
  };

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "profile"].join(" ")}
    >
      <div className="profile-container">
        <div className="first-row">
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flex: 1 }}>
            <Avatar
              alt={update.Name}
              src={update.ImagePreview}
              sx={{ width: { xs: 75, md: 100 }, height: { xs: 75, md: 100 } }}
            />
            <div className="stack">
              <label className="upload-btn">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <ContainedBtn
                  title={t("رفع الصورة")}
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                />
              </label>
            </div>
          </div>
          <Tooltip
            open={tooltipOpen}
            title={t("Copied!")}
            placement="top"
            arrow
          >
            <div className="coupon-field" onClick={handleCopy}>
              <div>{t("كود الخصم")}</div>
              <div>{update.code}</div>
              <Icon icon="tabler:copy-check" width="24" height="24" />
            </div>

          </Tooltip>
        </div>
        <div className="second-row">
          <TextField
            value={update.Name}
            onChange={handleform}
            type="text"
            name="Name"
            size="small"
            label={t("الاسم")}
            variant="outlined"
            fullWidth
          />
          <TextField
            disabled
            value={update.Email}
            onChange={handleform}
            type="email"
            name="Email"
            size="small"
            label={t("البريد الالكتروني")}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="second-row">
          <FormControl fullWidth size="small" required sx={{ minWidth: 120 }}>
            <InputLabel id="demo-select-small-label1">
              {t("Select Country")}
            </InputLabel>
            <Select
              className={[
                locale === "en" ? "ltr" : "rtl",
                "checkout-select",
              ].join(" ")}
              labelId="demo-select-small-label1"
              id="demo-select-small1"
              name="Country"
              value={update.Country}
              label={t("Select Country")}
              onChange={handleCountryChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      justifyContent:
                        locale === "en" ? "flex-start" : "flex-end",
                    },
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                {t("select country")}
              </MenuItem>
              <MenuItem value="Egypt">{t("Egypt")}</MenuItem>
              <MenuItem value="Saudi Arabia">{t("Saudi Arabia")}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" required sx={{ minWidth: 120 }}>
            <InputLabel id="demo-select-small-label2">
              {t("Select State")}
            </InputLabel>
            <Select
              className={[
                locale === "en" ? "ltr" : "rtl",
                "checkout-select",
              ].join(" ")}
              labelId="demo-select-small-label2"
              id="demo-select-small2"
              name="State"
              value={update.State}
              label={t("Select State")}
              onChange={handleform}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      justifyContent:
                        locale === "en" ? "flex-start" : "flex-end",
                    },
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                {t("select state")}
              </MenuItem>
              {states.map((state) => (
                <MenuItem key={state.name} value={state.name}>
                  {locale === "en" ? state.labelEn : state.labelAr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="second-row">
          <TextField
            className="phone-num"
            value={update.Phone}
            onChange={handleform}
            type="tel"
            name="Phone"
            size="small"
            label={t("رقم الهاتف")}
            variant="outlined"
            fullWidth
          />
          <TextField
            value={update.CommercialRegister}
            onChange={handleform}
            type="text"
            name="CommercialRegister"
            size="small"
            label={t("السجل التجاري")}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="second-row">
          <TextField
            value={update.CompanyName}
            onChange={handleform}
            type="text"
            name="CompanyName"
            size="small"
            label={t("اسم الشركة")}
            variant="outlined"
            fullWidth
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth size="small">
            <InputLabel id="demo-select-small-label">
              {t("نوع الحساب")}
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label={t("نوع الحساب")}
              name="AccountType"
              value={update.AccountType}
              onChange={handleform}
            >
              <MenuItem value="supplier">{t("supplier")}</MenuItem>
              <MenuItem value="individual_contractor">
                {t("individual contractor")}
              </MenuItem>
              <MenuItem value="corporate_contractor">
                {t("corporate contractor")}
              </MenuItem>
              <MenuItem value="engineering_office">
                {t("engineering office")}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="second-row">
          <TextField
            value={update.TaxNumber}
            onChange={handleform}
            type="number"
            name="TaxNumber"
            size="small"
            label={t("الرقم الضريبي")}
            variant="outlined"
            fullWidth
          />
        </div>

        <div className="file-input">
          <div>
            <input
              type="file"
              name="file-input"
              id="file-input"
              className="file-input__input"
              onChange={handleFileChange}
              
            />

            <label className="file-input__label" htmlFor="file-input" >
              <Icon icon="material-symbols-light:upload" width="20" height="20" />
              <span>{t("نوع الإقامة")}</span>
            </label>
            {/* <p className='details'>{t("The upload file field must be a file of type: jpeg, png, jpg, gif, pdf, doc, docx.")}</p> */}
          </div>
          <div style={{ margin: '0' }}>
            {update.FilePreview && (
              <div className='preview' style={{ border: 'none' }}>
                <span className='prev-image'>
                  <a href={update.File} download target="_blank" rel="noopener noreferrer">
                  <img src={update.FilePreview} alt="" style={{ position: 'static'}}/>
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="forth-row">
          <ContainedBtn
            title={t("حفظ التعديلات")}
            padding="5px"
            fontSize="14px"
            onClick={handleUpdate}
          />
          {/* <OutlineBtn title={t("إلغاء")} bgColor='white' bdColor="#767676" color='#838383' fontsize='14px' padding='5px' width='130px' /> */}
        </div>
      </div>
    </div>
  );
}
