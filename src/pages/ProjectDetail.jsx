import { useContext, useState, useEffect } from "react";
import { LocalContext } from "../contexts/LocalContext";
import ToastContext from "../contexts/ToastProvider";
import { useTranslation } from "react-i18next";
import "../css/projectDetail.css";
import { Axios } from "../api/Axios";
import { PROJECTS, CATEGORIES } from "../api/Api";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import BreadCrumb from "../components/BreadCrumb";
import OneProject from "../components/OneProject";
import { Swiper, SwiperSlide } from "swiper/react";

import Container from "@mui/material/Container";

const formatCreatedAt = (createdAt, locale) => {
  const date = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", options);
};

function ProjectDetail() {
  const { locale, setLocale } = useContext(LocalContext);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const { showHideToast } = useContext(ToastContext);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  //  ====== get specific project ========
  useEffect(() => {
    setLoading(true);
    Axios.get(`${PROJECTS}/${id}`)
      .then(function (response) {
        // console.log(response.data.project);
        setProject(response.data.project);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        showHideToast(error.response.data.message, "error");
        setLoading(false);
      });
  }, [id]); // Ensure the effect depends on id
  //  ====== get specific project ========

  //  ====== get all project ========
  useEffect(() => {
    setLoading(true);
    Axios.get(`${PROJECTS}`)
      .then(function (response) {
        // console.log(response.data.projects);
        setProjects(response.data.projects);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        showHideToast(error.response.data.message, "error");
        setLoading(false);
      });
  }, []);
  //  ====== get all project ========

  //  ====== get all categories ========
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORIES}`)
      .then(function (response) {
        // console.log(response.data.categories);
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        showHideToast(error.response.data.message, "error");
        setLoading(false);
      });
  }, []);
  //  ====== get all categories ========

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "projectdetail"].join(" ")}
    >
      <Container maxWidth="xl">
        <div className="header-project-detail">
          <img className="header-img" src={project?.image_path} alt="" />
        </div>

        <div className="detail-body">
          <div className="project-body">
            <BreadCrumb project={project} />
          </div>
          <div className="all-text">
            <h3 className="main-title">{project?.name}</h3>
            <p className="main-text">
              {formatCreatedAt(project?.created_at, locale)}
            </p>

            <div className="stack" style={{ gap: "20px", marginTop: "3px" }}>
              <div className="stack">
                <Icon
                  icon="carbon:location"
                  width="20"
                  height="20"
                  color="#d876318a"
                />
                <p className="country">{project?.country}</p>
              </div>
              <div className="stack">
                <Icon
                  icon="hugeicons:maps-location-01"
                  width="20"
                  height="20"
                  color="#d876318a"
                />
                <p className="country">{project?.state}</p>
              </div>
            </div>

            <p className="sub-text">{project?.description}</p>
          </div>
        </div>

        <div className="other-project">
          <h3 className="sec-title">{t("مشروعات أخرى")}</h3>
          <div className="swiper-container-slider">
            <Swiper
              slidesPerView={1.1}
              spaceBetween={20}
              breakpoints={{
                567: {
                  slidesPerView: 2.1,
                  spaceBetween: 20,
                },
                800: {
                  slidesPerView: 3.1,
                  spaceBetween: 20,
                },
                1100: {
                  slidesPerView: 4.1,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 5.1,
                  spaceBetween: 20,
                },
              }}
              loop={true}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <OneProject project={project} categories={categories} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProjectDetail;
