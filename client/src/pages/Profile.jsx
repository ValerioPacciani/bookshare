import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Trash2,
  SquarePen,
  Forward,
  CornerDownLeft,
  BookDashed,
  BookHeart,
} from "lucide-react";
import axiosClient from "../api/axiosConfig";
import GenericDataCard from "../components/GenericDataCard";

function DataHolder (data){
  return (
    <div className="min-h-32 w-full bg-blue-400">
      Data
    </div>
  )
}

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  async function fetchUserData() {
    try {
      const resp = await axiosClient.get("/api/user/data");
      //console.log(resp.data);
      setProfileData(resp.data);
    } catch (e) {
      console.log("errore nel fetch dei dati dell user: ", e.message);
    }
  }

  useEffect(() => {
    fetchUserData();
   
  }, []);

  console.log(profileData);
  console.log(profileData.avatar);

  return (
    <div>
      <Navbar></Navbar>
    <div className="h-screen bg-amber-300 max-w-7xl mx-auto p-6 flex flex-col items-center">
      <div className="w-48 h-48 bg-amber-500">
        profile picture
      </div>
        <div className="mt-4 w-full h-16 bg-gray-500">
          badges
        </div>
        <DataHolder>
          
        </DataHolder>
    </div>
    </div> 

    
  )
}
export default Profile;
