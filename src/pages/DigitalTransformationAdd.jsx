import React, { useContext, useEffect, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/addscrab.css'
import ContainedBtn from '../components/buttons/ContainedBtn';
import { Axios } from '../api/Axios';
import { DIGITAL_TRANSFORMATION } from '../api/Api';
import ToastContext from '../contexts/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function DigitalTransformationAdd() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { showHideToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const { setRunUseEffect } = useUser();

  // =============== add state ===============
  const [addInput, setAddInput] = useState({
    Company: "",
    Name: "",
    Phone: "",
    Location: "",
    CompanySpecialization: "",
  })

  function handleForm(e) {
    setAddInput({ ...addInput, [e.target.name]: e.target.value })
  }
  // =============== add state ===============

  //    =============== add functions ================
  async function handleDialogSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let form = new FormData();
    form.append("company_name", addInput.Company);
    form.append("person_name", addInput.Name);
    form.append("phone_number", addInput.Phone);
    form.append("address", addInput.Location);
    form.append("company_specialization", addInput.CompanySpecialization);

    try {
      const response = await Axios.post(`${DIGITAL_TRANSFORMATION}`, form)
      // console.log(response);
      showHideToast(t("Added successfully"));
      setAddInput({
        Company: "",
        Name: "",
        Phone: "",
        Location: "",
        CompanySpecialization: "",
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
  const btnIsDisabled = addInput.Company === "" || addInput.Name === "" || addInput.Phone === "" || addInput.Location === "" || addInput.CompanySpecialization === "";

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
                  label={t("رقم الهاتف")}
                  name="Phone"
                  size='small'
                  fullWidth
                  value={addInput.Phone}
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
                  label={t("عنوان الشركة")}
                  name="Location"
                  size='small'
                  fullWidth
                  value={addInput.Location}
                  onChange={handleForm}
                />
              </div>
              <div className="stack">
              <TextField
                  label={t("تخصص الشركة")}
                  name="CompanySpecialization"
                  size="small"
                  fullWidth
                  value={addInput.CompanySpecialization}
                  onChange={handleForm}
                />
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

export default DigitalTransformationAdd