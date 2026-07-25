import { Link } from "react-router-dom"
import { Map, House, Compass, Cog, User, ArrowLeftToLine } from "lucide-react"
import { useState } from "react"

const Sidebar = () => {

    const [collapse,setCollapse] = useState(false)

   
    return (
         collapse ? (
            <div className="group max-h-20">
             <div  onClick={() => setCollapse(false)} className = "group-hover:h-24 cursor-pointer relative w-6 h-20 bg-slate-800 ml-2 shadow-2xl transition-[height] duration-500 ease-in-out">
                <div className=" absolute bottom-0 w-0 h-0 border-style-solid border-l-12 border-l-transparent
                border-r-12 border-r-transparent border-b-12 border-b-pink-100">
                </div>
                </div>
            </div>
       
         ) : (
             <div className="w-36 gro h-screen bg-[rgb(188,171,121)] flex flex-col space-y-5 border-4 border-pink-100 rounded-xl">
            <div>
            <button  onClick={() => setCollapse (true)} className=" flex items-center justify-center gap-2 text-md cursor-pointer mt-3 p-1 px-3 bg-pink-100 text-black rounded-md ml-2"> <ArrowLeftToLine/>collapse</button>
            </div>
            <div className="flex flex-row space-x-3 mt-5 ml-4 p-1 hover:bg-pink-100  rounded-l-2xl">
                <House />
                <Link to={"/"}>Home</Link>
            </div>
            <div className="flex flex-row space-x-3 p-1  hover:bg-pink-100  ml-4 rounded-l-2xl">
                <Map />
                <Link to={"/map"}>Map</Link>
            </div>
            <div className="flex flex-row space-x-3 p-1 hover:bg-pink-100  ml-4 rounded-l-2xl">
                <Compass />
                <Link to={"/requests"}>Requests</Link>
            </div>
            <div className="flex flex-row space-x-3 p-1 hover:bg-pink-100  ml-4 rounded-l-2xl">
                <Cog />
                <Link to={"/"}>Settings</Link>
            </div>
            <div className="flex flex-row space-x-3 mb-4 p-1 hover:bg-pink-100  ml-4 rounded-l-2xl">
                <User />
                <Link to={"/profile"}>Profile</Link>
            </div>

        </div>
        
         )
    )
}

export default Sidebar