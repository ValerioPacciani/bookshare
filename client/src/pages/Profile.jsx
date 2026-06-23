import Navbar from "../components/Navbar";
import { Trash2, SquarePen } from "lucide-react";

const Profile = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-slate-50 grid grid-cols-4">
        {/* Avatar and Description*/}

        <div className="p-4 pt-6 m-4  min-h-96 col-span-1 flex flex-col items-center bg-slate-200 border-gray-500 border rounded-lg">
          <div className="bg-white w-56 h-56 border-black border-2 rounded-full">
            <img></img>
          </div>
          <div className="flex flex-row mt-2 gap-1">
            <button className=" flex items-center p-1 h-8 bg-cyan-300 border border-cyan-800 rounded-lg text-cyan-700 font-light">
              <SquarePen /> Modifica
            </button>
            <button className="h-8 p-1 bg-red-400 border-red-700 border rounded-lg text-red-700 font-light flex items-center">
              <Trash2 />
              Delete
            </button>
          </div>

          <div className="flex flex-col mt-2">
            <div>
              <h3> Nome </h3>
            </div>
            <div>
              <p>
                descrizione descrizione descrizione descrizione descrizione
                descrizione descrizione descrizione descrizione descrizione
                descrizione descrizione
              </p>
            </div>
          </div>
        </div>

        <div className=" bg-slate-100 p-4 mt-6 flex flex-col pr-4 h-96 col-span-3 border-gray-600 border rounded-xl mr-4">
          <div className="flex flex-col gap-3 p-5 bg-slate-200 border border-gray-700 rounded-xl">
            <div className="flex flex-row  items-center">
              <div className="text-lg font-bold w-32 ">
                <h1>Name :</h1>
              </div>
              <div>
                <p>NOME</p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-lg font-bold ">
                <h1>Surname :</h1>
              </div>
              <div>
                <p>SURNAME</p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-lg font-bold ">
                <h1>Email :</h1>
              </div>
              <div>
                <p>EMAIL</p>
              </div>
            </div>
          </div>

          <div>
            statistiche libri
            <br></br>
            statische preferiti
          </div>
          <div>statistiche prestiti</div>
          <div>trustiness</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
