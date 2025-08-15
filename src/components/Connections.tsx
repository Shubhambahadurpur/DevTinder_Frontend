import axios from "axios"
import { useEffect, useState } from "react";
import type { User } from "./UserCard";
import { Link } from "react-router";

const Connections = () => {

    const [myConnections, setMyConnections] = useState<User[]>([])

    const getConnections = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/connections`, { withCredentials: true });
            if (res?.data) {
                setMyConnections(res.data?.data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getConnections();
    }, [])

    return (
        <div className="text-center">
            <h1 className="font-bold text-4xl mt-10">My Connections</h1>
            <div className="mt-5 flex flex-col items-center mb-5">
                {myConnections?.length ? myConnections?.map((connection, index) =>
                    <div className="flex bg-gray-300 py-5 w-3/6 mt-5 px-5 rounded-2xl shadow-xl items-center justify-between" key={index}>
                        <div className="flex items-center">
                            <img src={connection?.profilePhoto} alt="photo" className="rounded-full h-28 w-30" />
                            <div className="pl-5 flex flex-col items-start space-y-1.5">
                                <h2 className="font-bold text-2xl text-gray-900">{connection.firstName + " " + connection.lastName}</h2>
                                <h3 className="font-medium text-xl text-gray-900">{connection.age + ", " + connection.gender}</h3>
                                {connection.about && <p className="font-medium text-md text-gray-900">{connection.about}</p>}
                            </div>
                        </div>
                        <button className="btn btn-soft btn-accent">
                            <Link to={`/chat/${connection._id}`}>Chat</Link>
                        </button>
                    </div>
                ) : <div><h1 className="mt-10 font-bold text-4xl text-gray-700">No Connections Available</h1>
                    <button className="btn btn-primary mt-10"><Link to={"/"}>Go to feed page</Link></button>
                </div>}
            </div>
        </div>
    )
}

export default Connections