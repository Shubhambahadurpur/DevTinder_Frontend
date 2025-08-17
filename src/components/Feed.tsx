import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import type { RootState } from "../utils/appStore";
import UserCard from "./UserCard";
import type { User } from "./UserCard"
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const Feed = () => {

  const feed = useSelector((state: RootState) => state.feed)
  const dispatch = useDispatch();
  
  const getFeed = async () => {
    if (feed?.length) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/feed`, { withCredentials: true});
      if (res?.data) {
        dispatch(addFeed(res?.data?.data))
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getFeed()
  },[])

  return (
    <div className="flex justify-center mt-10">
      {feed.length ?
        <UserCard user={feed[0] as User} /> : <div>
          <CheckCircleIcon className="h-50 w-50 text-green-500 ml-3" />
          <h2 className="font-bold text-3xl text-green-500">You're all catch up</h2>
          </div>}
    </div>
  )
}

export default Feed