import { Link } from "react-router"

const NotFound = () => {
    return (
        <div className="text-center">

            <div className="mt-5 flex flex-col items-center">
                <div><h1 className="mt-10 font-bold text-4xl text-red-500">Page not found</h1>
                    <button className="btn btn-primary mt-10"><Link to={"/"}>Go to feed page</Link></button>
                </div>
            </div>
        </div>
    )
}

export default NotFound