import { Outlet, useNavigate } from "react-router"
import Navbar from "./Navbar"
import axios from "axios"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import type { RootState } from "../utils/appStore"
import Toast from "./Toast"


const Body = () => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const fetchUser = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:3000/profile/view', { withCredentials: true});
            if (res?.data) {
                dispatch(addUser(res?.data))
            }
        } catch (err : any) {
            if (err?.status == 401) {
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