import { XMarkIcon } from '@heroicons/react/24/solid'
import type { User } from './UserCard'
import { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

interface ToastData {
    showToast: boolean;
    status: string;
    message: string;
}

interface EditProfileFormProps {
    user: User,
    setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
    setToastData: React.Dispatch<React.SetStateAction<ToastData>>;
}

interface EditFormDataType {
    profilePhoto: string,
    age: number | undefined,
    skills: string,
    about: string
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, setIsEditProfile, setToastData }) => {

    const [editFormData, setEditFormData] = useState<EditFormDataType>({ profilePhoto: user.profilePhoto, age: user.age, skills: user.skills.join(','), about: user.about });
    const [errors, setErrors] = useState<string>('');
    const dispatch = useDispatch();

    const updateProfile = async () => {
        if (!validator.isURL(editFormData.profilePhoto)) {
            setErrors("Enter a valid Url");
            return;
        } else if (editFormData.age && editFormData.age < 18) {
            setErrors("Age must be greater than or equal to 18");
            return;
        }

        try {
            const res = await axios.patch("http://localhost:3000/profile/edit", { profilePhotoo: editFormData.profilePhoto, age: editFormData.age, skills: editFormData.skills.split(','), about: editFormData.about }, { withCredentials: true });
            if (res?.data?.data) {
                dispatch(addUser(res?.data?.data));
                setToastData({ showToast: true, status: 'success', message: "Profile Updated Successfully." })
                setIsEditProfile(false);
            }

        } catch (err) {
            setToastData({ showToast: true, status: 'error', message: err?.response?.data || "Something went wrong." })
            setIsEditProfile(false);
        }

    }

    return (
        <div className="flex justify-center mt-15 ">
            <fieldset className="fieldset bg-gray-300 border-base-300 rounded-box w-xl border p-4">

                <div className="flex justify-between">
                    <h2 className='text-2xl font-bold text-black'>Edit Profile</h2>
                    <XMarkIcon className='w-5 h-5 cursor-pointer' onClick={() => setIsEditProfile(false)} />
                </div>

                <label className="label font-medium text-gray-800 text-lg">Profile Photo</label>
                <input type="text" className="input w-full" value={editFormData.profilePhoto} onChange={(e) => setEditFormData((prev) => ({ ...prev, profilePhoto: e.target.value }))} placeholder="Enter Profile Photo Url" />

                <label className="label font-medium text-gray-800 text-lg">Age</label>
                <input type="number" className="input w-full" value={editFormData.age} min={18} onChange={(e) => setEditFormData((prev) => ({ ...prev, age: Number(e.target.value) }))} placeholder="Enter Age" />

                <label className="label font-medium text-gray-800 text-lg">Skills</label>
                <input type="text" className="input w-full" value={editFormData.skills} onChange={(e) => setEditFormData((prev) => ({ ...prev, skills: e.target.value }))} placeholder="Skills" />
                <p className='text-blue-500'>Enter Skills seperated by comma ( , )</p>

                <label className="label font-medium text-gray-800 text-lg">About</label>
                <textarea className="textarea w-full" value={editFormData.about} onChange={(e) => setEditFormData((prev) => ({ ...prev, about: e.target.value }))} placeholder="Add About yourself" />

                <div className='mt-2 flex justify-center'>
                    <p className='text-red-600'>{errors}</p>
                </div>


                <div className='flex justify-center'>
                    <button className="btn btn-accent mt-4" onClick={updateProfile} >Update</button>
                    <button className="btn btn-secondary mt-4 ml-2" onClick={() => setIsEditProfile(false)}>Cancel</button>
                </div>
            </fieldset>
        </div>
    )
}

export default EditProfileForm