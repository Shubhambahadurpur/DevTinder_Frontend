import { Outlet, useNavigate } from "react-router"
import Navbar from "./Navbar"
import axios from "axios"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import type { RootState } from "../utils/appStore"
import { useLocation } from 'react-router'


const Body = () => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()

    const fetchUser = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`, { withCredentials: true});
            if (res?.data) {
                dispatch(addUser(res?.data))
            }
        } catch (err : any) {
            if (err?.status == 401 && location.pathname !== '/signup') {
                navigate('/login')
            }
            console.error(err)
        }
    },[])

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    },[fetchUser, user])

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Body