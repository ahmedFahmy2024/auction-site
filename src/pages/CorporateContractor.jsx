import {
  useContext,
  useState,
  useEffect,
  startTransition,
  useCallback,
} from "react";
import { LocalContext } from "../contexts/LocalContext";
import { useTranslation } from "react-i18next";
import Banner from "../components/Banner";
import Search from "../components/Search";
import "../css/subcontractors.css";
import ContractorFilter from "../components/ContractorFilter";
import CardContractor from "../components/CardContractor";
import { Axios } from "../api/Axios";
import { USERSTYPES } from "../api/Api";
import ToastContext from "../contexts/ToastProvider";
import Paginations from "../components/Paginations";
import Cookie from 'cookie-universal';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Login from "./Login";

export default function CorporateContractor() {
  const cookies = Cookie()
  const token = cookies.get('website_token')
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { showHideToast } = useContext(ToastContext);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20; // Number of users  per page

  //  ====== get all Users ========
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USERSTYPES}corporate_contractor`, {
      params: {
        page: currentPage,
        limit: usersPerPage,
      },
    })
      .then(function (response) {
        // console.log(response.data.users);
        startTransition(() => {
          setUsers(response.data.users);
          setFilteredUsers(response.data.users);
          setLoading(false);
        });
      })
      .catch(function (error) {
        console.log(error);
        showHideToast(error.response.data.message, "error");
        setLoading(false);
      });
  }, [currentPage]);
  //  ====== get all Users ========

  useEffect(() => {
    filterUsers();
  }, [selectedCountry, selectedState, searchTerm, currentPage, users]);

  const filterUsers = useCallback(() => {
    let filtered = users;

    if (selectedCountry) {
      filtered = filtered.filter((user) => user.country === selectedCountry);
    }
    if (selectedState) {
      filtered = filtered.filter((user) => user.state === selectedState);
    }
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Calculate the start and end index for the users to be displayed on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);

    setFilteredUsers(currentUsers);
  }, [selectedCountry, selectedState, searchTerm, users, currentPage]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState(null); // Reset state when country changes
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCurrentPage(1); // Reset to the first page when filters change
  };
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page when search term changes
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
      className={[locale === "en" ? "ltr" : "rtl", "subcontractors"].join(" ")}
    >
      <Banner
        title={t("مقاولي الباطن")}
        desc={t(
          "تعرف على شركائنا المميزين في مجالات متعددة، حيث نقدم لهم الدعم والشراكة لتحقيق أهدافهم وتطوير علاقات مستدامة تعكس رؤيتنا في بناء مستقبل مشرق ومزدهر."
        )}
      />
      {
        !token ? (
          <Login />
        ) : (
          <>
            <div className="search-position">
              <div className="search-width" style={{ width: "40%" }}>
                <Search onSearch={handleSearchChange} />
              </div>
            </div>
            <div style={{ backgroundColor: "#F2F2F2" }}>
              <Container maxWidth="lg">
                <ContractorFilter
                  onCountryChange={handleCountryChange}
                  onStateChange={handleStateChange}
                />
                <Grid container spacing={2}>
                  {filteredUsers.map((user, index) => (
                    <Grid sx={{ textAlign: "center" }} xs={6} md={3} key={index}>
                      <CardContractor user={user} />
                    </Grid>
                  ))}
                </Grid>
                <Paginations
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalProjects={users.length}
                  projectsPerPage={usersPerPage}
                />
              </Container>
            </div>
          </>
        )
      }

    </div>
  );
}
