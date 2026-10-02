import { useState } from "react"
import Navbar from "../components/Navbar"
import axiosClient from "../api/axiosConfig"



const Settings = () => {

//ipostazioni profilo
const [isCheckedBio,setIsCheckedBio] = useState(false) //da cambiare con i valori di verita provienti dal database
const [isCheckedBooks,setIsCheckedBooks] = useState(false)
const [isCheckedLoans,setIsCheckedLoans] = useState(false)
const [isCheckedExternalLinks,setIsCheckedExternalLinks] = useState(false)


const handleCheckboxChangeBio = (e) => {
    setIsCheckedBio(e.target.checked)
}
const handleCheckboxChangeBooks = (e) => {
    setIsCheckedBooks(e.target.checked)
}
const handleCheckboxChangeLoans = (e) => {
    setIsCheckedLoans(e.target.checked)
}
const handleCheckboxChangeExternalLinks = (e) => {
    setIsCheckedExternalLinks(e.target.checked)
}

//salvo i dati delle preferenze e le mando al db
const HandleSavePreferences = async() => {
    const prefMap = {
        bio: isCheckedBio,
        loans : isCheckedLoans,
        books : isCheckedBooks,
        external_links : isCheckedExternalLinks
    };
        try {
            // Mandi la mappa al database con Axios
            await axiosClient.put('/api/user/profile_visibility', prefMap);
            console.log("Preferenze salvate con successo!");
            } catch (error) {
                console.error("Errore nel salvataggio", error);
    }
  };



return (
    <div className="">
          <Navbar></Navbar>
        <div className="grid grid-cols-5">
        
        
        <div class=" flex flex-col rounded-2xl border-2 border-gray-500 col-span-3 mt-12 col-start-2">
            <div>
                <p className="text-2xl p-3 mr-2 font-bold">
                  Profile Settings
                </p>
            </div>


            <div className="flex flex-row items-center justify-around mb-6">
                    <div className="w-62  ">
                <p className="text-gray-600 text-xl">
                    Here you can change the visibility of the data on your profile
                </p>
                    </div>
                    <div className="flex-col flex min-w-62">
                        <div className="flex-row flex items-center p-3 m-1">
                            <input
                                type="checkbox"
                                checked = {isCheckedBio}
                                onChange={handleCheckboxChangeBio}
                                className="w-5 h-5">

                            </input>
                                <span className="p-2">
                                    Allow bio data
                                </span>
                        </div>
                        <div className="flex-row flex items-center p-3 m-1">
                            <input
                                type="checkbox"
                                checked = {isCheckedLoans}
                                onChange={handleCheckboxChangeLoans}
                                className="w-5 h-5">

                            </input>
                                <span className="p-2">
                                    Allow loans statistics
                                </span>
                        </div>

                        <div className="flex-row flex items-center p-3 m-1">
                            <input
                                type="checkbox"
                                checked = {isCheckedBooks}
                                onChange={handleCheckboxChangeBooks}
                                className="w-5 h-5">

                            </input>
                                <span className="p-2">
                                    Allow books statistics
                                </span>
                        </div>

                        <div className="flex-row flex items-center p-3 m-1">
                            <input
                                type="checkbox"
                                checked = {isCheckedExternalLinks}
                                onChange={handleCheckboxChangeExternalLinks}
                                className="w-5 h-5">

                            </input>
                                <span className="p-2">
                                    Allow external links
                                </span>
                        </div>

                        <div className="pl-2 mt-4">
                            <button className="flex felx-row items-center justify-center w-20 h-8 p-3 m-1 bg-gray-300 hover:bg-gray-100 rounded-2xl border border-gray-800 hover:border-gray-400"
                                onClick= {HandleSavePreferences}>
                                <p>Update </p>
                            </button>
                        </div>


                    </div>

            

                </div>

            

            </div>
        </div>
    </div>
) 



}


export default Settings