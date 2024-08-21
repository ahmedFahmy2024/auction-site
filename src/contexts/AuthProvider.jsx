import { createContext, useState, useContext, useEffect } from "react";
import Cookie from 'cookie-universal';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const cookies = Cookie();

useEffect(() => {
    // Check if the access token is stored in cookies
    const accessToken = cookies.get('website_token');
    if (accessToken) {
        setIsLoggedIn(true);
    }
}, []);

    const login = (token) => {
        setIsLoggedIn(true);
        cookies.set('website_token', token);
    }

    const logout = () => {
        setIsLoggedIn(false);
        cookies.remove('website_token');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

// custom hook 
export const useAuth = () => {
    return useContext(AuthContext);
}