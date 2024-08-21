import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LocalContext } from "./contexts/LocalContext";
import { Suspense, useState } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastProvider } from './contexts/ToastProvider';
import AuthProvider from './contexts/AuthProvider.jsx';
import { UserProvider } from './contexts/UserProvider.jsx';
import 'swiper/css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Projects from './pages/Projects.jsx';
import Suppliers from './pages/Suppliers.jsx';
import CorporateContractor from './pages/CorporateContractor.jsx';
import IndividualContractor from './pages/IndividualContractor.jsx';
import EngineeringOffice from './pages/EngineeringOffice.jsx';
import Header1 from './components/Header1';
import Header2 from './components/Header2';
import Footer from './components/Footer';
import PersonPage from './pages/PersonPage.jsx';
import BrowseScrap from './pages/BrowseScrap.jsx';
import ScrapDetails from './pages/ScrapDetails.jsx';
import Register from './pages/Register.jsx';
import Package from './pages/Package.jsx';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';
import Password from './pages/Password.jsx';
import Packages from './pages/Packages.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import NotificationsTable from './pages/NotificationsTable.jsx';
import RegisteredAuctions from './pages/RegisteredAuctions.jsx';
import PrevProjects from './pages/PrevProjects.jsx';
import PriceRequest from './pages/PriceRequest.jsx';
import SupplierForm from './pages/SupplierForm.jsx';
import AddPriceRequest from './pages/AddPriceRequest.jsx';
import Requests from './pages/Requests.jsx';
import RequestDetails from './pages/RequestDetails.jsx';
import AddScrab from './pages/AddScrab.jsx';
import EditPriceRequest from './pages/EditPriceRequest.jsx';
import PrevProjectsNew from './pages/PrevProjectsNew.jsx';
import LiveChat from './pages/LiveChat.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Err404 from './pages/Err404.jsx';
import RequireAuth from './auth/RequireAuth.js';
import RequireBack from './auth/RequireBack.js';
import PrevProjectsEdit from './pages/PrevProjectsEdit.jsx';
import EditScrap from './pages/EditScrap.jsx';
import Bids from './pages/Bids.jsx';
import Complaint from './pages/Complaint.jsx';
import Transcation from './pages/Transcation.jsx';
import ComplaintNew from './pages/ComplaintNew.jsx';
import ComplaintEdit from './pages/ComplaintEdit.jsx';
import FavouriteContractors from './pages/FavouriteContractors.jsx';
import FavoriteProvider from './contexts/FavouriteProvider.jsx';
import UserRequest from './pages/UserRequest.jsx';
import SupplierRegistration from './pages/SupplierRegistration.jsx';
import SupplierRegistrationEdit from './pages/SupplierRegistrationEdit.jsx';
import SupplierRegistrationAdd from './pages/SupplierRegistrationAdd.jsx';
import DigitalTransformation from './pages/DigitalTransformation.jsx';
import DigitalTransformationAdd from './pages/DigitalTransformationAdd.jsx';
import DigitalTransformationEdit from './pages/DigitalTransformationEdit.jsx';

// direction right and left
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const ltrCache = createCache({
  key: 'mui',
});

function App() {
  const [locale, setLocale] = useState("ar");
  const [theme, colorMode] = useMode();
  const location = useLocation();

  return (
    <CacheProvider value={locale === "ar" ? rtlCache : ltrCache}>
      <LocalContext.Provider value={{ locale, setLocale }}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <AuthProvider>
              <UserProvider>
                <FavoriteProvider>
                  <CssBaseline />
                  <Header1 />
                  <Header2 />
                  <Suspense fallback={<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open > <CircularProgress color="inherit" /> </Backdrop>}>
                    <Routes>
                      {/* public routes */}
                      <Route element={<RequireBack />}>
                        <Route path="login" element={<Login />} />
                        <Route path="forgot" element={<ForgotPassword />} />
                        <Route path="change" element={<ChangePassword />} />
                        <Route path="register" element={<Register />} />
                      </Route>
                      <Route path="package" element={<Package />} />
                      <Route path="/*" element={<Err404 />} />

                      <Route path="/" element={<Home />} />
                      <Route path="aboutUs" element={<AboutUs />} />
                      <Route path="projects" element={<Projects />} />
                      <Route path="requests" element={<Requests />} />
                      <Route path="suppliers" element={<Suppliers />} />
                      <Route path="corporateContractor" element={<CorporateContractor />} />
                      <Route path="individualContractor" element={<IndividualContractor />} />
                      <Route path="engineeringOffice" element={<EngineeringOffice />} />
                      <Route path="browesScrap" element={<BrowseScrap />} />
                      <Route path="favourite" element={<FavouriteContractors />} />

                      {/* protected routes */}
                      <Route element={<RequireAuth />}>
                      <Route path="project/:id" element={<ProjectDetail />} />
                      <Route path="request/:id" element={<RequestDetails />} />
                      <Route path="contractor/:id" element={<PersonPage />} />
                      <Route path="browesScrap/:id" element={<ScrapDetails />} />

                        <Route path="settings/:id" element={<Settings />} >
                          <Route index element={<Profile />} />
                          {/* <Route path="basicdata" element={<Profile />} /> */}
                          <Route path="password" element={<Password />} />
                          <Route path="packages" element={<Packages />} />

                          <Route path="priceRequest" element={<PriceRequest />} />
                          <Route path="priceRequest/add" element={<AddPriceRequest />} />
                          <Route path="priceRequest/:priceRequestId/view" element={<SupplierForm />} />
                          <Route path="priceRequest/:priceRequestId/edit" element={<EditPriceRequest />} />

                          <Route path="prevProjects" element={<PrevProjects />} />
                          <Route path="prevProjects/add" element={<PrevProjectsNew />} />
                          <Route path="prevProjects/:prevProjectsId/edit" element={<PrevProjectsEdit />} />

                          {/* <Route path="notificationsTable" element={<NotificationsTable />} /> */}
                          <Route path="Chat" element={<LiveChat />} />

                          <Route path="registeredAuctions" element={<RegisteredAuctions />} />
                          <Route path="registeredAuctions/addscrab" element={<AddScrab />} />
                          <Route path="registeredAuctions/:registeredAuctionsId/edit" element={<EditScrap />} />

                          <Route path="complaint" element={<Complaint />} />
                          <Route path="complaint/add" element={<ComplaintNew />} />
                          <Route path="complaint/:complaintId/edit" element={<ComplaintEdit />} />

                          <Route path="supplierRegistration" element={<SupplierRegistration />} />
                          <Route path="supplierRegistration/add" element={<SupplierRegistrationAdd />} />
                          <Route path="supplierRegistration/:supplierRegistrationId/edit" element={<SupplierRegistrationEdit />} />

                          <Route path="digitalTransformation" element={<DigitalTransformation />} />
                          <Route path="digitalTransformation/add" element={<DigitalTransformationAdd />} />
                          <Route path="digitalTransformation/:digitalTransformationId/edit" element={<DigitalTransformationEdit />} />

                          <Route path="transcation" element={<Transcation />} />
                          <Route path="bids" element={<Bids />} />
                          <Route path="userRequest" element={<UserRequest />} />
                        </Route>

                      </Route>

                    </Routes>
                  </Suspense>
                  <Footer />
                </FavoriteProvider>
              </UserProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </LocalContext.Provider>
    </CacheProvider>
  );
}

export default App;
