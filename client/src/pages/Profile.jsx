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

  //console.log(profileData);
  //console.log(profileData.avatar);

  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-slate-50 grid grid-cols-4">
        {/* Avatar and Description*/}

        <div className="p-4 pt-6 m-4  min-h-96 col-span-1 flex flex-col items-center bg-slate-200 border-gray-500 border rounded-lg">
          <div className="bg-white lg:w-46 lg:h-46 md:w-32 md:h-32  h-32  sm:w-22 sm:h-22 min-w-14 min-h-14 border-black border-2 rounded-full overflow-hidden flex items-center justify-center">
            <img className="w-full h-full" src={profileData.avatar}></img>
          </div>
          <div className="flex flex-row mt-2 gap-1">
            <button className=" flex items-center p-1 h-8  bg-cyan-300 border border-cyan-800 rounded-lg text-cyan-700 font-light">
              <SquarePen />
              Update
            </button>
            <button className="h-8 p-1 bg-red-400 border-red-700 border rounded-lg text-red-700 font-light flex items-center">
              <Trash2 />
              Delete
            </button>
          </div>

          <div className="flex flex-col mt-2">
            <div className="text-2xl font-bold">
              <h3> {profileData.display_name} </h3>
            </div>
            <div className="border border-slate-600 p-3 mt-2 rounded-xl">
              <p>{profileData.user_description}</p>
            </div>
          </div>
        </div>

        <div className=" bg-slate-100 p-4 mt-6 flex flex-col pr-4  col-span-3 border-gray-600 border rounded-xl mr-4">
          <div className="flex flex-col gap-3 p-5 bg-slate-200 border border-gray-700 rounded-xl relative">
            <div className="flex flex-row  items-center ">
              <div className="text-sm font-light absolute left-1/2 top-0">
                <p>Personal detail</p>
              </div>
              <div className="text-lg font-bold w-32 ">
                <h1>Name :</h1>
              </div>
              <div>
                <p>{profileData.display_name}</p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-lg font-bold  w-32">
                <h1>Surname :</h1>
              </div>
              <div>
                <p>{profileData.surname}</p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-lg font-bold  w-32">
                <h1>Email :</h1>
              </div>
              <div>
                <p>{profileData.email}</p>
              </div>
            </div>
          </div>

          {/* TODO:Books Statistics section */}
          <div></div>
          {/*Loan Statistics section */}

          <div className=" grid grid-cols-3 mt-10 gap-4">
            <GenericDataCard
              data="Shared books"
              number="12"
              color="green"
              icon={<Forward></Forward>}
            ></GenericDataCard>
            <GenericDataCard
              data="Books recieved"
              number="9"
              color="blue"
              icon={<CornerDownLeft></CornerDownLeft>}
            ></GenericDataCard>
            <GenericDataCard
              data="Currently Borrowing"
              number="12"
              color="red"
              icon={<BookDashed></BookDashed>}
            ></GenericDataCard>
            <GenericDataCard
              data="Complete trades"
              number="40"
              color="amber"
              icon={<BookHeart></BookHeart>}
            ></GenericDataCard>
          </div>
          <div>trustiness</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
