import Cookie from 'cookie-universal';
import { Outlet } from "react-router-dom";


export default function RequireBack() {
    const cookies = Cookie()
    const token = cookies.get('website_token')

    return token ? window.history.back() : <Outlet />
}