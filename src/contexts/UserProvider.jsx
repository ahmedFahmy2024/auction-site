import { createContext, useContext, useState, useEffect } from "react";
import { Axios } from "../api/Axios";
import { PROFILE } from "../api/Api";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const userContext = createContext();

const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState([]);
    const [subscription, setSubscription] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState([]);
    const [requests, setRequests] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [ scraps, setScraps] = useState([]);
    const [messages, setMessagses] = useState([]);
    const [complains, setComplains] = useState([]);
    const [transcations, setTranscations] = useState([]);
    const [bids, setBids] = useState([]);
    const [supplierRegistrations, setSupplierRegistrations] = useState([]);
    const [digitalTransformation, setDigitalTransformation] = useState([]);
    const [runUseEffect, setRunUseEffect] = useState(1);


    // get all user info
    useEffect(() => {
        const fetchUser = async () => {

            setLoading(true);
            try {
                const response = await Axios.get(`${PROFILE}`,)
                console.log(response.data);
                // ======================== set user ========================
                setUser(response.data.user);

                // ======================== set current subscription ========================
                setCurrentSubscription(response.data.current_subscription);

                // ======================== set requests ========================
                setRequests(response.data.requests);

                // ======================== set portfolio ========================
                setPortfolio(response.data.portfolios);

                // ======================== set scraps ========================
                setScraps(response.data.scraps);

                // ======================== set messages ========================
                setMessagses(response.data.chat_rooms);

                // ======================== set complains ========================
                setComplains(response.data.complaints);

                // ======================== set transcations ========================
                setTranscations(response.data.transactions);

                // ======================== set subscription ========================
                setSubscription(response.data.subscriptions);

                // ======================== set bids ========================
                setBids(response.data.user_bids);

                // ======================== set supplier registrations ========================
                setSupplierRegistrations(response.data.supplier_registrations);

                // ======================== set digital transformation ========================
                setDigitalTransformation(response.data.digital_transformations);

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        fetchUser();

    }, [runUseEffect])
    // get all user info

    // ======================= loading ========================
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

    return (
        <userContext.Provider value={{user, digitalTransformation, supplierRegistrations, subscription, currentSubscription, requests, portfolio, scraps, messages, complains, transcations, bids, setRunUseEffect}}>
            {children}
        </userContext.Provider>
    )
}

export { userContext, UserProvider }

// custom hook 
export const useUser = () => {
    return useContext(userContext);
}