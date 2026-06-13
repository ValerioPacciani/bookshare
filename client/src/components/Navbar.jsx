import { Bell, Moon } from "lucide-react"
import { useAuth } from "../context/context"



const Navbar = () => {

    const Greeting = () => {
        const hour = new Date().getHours()
        if (hour >= 7 && hour < 12) {
            return "Good morning";
        } else if (hour <= 12 && hour >= 19) {
            return "Good afternoon";
        } else if (hour < 19 && hour >= 22) {
            return "Good Evening";
        } else {
            return "Good night";
        }
    }

    const { user } = useAuth()
    //console.log(localStorage.getItem("user"))
    //console.log('user dal context:', user)



    return (
        <div className="flex flex-row h-12  bg-gray-200 space-x-5 items-center ">
            <div className="w-36 items-center ml-2">
                libreria
            </div>
            <div className="flex-1 items-center"  >
                <p className="italic">{Greeting()}, {user?.name}</p>
            </div>
            <div className=" flex flex-row space-x-4 mr-4">
                <div className="hover:bg-white rounded-full">
                    <Bell />
                </div>
                <div className="hover:bg-white rounded-full">
                    <Moon />
                </div>
                <div className="hover:bg-white rounded-full h-6 w-6">

                </div>

            </div>
        </div>
    )
}

export default Navbar