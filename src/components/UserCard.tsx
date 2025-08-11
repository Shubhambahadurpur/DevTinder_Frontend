import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";
import Toast from "./Toast";
import { useState } from "react";

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    emailId: string,
    age?: number,
    gender?: string,
    profilePhoto: string,
    about: string,
    skills: string[]
}

interface UserCardProps {
    user: User;
}
const UserCard: React.FC<UserCardProps> = ({user}) => {
    const [toastData, setToastData] = useState({ showToast: false, status: "", message: "" })
    const dispatch = useDispatch();

    const sendRequestHandler = async (status: string) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/request/send/${status}/${user?._id}`, {}, {withCredentials: true})
            if (res.data) {
                dispatch(removeUserFeed(user?._id))
                if (status === 'interested')
                    setToastData({  showToast: true, status: 'success', message: "Connection Request Send Successfully." })
                else {
                    setToastData({  showToast: true, status: "success", message: "Ignored Successfully." })
                }
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={user?.profilePhoto || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt="photo" className="rounded-2xl w-9/10 h-90 mt-4" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
                {(user?.age && user?.gender) &&<p>{user?.age + ", " + user?.gender}</p>}
                <p>{user?.about}</p>
                <div className="card-actions justify-center mt-2">
                    <button className="btn btn-secondary" onClick={() => sendRequestHandler('ignored')} >Ignore</button>
                    <button className="btn btn-accent" onClick={() => sendRequestHandler('interested')} >Send Request</button>
                </div>
            </div>
            <Toast {...toastData} onClose={() => setToastData({ showToast: false, status: "", message: "" })} />
        </div>
    )
}

export default UserCard