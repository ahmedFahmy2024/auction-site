import React, { useContext, useEffect, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/addscrab.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import { Axios } from '../api/Axios';
import { SCRAPS } from '../api/Api';
import ToastContext from '../contexts/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import "moment/locale/ar";

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddScrab() {
    const { locale, setLocale } = useContext(LocalContext);
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { showHideToast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { setRunUseEffect } = useUser();

    useEffect(() => {
        moment.locale(locale);
      }, [locale]);

    // ============= dialog ===============
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setRunUseEffect((prev) => prev + 1);
    };

    const handleNavigate = () => {
        navigate('/');
        setRunUseEffect((prev) => prev + 1);
    }
    // ============= dialog ===============

    // =============== add state ===============
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const [addInput, setAddInput] = useState({
        Name: "",
        Category: "",
        Description: "",
        Quantity: "",
        Minimum: "",
        Unit: "",
        Location: "",
    })

    function handleForm(e) {
        setAddInput({ ...addInput, [e.target.name]: e.target.value })
    }

    function handleDateChange(date) {
        setSelectedDate(date);
    }

    // =============== add state ===============


    //    =============== add functions ================
    function handleImageChange(event) {
        const files = event.target.files;

        // Filter out non-File objects
        const validFiles = Array.from(files).filter(file => file instanceof File);

        const newSelectedImages = [...selectedImages, ...validFiles];
        setSelectedImages(newSelectedImages);

        // Preview images
        const previews = validFiles.map(file => URL.createObjectURL(file));

        // Concatenate new previews with existing previews
        setImagePreviews([...imagePreviews, ...previews]);
    }

    // Remove image from selected images
    const removeImage = (index) => {
        // Filter out the image at the specified index from both arrays
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        // Update the state with the filtered arrays
        setSelectedImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    async function handleDialogSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let form = new FormData();
        form.append("name", addInput.Name);
        form.append("description", addInput.Description);
        form.append("category", addInput.Category);
        form.append("quantity", addInput.Quantity);
        form.append("min_quantity", addInput.Minimum);
        form.append("unit", addInput.Unit);
        form.append("location", addInput.Location);
        for (let i = 0; i < selectedImages.length; i++) {
            form.append(`images[]`, selectedImages[i]);
        }
        const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;
        form.append("scrap_duration", formattedDate);
        
        try {
            const response = await Axios.post(`${SCRAPS}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            // console.log(response);
            showHideToast(t("Added successfully"));
            setAddInput({
                Name: "",
                Description: "",
                Category: "",
                Quantity: "",
                Minimum: "",
                Unit: "",
                Location: "",
            });
            setSelectedImages([]);
            setImagePreviews([]);
            setSelectedDate(null);
            setLoading(false);
            handleClickOpen();
        } catch (error) {
            console.log(error);
            setLoading(false);
            showHideToast(t("An error occurred. Please try again."), "error");
        }
    }
    //    =============== add functions ================

    // ================= loading =================
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

    // ============== btn classes ==============
    const btnIsDisabled = !addInput.Name || !addInput.Description || !addInput.Category || !addInput.Quantity || !addInput.Minimum || !addInput.Unit || !addInput.Location || !selectedImages.length;

    return (
      <div
        dir={locale === "en" ? "ltr" : "rtl"}
        className={[locale === "en" ? "ltr" : "rtl", "addscrab"].join(" ")}
      >
        <Grid container spacing={2}>
          <Grid className="grid-text" xs={12} md={12}>
            <div className="padding">
              <h2>{t("اضافة مزاد جديد")}</h2>

              <div className="product-type">
                <h4 className="title">{t("بيانات المزايدة")}</h4>
                <div className="stack">
                  <TextField
                    label={t("الإسم")}
                    name="Name"
                    size="small"
                    fullWidth
                    value={addInput.Name}
                    onChange={handleForm}
                  />
                  <TextField
                    label={t("التصنيف")}
                    name="Category"
                    size="small"
                    fullWidth
                    value={addInput.Category}
                    onChange={handleForm}
                  />
                </div>
                <TextField
                  label={t("الوصف")}
                  multiline
                  rows={3}
                  fullWidth
                  name="Description"
                  sx={{ mb: 2 }}
                  value={addInput.Description}
                  onChange={handleForm}
                />

                <div className="stack">
                  <TextField
                    label={t("عدد / كمية")}
                    name="Quantity"
                    size="small"
                    fullWidth
                    value={addInput.Quantity}
                    onChange={handleForm}
                  />
                  <TextField
                    label={t("الوحدة")}
                    name="Unit"
                    size="small"
                    fullWidth
                    value={addInput.Unit}
                    onChange={handleForm}
                  />
                </div>
                <div className="stack">
                  <TextField
                    label={t("الموقع")}
                    name="Location"
                    size="small"
                    fullWidth
                    value={addInput.Location}
                    onChange={handleForm}
                  />
                  <TextField
                    label={t("الحد الادنى")}
                    name="Minimum"
                    size="small"
                    fullWidth
                    value={addInput.Minimum}
                    onChange={handleForm}
                  />
                </div>

                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      format="YYYY-MM-DD"
                      label={t("تاريخ انتهاء المزاد")}
                      minDate={moment()} // This sets the minimum date to today
                      disablePast // This disables all dates in the past
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="product-type">
                <h4 className="title">{t("صور المنتج")}</h4>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div style={{ width: "100%", position: "relative" }}>
                      <div
                        className="images"
                        onClick={() =>
                          document.querySelector(".input-field").click()
                        }
                      >
                        <input
                          onChange={handleImageChange}
                          className="input-field"
                          style={{ display: "none" }}
                          accept="image/*"
                          multiple
                          type="file"
                        />
                        <div className="image">
                          <CloudUploadIcon
                            sx={{ fontSize: "150px", color: "#212b36" }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              textAlign: "center",
                            }}
                          >
                            <h6
                              style={{
                                fontSize: "1.125rem",
                                margin: "0",
                                fontWeight: 700,
                              }}
                            >
                              {t("Drop or Select file")}
                            </h6>
                            <p className="para">
                              {t("Drop files here or click")}
                              <span className="browse">{t("browse")}</span>
                              {t("thorough your machine")}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div style={{ margin: "14px 0 14px 0" }}>
                        {imagePreviews.map((image, index) => (
                          <div className="preview" key={index}>
                            <span className="prev-image">
                              <img src={image} alt="" />
                              <button
                                className="close"
                                onClick={() => removeImage(index)}
                              >
                                <CloseIcon
                                  sx={{ fontSize: "14px", color: "white" }}
                                />
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <ContainedBtn
                  title={t("اضافة")}
                  onClick={handleDialogSubmit}
                  btnIsDisabled={btnIsDisabled}
                />
              </div>
            </div>
          </Grid>
        </Grid>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent className="dialog-container">
            <div className="center">
              <div className="check-container">
                <img src={require("../assets/Check_mark.png")} alt="" />
              </div>
              <div className="title">{t("تم اضافة المزاد بنجاح")}</div>
              <p>
                {t("سيتم التواصل معك من خلال المقاولين و الموردين في اقرب وقت")}
              </p>
              <div className="center">
                <ContainedBtn
                  title={t("الرجوع للصفحة الرئيسية")}
                  width="200px"
                  onClick={handleNavigate}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
}
