import { useSelector } from "react-redux"
import type { RootState } from "../utils/appStore"
import type { User } from "./UserCard";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import Toast from "./Toast";

const Profile = () => {
    const user = useSelector((state: RootState) => state.user) as User | null;
    const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
    const [toastData, setToastData] = useState({ showToast: false, status: "", message: "" })

    return (
        <>
        {!isEditProfile && 
            <div className="flex justify-center mt-5 mb-2">
                <div className="card card-side bg-gray-200 shadow-sm h-150">
                    <figure className="p-2 w-full h-130 object-cover">
                        <img
                            src={user?.profilePhoto}
                            alt="photo" className="rounded-xl " />
                    </figure>
                    <div className="card-body w-5/10">
                        <div className="p-2">
                            <ul>
                                <li className="mb-2">
                                    <label htmlFor="name" className="text-xl font-bold">Name</label>
                                    <input type="text" className="input mt-2 font-medium text-black" value={user?.firstName + " " + user?.lastName} disabled />
                                </li>
                                <li className="mb-2">
                                    <label htmlFor="name" className="text-xl font-bold">Age</label>
                                    <input type="text" className="input mt-2 font-bold" value={user?.age} disabled />
                                </li>
                                <li className="mb-2">
                                    <label htmlFor="name" className="text-xl font-bold">Gender</label>
                                    <input type="text" className="input mt-2 font-bold" value={user?.gender} disabled />
                                </li>
                                <li className="mb-2">
                                    <label htmlFor="name" className="text-xl font-bold">Skills</label>
                                    <input type="text" className="input mt-2 font-bold" value={user?.skills?.join(", ")} disabled />
                                </li>
                                <li className="mb-2">
                                    <label htmlFor="name" className="text-xl font-bold">About</label>
                                    <textarea className="textarea mt-2 font-bold" value={user?.about} disabled />
                                </li>
                            </ul>
                            <div className="flex justify-center mt-10">
                                <button className="btn btn-primary w-2/4" onClick={() => setIsEditProfile(true)}>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}

        {(isEditProfile && user) && <EditProfileForm user={user} setIsEditProfile={setIsEditProfile} setToastData={setToastData} /> }
        <Toast {...toastData} />
        </>
    )
}

export default Profile