import { Link } from "react-router-dom"
import { Map, House, Compass, Cog, User } from "lucide-react"

const Sidebar = () => {
    return (
        <div className="w-36 h-screen bg-gray-100 flex flex-col space-y-5 border-2 border-gray-300 rounded">
            <div className="flex flex-row space-x-3 mt-5 ml-4 hover:bg-slate-400 rounded-2xl">
                <House />
                <Link to={"/"}>Home</Link>
            </div>
            <div className="flex flex-row space-x-3  hover:bg-slate-400  ml-4 rounded-2xl">
                <Map />
                <Link to={"/map"}>Map</Link>
            </div>
            <div className="flex flex-row space-x-3  hover:bg-slate-400  ml-4 rounded-2xl">
                <Compass />
                <Link to={"/requests"}>Requests</Link>
            </div>
            <div className="flex flex-row space-x-3  hover:bg-slate-400  ml-4 rounded-2xl">
                <Cog />
                <Link to={"/"}>Settings</Link>
            </div>
            <div className="flex flex-row space-x-3 mb-4 hover:bg-slate-400  ml-4 rounded-2xl">
                <User />
                <Link to={"/"}>Profile</Link>
            </div>

        </div>
    )
}

export default Sidebar