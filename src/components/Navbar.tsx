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
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true});
      dispatch(removeUser());
      return navigate('/login')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm m-1">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevTinder</a>
        </div>
        <div className="flex gap-2">
          {user && 
          <div className="dropdown dropdown-end mr-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={(user as { profilePhoto: string})?.profilePhoto} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to='/profile' className="justify-between"> Profile </Link>
              </li>
              <li onClick={logoutUser}><a>Logout</a></li>
            </ul>
          </div>}
        </div>
      </div>
  )
}

export default Navbar;