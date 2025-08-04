import axios from "axios"
import { useEffect, useState } from "react";
import type { User } from "./UserCard";
import { Link, useNavigate } from "react-router";
import Toast from "./Toast";

interface ConnectionRequest {
    _id: string;
    fromUserId: User;
    toUserId: string;
    status: string;
}

const ALLOWED_STATUS = ["accepted", "rejected"];

const ConnectionRequests = () => {

    const [myConnectionRequests, setMyConnectionRequests] = useState<ConnectionRequest[]>([]);
    const [toastData, setToastData] = useState({ showToast: false, status: "", message: "" })
    const navigate = useNavigate();

    const getConnectionRequests = async () => {
        try {
            const res = await axios.get('http://localhost:3000/user/requests/received', { withCredentials: true });
            if (res?.data) {
                setMyConnectionRequests(res.data?.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const updateRequestStatus = async (request: ConnectionRequest, status: string) => {
        try {
            if (!ALLOWED_STATUS.includes(status)) {
                setToastData({ showToast: true, status: "warning", message: "Invalid Status" })
                return;
            }
            const res = await axios.post(`http://localhost:3000/request/review/${status}/${request._id}`, {}, { withCredentials: true });
            if (res.data) {
                setToastData({ showToast: true, status: "success", message: `Request ${status} successfully.` });
                navigate(0);
            }
        } catch (err: any) {
            setToastData({ showToast: true, status: "error", message: err?.response?.data || "Something went wrong" })
        }
    }

    useEffect(() => {
        getConnectionRequests();
    }, [])

    return (
        <div className="text-center">
            <h1 className="font-bold text-4xl mt-10">My Connection Requests</h1>
            <div className="mt-5 flex flex-col items-center">
                {myConnectionRequests?.length ? myConnectionRequests?.map((connectionRequest, index) =>
                    <div className="flex flex-wrap sm:flex-nowrap bg-gray-300 py-5 w-full sm:w-2/6 mt-5 px-5 rounded-2xl shadow-xl" key={index}>
                        <img src={connectionRequest?.fromUserId?.profilePhoto} alt="photo" className="rounded-xl h-30" />
                        <div className="pl-5 flex flex-col items-start space-y-1.5">
                            <h2 className="font-bold text-2xl text-gray-900">{connectionRequest.fromUserId.firstName + " " + connectionRequest.fromUserId.lastName}</h2>
                            <h3 className="font-medium text-xl text-gray-900">{connectionRequest.fromUserId.age + ", " + connectionRequest.fromUserId.gender}</h3>
                            {connectionRequest.fromUserId.about && <p className="font-medium text-md text-gray-900">{connectionRequest.fromUserId.about}</p>}
                        </div>
                        <div className="flex sm:flex-col gap-2 mt-3 sm:mt-0 ml-0 sm:ml-5 w-full sm:w-auto">
                            <button className="btn btn-accent mt-2" onClick={() => updateRequestStatus(connectionRequest, "accepted")}>Accept</button>
                            <button className="btn btn-secondary mt-2" onClick={() => updateRequestStatus(connectionRequest, "rejected")}>Reject</button>
                        </div>
                    </div>
                ) : <div><h1 className="mt-10 font-bold text-4xl text-gray-700">No Connections Available</h1>
                    <button className="btn btn-primary mt-10"><Link to={"/feed"}>Go to feed page</Link></button>
                </div>}
            </div>

            <Toast {...toastData} onClose={() => setToastData({ showToast: false, status: "", message: "" })} />
        </div>
    )
}

export default ConnectionRequests
