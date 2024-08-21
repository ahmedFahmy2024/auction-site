import React, { useContext, useEffect, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/addscrab.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import { Axios } from '../api/Axios';
import { Supplier_Registration } from '../api/Api';
import ToastContext from '../contexts/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { Icon } from '@iconify/react';
import pdf from '../assets/pdf.svg';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

function SupplierRegistrationAdd() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { showHideToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const { setRunUseEffect } = useUser();

  // =============== add state ===============
  const [addInput, setAddInput] = useState({
    Company: "",
    Website: "",
    Name: "",
    Job: "",
    Phone: "",
    Email: "",
    CommercialRegistration: "",
    Certificate: "",
    Summary: "",
    Location: "",
    CompanyQualification: "",
    profile: null,
    profilePreview: null,
    document: null,
    documentPreview: null
  })

  function handleForm(e) {
    setAddInput({ ...addInput, [e.target.name]: e.target.value })
  }
  // =============== add state ===============

  function handleImageChange(event) {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const isImage = imageFile.type.startsWith('image/');
      setAddInput({
        ...addInput,
        profile: imageFile,
        profilePreview: isImage ? URL.createObjectURL(imageFile) : pdf // Create object URL for preview
      });
    }
  }

  function removeImage() {
    setAddInput({
      ...addInput,
      profile: null,
      profilePreview: null
    });
  }

  function handleDocumentChange(event) {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const isImage = imageFile.type.startsWith('image/');
      setAddInput({
        ...addInput,
        document: imageFile,
        documentPreview: isImage ? URL.createObjectURL(imageFile) : pdf // Create object URL for preview
      });
    }
  }

  function removeDocument() {
    setAddInput({
      ...addInput,
      document: null,
      documentPreview: null
    });
  }


  //    =============== add functions ================
  async function handleDialogSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let form = new FormData();
    form.append("company_name", addInput.Company);
    form.append("website", addInput.Website);
    form.append("contact_person_name", addInput.Name);
    form.append("job_title", addInput.Job);
    form.append("phone_number", addInput.Phone);
    form.append("email_address", addInput.Email);
    form.append("commercial_registration_number", addInput.CommercialRegistration);
    form.append("vat_registration_certificate_number", addInput.Certificate);
    form.append("summary_of_services", addInput.Summary);
    form.append("location", addInput.Location);
    form.append("company_name_qualification", addInput.CompanyQualification);
    if (addInput.profile !== null) { // Check if an image is selected
      form.append('profile', addInput.profile);
    }
    if (addInput.document !== null) { // Check if an image is selected
      form.append('official_document', addInput.document);
    }

    try {
      const response = await Axios.post(`${Supplier_Registration}`, form)
      console.log(response);
      showHideToast(t("Added successfully"));
      setAddInput({
        Company: "",
        Website: "",
        Name: "",
        Job: "",
        Phone: "",
        Email: "",
        CommercialRegistration: "",
        Certificate: "",
        Summary: "",
        Location: "",
        CompanyQualification: "",
        profile: null,
        profilePreview: null,
        document: null,
        documentPreview: null
      });
      setRunUseEffect((prev) => prev + 1);
      setLoading(false);
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
  const btnIsDisabled = addInput.Company === "" || addInput.Name === "" || addInput.Job === "" || addInput.Phone === "" || addInput.Email === "";

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "addscrab"].join(" ")}>
      <Grid container spacing={2}>
        <Grid className='grid-text' xs={12} md={12}>
          <div className='padding'>
            <h2>{t("اضافة بياناتك")}</h2>

            <div className="product-type">
              <div className="stack">
                <TextField
                  label={t("الإسم")}
                  name="Name"
                  size='small'
                  fullWidth
                  value={addInput.Name}
                  onChange={handleForm}
                />
                <TextField
                  label={t("الوظيفة")}
                  name="Job"
                  size='small'
                  fullWidth
                  value={addInput.Job}
                  onChange={handleForm}
                />
              </div>
              <div className="stack">
                <TextField
                  label={t("رقم الهاتف")}
                  name="Phone"
                  size='small'
                  fullWidth
                  value={addInput.Phone}
                  onChange={handleForm}
                />
                <TextField
                  label={t("البريد الالكتروني")}
                  name="Email"
                  size='small'
                  fullWidth
                  value={addInput.Email}
                  onChange={handleForm}
                />
              </div>
              <div className="stack">
                <TextField
                  label={t("اسم الشركة")}
                  name="Company"
                  size="small"
                  fullWidth
                  value={addInput.Company}
                  onChange={handleForm}
                />
                <TextField
                  label={t("موقع الشركة على الويب")}
                  name="Website"
                  size='small'
                  fullWidth
                  value={addInput.Website}
                  onChange={handleForm}
                />
              </div>
              <TextField
                label={t("نبذة عن خدماتك")}
                multiline
                rows={3}
                fullWidth
                name="Summary"
                value={addInput.Summary}
                onChange={handleForm}
                sx={{ mb: 2 }}
              />
              <div className="stack">
                <TextField
                  label={t("رقم السجل التجاري")}
                  name="CommercialRegistration"
                  size='small'
                  fullWidth
                  value={addInput.CommercialRegistration}
                  onChange={handleForm}
                />
                <TextField
                  label={t("رقم الشهادة الضريبية")}
                  name="Certificate"
                  size='small'
                  fullWidth
                  value={addInput.Certificate}
                  onChange={handleForm}
                />
              </div>
              <div className="stack">
                <TextField
                  label={t("عنوان الشركة")}
                  name="Location"
                  size='small'
                  fullWidth
                  value={addInput.Location}
                  onChange={handleForm}
                />
                <TextField
                  label={t("المؤهل العلمي")}
                  name="CompanyQualification"
                  size='small'
                  fullWidth
                  value={addInput.CompanyQualification}
                  onChange={handleForm}
                />
              </div>

              <div className="stack-row-col">
                <div>
                  <h3 style={{ marginBottom: '10px' }}>{t("البروفايل")}</h3>
                  <div className="file-input">
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      className="file-input__input"
                      onChange={handleImageChange}
                    />

                    <label className="file-input__label" htmlFor="file-input" >
                      <Icon icon="material-symbols-light:upload" width="20" height="20" />
                      <span>{t("رفع ملف")}</span>
                    </label>
                    <p className='details'>{t("The upload file field must be a file of type: jpeg, png, jpg, gif, pdf, doc, docx.")}</p>
                    <div style={{ margin: '8px 0 8px 0' }}>
                      {addInput.profilePreview && (
                        <div className='preview' style={{ border: 'none' }}>
                          <span className='prev-image'>
                            <a href={addInput.profilePreview} download target="_blank" rel="noopener noreferrer">
                              <img src={addInput.profilePreview} alt="" style={{ position: 'static' }} />
                            </a>
                            <button className='close' onClick={() => removeImage()}>
                              <CloseIcon sx={{ fontSize: '14px', color: 'white' }} />
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 style={{ marginBottom: '10px' }}>{t("مستندات رسمية")}</h3>
                  <div className="file-input">
                    <input
                      type="file"
                      name="file-input1"
                      id="file-input1"
                      className="file-input__input"
                      onChange={handleDocumentChange}
                    />

                    <label className="file-input__label" htmlFor="file-input1" >
                      <Icon icon="material-symbols-light:upload" width="20" height="20" />
                      <span>{t("رفع ملف")}</span>
                    </label>
                    <p className='details'>{t("The upload file field must be a file of type: pdf")}</p>
                    <div style={{ margin: '8px 0 8px 0' }}>
                      {addInput.documentPreview && (
                        <div className='preview' style={{ border: 'none' }}>
                          <span className='prev-image'>
                            <a href={addInput.documentPreview} download target="_blank" rel="noopener noreferrer">
                              <img src={addInput.documentPreview} alt="" style={{ position: 'static' }} />
                            </a>
                            <button className='close' onClick={() => removeDocument()}>
                              <CloseIcon sx={{ fontSize: '14px', color: 'white' }} />
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ marginTop: '24px' }}>
              <ContainedBtn title={t("اضافة")} onClick={handleDialogSubmit} btnIsDisabled={btnIsDisabled} />
            </div>

          </div>
        </Grid>
      </Grid>
    </div >
  )
}

export default SupplierRegistrationAdd