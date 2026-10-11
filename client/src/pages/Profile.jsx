import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import axiosClient from "../api/axiosConfig";
import GenericDataCard from "../components/GenericDataCard";

function DataHolder ({data, description}) {
  return (
    <div className="flex flex-col items-center h-32 w-full border rounded-2xl border-gray-600  bg-pink-100">
      <div className="mt-2 p-1 font-bold text-slate-600">
        <span>{description}</span>
      </div>
      <div className="mt-2 p-1 font-extrabold text-3xl text-slate-800">
        <span>{data}</span>
      </div>
    </div>
  )
}

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  async function fetchUserData() {
    try {
      const resp = await axiosClient.get("/api/user/data");
      console.log(resp.data);
      setProfileData(resp.data);

    } catch (e) {
      console.log("errore nel fetch dei dati dell user: ", e.message);
    }
  }

  useEffect(() => {
    fetchUserData();
   
  }, []);

  //console.log(profileData);
  //console.log(profileData.avatar);

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-12 h-screen bg-slate-200 max-w-7xl mx-auto p-6 flex flex-col items-center rounded-2xl border border-gray-800">
        <div className="m-4 w-48 h-48 bg-amber-500 rounded-2xl border border-gray-600">
          <img src = {profileData?.avatar}>
          </img>
        </div>
        <div className="mt-4 w-full h-16">
          badges
        </div>
        <div className="grid grid-cols-4  gap-4 w-full">
          <DataHolder data = {profileData?.loans_recieved ?? "dati mancanti"} description = "Richieste ricevute:">
          </DataHolder>

          <DataHolder data = {profileData?.loans_recieved_completed ?? "dati mancanti"} description = "Richieste ricevute e accettate:"> 
          
          </DataHolder>

          <DataHolder data = {profileData?.loans_sended ?? "dati mancanti"} description = "Richieste mandate:">
          
          </DataHolder>

          <DataHolder data = {profileData?.loans_sended_completed ?? "dati mancanti"} description = "Richieste mandate e confermate:">
          
          </DataHolder>

        </div>
        
    </div>
    </div> 

    
  )
}
export default Profile;
