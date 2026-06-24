import { Bell, Moon, BookOpen } from "lucide-react";
import { useAuth } from "../context/context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosConfig";

const Navbar = () => {
  const Greeting = () => {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour <= 19) {
      return "Good afternoon";
    } else if (hour >= 19 && hour <= 22) {
      return "Good Evening";
    } else {
      return "Good night";
    }
  };
  //ProfileData For the user //TODO: probabilmente non è corretto fetchare sempre (visto che la navbar è presente in tutte le pagine) l intero profilo, ha piu senzo magari salvare avatar e nome nella cache, da cambiare
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

  return (
    <div className="flex flex-row h-12  bg-gray-200 space-x-5 items-center ">
      <div className="w-36 items-center ml-2">
        <Link to="/">
          <BookOpen></BookOpen>
        </Link>
      </div>
      <div className="flex-1 items-center">
        <p className="italic">
          {Greeting()}, {profileData?.display_name}
        </p>
      </div>
      <div className=" flex flex-row space-x-4 mr-4">
        <div className="hover:bg-white rounded-full">
          <Bell />
        </div>
        <div className="hover:bg-white rounded-full">
          <Moon />
        </div>
        <div className="hover:bg-white rounded-full h-6 w-6 flex items-center justify-center overflow-hidden ">
          <img src={profileData.avatar}></img>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
