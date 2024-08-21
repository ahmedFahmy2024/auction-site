import { useContext, useState, useEffect } from "react";
import { LocalContext } from "../contexts/LocalContext";
import "../css/projects.css";
import ToastContext from "../contexts/ToastProvider";
import { Axios } from "../api/Axios";
import { PROJECTS, CATEGORIES } from "../api/Api";
import Project from "../components/Project";
import Filter from "../components/Filter";
import Banner4 from "../components/Banner4";
import { useTranslation } from "react-i18next";
import Paginations from "../components/Paginations";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Projects() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { showHideToast } = useContext(ToastContext);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // to keep track of selected categories
  const [selectedCountries, setSelectedCountries] = useState([]); // to keep track of selected countries
  const [searchTerm, setSearchTerm] = useState(""); // to keep track of search term

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10; // Number of projects per page

  //  ====== get all projects ========
  useEffect(() => {
    setLoading(true);
    Axios.get(`${PROJECTS}`, {
      params: {
        page: currentPage,
        limit: projectsPerPage,
      },
    })
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
  }, [currentPage]);
  //  ====== get all projects ========

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

  // filter projects based on selected categories
  const handleCategoryChange = (categoryId, isChecked) => {
    // (a callback function to update the selectedCategories state) to the Filter component)
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  // filter projects based on selected countries
  const handleCountryChange = (country, isChecked) => {
    if (isChecked) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    }
  };

  // filter projects based on search term
  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // ================= loading =================
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

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className={[locale === "en" ? "ltr" : "rtl", "projects"].join(" ")}
    >
      <Banner4
        title={t("مشاريعنا")}
        desc={
          "اكتشف مجموعة مشاريعنا المبتكرة التي تبرز تفانينا في تقديم الحلول التكنولوجية الرائدة والمتطورة، والتي تعكس تفانينا في الابتكار وتحقيق النجاح لشركائنا."
        }
      />
      <Container maxWidth="lg">
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "30px 10px",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid md={8} className="firstgrid">
              <Project
                selectedCategories={selectedCategories}
                selectedCountries={selectedCountries}
                searchTerm={searchTerm}
                projects={projects}
                categories={categories}
                currentPage={currentPage}
                projectsPerPage={projectsPerPage}
              />
            </Grid>
            <Grid md={4} className="secondgrid">
              <Filter
                onCategoryChange={handleCategoryChange}
                onCountryChange={handleCountryChange}
                onSearch={handleSearchChange}
                categories={categories}
                projects={projects}
              />
            </Grid>
            <div className="last">
              <Paginations
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProjects={projects.length}
                projectsPerPage={projectsPerPage}
              />
            </div>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
