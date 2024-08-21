import { useContext, useState, useEffect } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import ToastContext from '../contexts/ToastProvider';
import { useTranslation } from 'react-i18next';
import '../css/orders.css';
import RequestsContent from '../components/RequestsContent';
import Filter1 from '../components/Filter1';
import { REQUESTS } from '../api/Api';
import { Axios } from '../api/Axios';
import Banner4 from '../components/Banner4';
import Paginations from '../components/Paginations';
import Cookie from 'cookie-universal';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Login from './Login';

export default function Requests() {
  const cookies = Cookie()
  const token = cookies.get('website_token')
  const { locale } = useContext(LocalContext);
  const { t } = useTranslation();
  const { showHideToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Number of projects per page

  // Fetch all requests
  useEffect(() => {
    setLoading(true);
    Axios.get(REQUESTS, {
      params: {
        page: currentPage,
        limit: usersPerPage,
      },
    })
      .then(response => {
        const fetchRequests = response.data.request_quotes.filter((request) => request.status === 'published');
        setRequests(fetchRequests);
        setFilteredRequests(fetchRequests);
        setLoading(false);
      })
      .catch(error => {
        showHideToast(error.response.data.message, 'error');
        setLoading(false);
      });
  }, [currentPage]);

  // Filter requests based on selected filters
  useEffect(() => {
    let filtered = requests;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(request => selectedTypes.includes(request.type));
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(request => selectedCategories.includes(request.category));
    }

    if (searchTerm) {
      filtered = filtered.filter(request => request.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedCountry) {
      filtered = filtered.filter(request => request.country.toLowerCase() === selectedCountry.toLowerCase());
    }

    if (selectedState) {
      filtered = filtered.filter(request => request.state.toLowerCase() === selectedState.toLowerCase());
    }

    // Calculate the start and end index for the users to be displayed on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);

    setFilteredRequests(currentUsers);
  }, [selectedTypes, selectedCategories, searchTerm, selectedCountry, selectedState, requests, currentPage]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState(null); // Reset state when country changes
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div dir={locale === 'en' ? 'ltr' : 'rtl'} className={[locale === 'en' ? 'ltr' : 'rtl', 'orders'].join(' ')}>
      <Banner4
        title={t("الطلبات")}
        desc={t("استعرض أحدث الطلبات المقدمة من شركائنا والمتاحة للتعاون. نهدف إلى تلبية احتياجات عملائنا من خلال توفير فرص متميزة تدعم النمو والابتكار.")}
      />

      {
        !token ? (<Login />) : (
          <Container maxWidth="lg">
            <div style={{ backgroundColor: '#FFFFFF', padding: '30px 10px', borderRadius: '10px' }}>
              <Grid container spacing={2}>
                <Grid className="first-grid" md={8} xs={12}>
                  <RequestsContent requests={filteredRequests} />
                </Grid>
                <Grid className="second-grid" md={4} xs={12}>
                  <Filter1
                    requests={requests}
                    setSelectedTypes={setSelectedTypes}
                    selectedTypes={selectedTypes}
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                    onSearch={handleSearch}
                    onCountryChange={handleCountryChange}
                    onStateChange={handleStateChange}
                  />
                </Grid>
              </Grid>
            </div>
            <Paginations
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalProjects={requests.length}
              projectsPerPage={usersPerPage}
            />
          </Container>
        )
      }

    </div>
  );
}
