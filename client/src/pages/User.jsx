import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar";
import axiosClient from "../api/axiosConfig";
import { useEffect, useState } from "react";

const User = () => {

    const [userData,setUserData] = useState({})
    const [LoadComplete,setLoadComplete] = useState(false)

    const { id } = useParams();



    const fetchUserData = async() => {
        try  {
        const userdataResp = await axiosClient.get("/api/user/external/data/" +id);
        setUserData(userdataResp.data)

        } catch(e) {
            console.log(e.message)
        }
        finally{ 
            setLoadComplete(true)
          
        }
    }


    useEffect(() => {
        fetchUserData();


    },[])

    


    if (LoadComplete) {
    console.log(userData)
    
    return(
        
        <div>
            <Navbar></Navbar>
            <div className="grid grid-cols-5 mt-4 mx-2">
                {/*sezione immagine profilo, username e descrizione*/}
                <div className="flex flex-col col-span-1 items-center justify-center">
                    <div>
                        <img  src= {userData.avatar} className="min-h-32 min-w-32 max-h-32 max-w-32 border-2 border-slate-500 object-cover"></img>
                    </div>
                    <div className="mt-2">
                        <span>
                            {userData.display_name}
                        </span>
                    </div>
                     

                    <div className="mt-3 flex items-center justify-center border-t-2 border-black">
                        <span className="text-gray-600 align-middle p-2 ">{userData.user_description}</span>
                    </div>
                </div>
                {/*sezione statistiche*/}
                <div className="flex flex-col col-span-4 ml-3">
                    <div className="relative bg-slate-400 border border-slate-700 min-w-11/12 min-h-32">
                        <span className="text-sm font-light absolute top-0 left-1/2 ">general info</span>
                        <div>
                            <span>trustiness</span>
                            <div>
                                Trustiness data
                            </div>
                        </div>
                        <div className="border-b min-w-10/12 border-black"></div>
                        <div>
                            percentuali libri letti
                        </div>
                        <div>
                            libri letti
                        </div>

                        <div className="border-b min-w-10/12 border-black"></div>

                        <div>
                            libri in condivisione
                        </div>

                    </div>
                </div>

            </div>
        </div>
        
    ) 
} else {
    return (
        <div> scaricamento dati...</div>
    )
}
}


export default User