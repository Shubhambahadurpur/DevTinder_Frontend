import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/appStore";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate('/login')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="navbar bg-gray-800 shadow-sm m-1 sticky top-1">
      <div className="flex-1">
        <a className="btn btn-ghost font-bold text-3xl text-white">DevTinder</a>
      </div>
      <div className="flex gap-2">
        {user &&
          <div className="dropdown dropdown-end mr-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={(user as { profilePhoto: string })?.profilePhoto} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1000 mt-3 w-52 shadow">
              <li> <Link to='/profile' className="justify-between h-10 p-3 font-medium"> Profile </Link> </li>
              <li> <Link to='/connections' className="justify-between h-10 p-3 font-medium"> Connections </Link> </li>
              <li> <Link to='/connection-requests' className="justify-between h-10 p-3 font-medium"> Connection requests </Link> </li>
              <li onClick={logoutUser}><a className="justify-between h-10 p-3 font-medium">Logout</a></li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar;