import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import validator from 'validator';
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

interface LoginData {
  email: string,
  password: string
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [errors, setErrors] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEmail = (value: string) => {
    if (value.trim() === '') {
      setLoginData((prev) => ({ ...prev, email: '' }));
      return
    }
    else {
      setLoginData((prev) => ({ ...prev, email: value.trim() }));
    }
  }

  const changePassword = (value: string) => {
    if (value.trim() === '') {
      setLoginData((prev) => ({ ...prev, password: '' }));
      return
    }
    else {
      setLoginData((prev) => ({ ...prev, password: value.trim() }));
    }
  }

  const submitForm = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, { emailId: loginData.email, password: loginData.password }, { withCredentials: true })
      if (res.data) {
        dispatch(addUser(res.data));
        navigate('/')
      }
    } catch (err: any) {
      setErrors(err?.response?.data)
      console.error("ERROR while logging in", err)
    }
  }

  const validateFormData = () => {
    if (!validator.isEmail(loginData.email)) {
      setErrors("Please Enter a valid email id");
    }
    else {
      submitForm();
    }

  }

  return (
    <div className="flex justify-center mt-15">
      <div className="card bg-gray-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl flex justify-center">Login</h2>
          <label htmlFor="email" className="font-medium text-xl">Email</label>
          <input type="text" id='email' value={loginData.email} onChange={(e) => changeEmail(e.target.value)} className="input" placeholder="Enter your Email id" />

          <label htmlFor="password" className="font-medium text-xl mt-2">Password</label>
          <input type="password" id='password' value={loginData.password} onChange={(e) => changePassword(e.target.value)} className="input" placeholder="Enter your Password" />
          {errors && <div className="text-red-500">{errors}</div>}
        </div>


        <div className="card-actions justify-center mb-5">
          <button className="btn btn-accent" onClick={validateFormData}>Login</button>
        </div>

        <div className="flex justify-center mb-5"> New User? <a rel="stylesheet" href="/signup" className="text-blue-500 ml-2"> Sign Up </a> </div>
      </div>
    </div>
  )
}

export default Login