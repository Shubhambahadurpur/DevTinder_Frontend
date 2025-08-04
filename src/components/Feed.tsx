import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import type { RootState } from "../utils/appStore";
import UserCard from "./UserCard";
import type { User } from "./UserCard"

const Feed = () => {

  const feed = useSelector((state: RootState) => state.feed)
  const dispatch = useDispatch();
  
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("http://localhost:3000/user/feed", { withCredentials: true});
      if (res?.data) {
        dispatch(addFeed(res?.data?.data))
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getFeed()
  },[])

  return (
    <div className="flex justify-center mt-10">
      {feed &&
        <UserCard user={feed[0] as User} />}
    </div>
  )
}

export default Feed