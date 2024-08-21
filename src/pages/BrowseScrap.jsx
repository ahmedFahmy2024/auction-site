import { useContext, useState, useEffect } from "react";
import { LocalContext } from "../contexts/LocalContext";
import ToastContext from "../contexts/ToastProvider";
import Banner3 from "../components/Banner3";
import "../css/browsescrap.css";
import { SCRAPS } from "../api/Api";
import { Axios } from "../api/Axios";
import ScrapProducts from "../components/ScrapProducts";
import ScrabFilter from "../components/ScrabFilter";
import Paginations from "../components/Paginations";
import Cookie from 'cookie-universal';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Login from "./Login";

export default function BrowseScrap() {
  const cookies = Cookie()
  const token = cookies.get('website_token')
  const { locale, setLocale } = useContext(LocalContext);
  const { showHideToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [scraps, setScraps] = useState([]);
  const [filteredScraps, setFilteredScraps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 21; // Number of projects per page

  // Fetch all scraps
  useEffect(() => {
    setLoading(true);
    Axios.get(`${SCRAPS}`, {
      params: {
        page: currentPage,
        limit: projectsPerPage,
      },
    })
      .then(function (response) {
        setScraps(response.data.scraps);
        setFilteredScraps(response.data.scraps);
        setLoading(false);
      })
      .catch(function (error) {
        showHideToast(error.response.data.message, "error");
        setLoading(false);
      });
  }, [currentPage]);

  // Handler to filter scraps by category
  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === null) {
      setFilteredScraps(scraps); // Show all scraps if no category is selected
    } else {
      setFilteredScraps(
        scraps.filter((scrap) => scrap.category === selectedCategory)
      );
    }
  };

  // filter projects based on search term
  // Handler for search
  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
    // Filter scraps based on search term
    const filtered = scraps.filter((scrap) =>
      scrap.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredScraps(filtered);
  };

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
      className={[locale === "en" ? "ltr" : "rtl", "browsescrap"].join(" ")}
    >
      <Banner3 />
      {
        !token ? (
          <Login />
        ) : (
          <div style={{ backgroundColor: "#F2F2F2", paddingTop: "50px" }}>
            <Container maxWidth="lg">
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <Grid container spacing={5}>
                  <Grid className="first-grid" md={8} xs={12}>
                    <ScrapProducts
                      scraps={scraps}
                      filteredScraps={filteredScraps}
                      currentPage={currentPage}
                      projectsPerPage={projectsPerPage}
                    />
                  </Grid>
                  <Grid className="second-grid" md={4} xs={12}>
                    <ScrabFilter
                      onCategoryChange={handleCategoryChange}
                      onSearch={handleSearchChange}
                      scraps={scraps}
                    />
                  </Grid>
                </Grid>
              </div>
              <Paginations
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProjects={scraps.length}
                projectsPerPage={projectsPerPage}
              />
            </Container>
          </div>
        )
      }
    </div>
  );
}
