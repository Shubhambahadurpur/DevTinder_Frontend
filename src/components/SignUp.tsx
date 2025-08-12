import axios from "axios";
import { useRef, useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router";

const SignUp = () => {

    const [errors, setErrors] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null)
      const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const data = Object.fromEntries(formData.entries());
            if (!data.emailId || !data.firstName || !data.lastName || !data.password) return;
            if (!validator.isEmail(data.emailId.toString())) {
                setErrors("Email is not valid");
                return;
            }
            if (!validator.isStrongPassword(data.password.toString())) {
                setErrors("Password is not valid");
                return;
            }
            try {
                console.log(import.meta.env.VITE_BASE_URL);
              const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, data, { withCredentials: true })
              if (res.data) {
                navigate('/login')
              }
            } catch (err: any) {
              setErrors(err?.response?.data)
              console.error("ERROR while logging in", err)
            }
        }
        else return;
    }

    return (
        <div className="flex justify-center mt-10">
            <form ref={formRef} onSubmit={handleSubmit} >
                <div className="card bg-gray-300 w-96 shadow-sm z-0">
                    <h2 className="card-title text-2xl flex justify-center mt-4">SignUp</h2>
                    <div className="card-body">

                        <label htmlFor="firstName" className="font-medium text-lg">First Name:</label>
                        <input type="text" className="input" name="firstName" placeholder="Enter your first name" required />

                        <label htmlFor="lastName" className="font-medium text-lg">Last Name:</label>
                        <input type="text" className="input" name="lastName" placeholder="Enter your last name" required />

                        <label htmlFor="age" className="font-medium text-lg">Age:</label>
                        <input type="number" className="input" name="age" placeholder="Enter your Age" min={18} max={60} required />

                        <label htmlFor="emailId" className="font-medium text-lg">Email:</label>
                        <input type="email" className="input" name="emailId" placeholder="Enter email" required />

                        <label htmlFor="password" className="font-medium text-lg">Password:</label>
                        <input type="password" name="password" className="input" placeholder="Enter password" required />


                        {errors && <div className="text-red-500 mt-1">{errors}</div>}

                        <button className="btn btn-accent mt-5" type="submit">Signup</button>
                        <div className="flex justify-center mb-5 mt-2"> Already a User? <a rel="stylesheet" href="/login" className="text-blue-500 ml-2"> Login </a> </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp