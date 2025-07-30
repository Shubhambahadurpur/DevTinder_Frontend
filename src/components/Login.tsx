import axios from "axios";
import { useState } from "react";
import validator from 'validator';

interface LoginData {
  email: string,
  password: string
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [errors, setErrors] = useState<string>('')

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
      await axios.post('http://localhost:3000/login', { emailId: loginData.email, password: loginData.password}, { withCredentials: true})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("ERROR while logging in")
    }
  }

  const validateFormData = () => {
    if (!validator.isEmail(loginData.email)) {
      setErrors("Please Enter a valid email id");
    }
    else if (!validator.isStrongPassword(loginData.password)) {
      setErrors("Please Enter a strong password");
    }

    else {
      submitForm();
    }

  }

  return (
    <div className="flex justify-center mt-15">
      <div className="card bg-base-300 w-96 shadow-sm">
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

        <div className="flex justify-center"> New User? <a rel="stylesheet" href="/signup" className="text-blue-500 ml-2"> Sign Up </a> </div>
      </div>
      {/* <div className="toast toast-top toast-end">
  <div className="alert alert-info">
    <span>New mail arrived.</span>
  </div>
  <div className="alert alert-success">
    <span>Message sent successfully.</span>
  </div>
</div> */}
    </div>
  )
}

export default Login