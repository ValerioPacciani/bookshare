import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import axiosClient from "../api/axiosConfig";
import GenericDataCard from "../components/GenericDataCard";

import {ResponsiveContainer,Pie,PieChart,Cell, Legend, Tooltip} from "recharts"

//colori per le pieChart
const COLORS = [
  '#36A2EB', // Blu
  '#FF6384', // Rosso
  '#FFCE56', // Giallo
  '#4BC0C0', // Verde acqua
  '#9966FF', // Viola
  '#FF9F40', // Arancione
  '#C7C7C7', // Grigio chiaro
  '#5366FF', // Blu scuro
  '#FF63FF', // Magenta
  '#2ECC71', // Verde smeraldo
  '#E74C3C', // Corallo / Rosso scuro
  '#3498DB', // Celeste
  '#9B59B6', // Lilla
  '#F1C40F', // Oro / Giallo scuro
  '#1ABC9C', // Turchese
  '#E67E22', // Carota
  '#95A5A6', // Grigio ardesia
  '#34495E', // Blu notte
  '#D35400', // Zucca
  '#27AE60'  // Verde foresta
]
const GENRESCOLORS = [
  
  '#9B59B6', // Lilla
  '#F1C40F', // Oro / Giallo scuro
  '#1ABC9C', // Turchese
  '#E67E22', // Carota
  '#95A5A6', // Grigio ardesia
  '#34495E', // Blu notte
  '#D35400', // Zucca
  '#27AE60' , // Verde foresta
  '#E74C3C', // Corallo / Rosso scuro
  '#3498DB', // Celeste
]


// CARD GRAFICA
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
  const [booksStatData, setBooksStatData] = useState({});
 

  async function fetchUserData() {
    try {
      const resp = await axiosClient.get("/api/user/data");
      const bookStatResp = await axiosClient.get("api/books/stats")
      
      setProfileData(resp.data);
      //console.log(bookStatResp.data)
      setBooksStatData(bookStatResp.data);
      
    } catch (e) {
      console.log("errore nel fetch dei dati dell user: ", e.message);
    }
  }

  useEffect(() => {
    fetchUserData();
   
  }, []);

  console.log(profileData);
  console.log(booksStatData.number_of_categories)
  //console.log("bookData : "+booksStatData.number_of_categories)
 //console.log(Object.keys(booksStatData?.number_of_categories))
  //console.log(profileData.avatar);

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-12 h-screen bg-slate-200 max-w-7xl mx-auto p-6 flex flex-col items-center rounded-2xl border border-gray-800">
        <div className="grid grid-cols-2 gap-2">
        <div className="col-1 m-4 w-48 h-48 bg-amber-500 rounded-2xl overflow-hidden border border-gray-600">
          <img className="object-cover w-full h-full "  
          src = {profileData?.avatar}>
          </img>
        </div>
        <div className="col-2 m-4 pl-12  flex flex-col justify-evenly">
            <span className="font-bold text-4xl">
              {profileData?.name}
            </span>
           
            <span className="font-light  text-gray-800">
              {profileData?.email}
            </span>
           
          </div>
        </div>
        <div className="mt-4 w-full h-16">
          badges
        </div>
        <div className="grid grid-cols-4  gap-4 w-full">
          {/* prima riga Loans */}
          <DataHolder data = {profileData?.loans_recieved ?? "dati mancanti"} description = "Richieste ricevute:">
          </DataHolder>

          <DataHolder data = {profileData?.loans_recieved_completed ?? "dati mancanti"} description = "Richieste ricevute e accettate:"> 
          
          </DataHolder>

          <DataHolder data = {profileData?.loans_sended ?? "dati mancanti"} description = "Richieste mandate:">
          
          </DataHolder>

          <DataHolder data = {profileData?.loans_sended_completed ?? "dati mancanti"} description = "Richieste mandate e confermate:">
          
          </DataHolder>

          {/* seconda riga, statistiche */}
          <DataHolder data = { booksStatData?.total_books ?? "dati mancanti" } description={"numero di libri totali"}>

          </DataHolder>
          <DataHolder data = { booksStatData?.total_books_on_share ?? "dati mancanti" } description={"Shared Books"}>

          </DataHolder>
          <DataHolder data = { booksStatData?.total_read_books ?? "dati mancanti" } description={"Read Books"}>

          </DataHolder>
          <DataHolder data = { `${booksStatData?.reading_percentage_average}%` ?? "dati mancanti" } description={"Average reading percentage"}>

          </DataHolder>


        {/* terza riga grafici */}
              <div className = "h-86 col-span-2 flex flex-col justify-center items-center border border-black rounded-2xl mt-3">
                <span className="font-bold text-2xl text-gray-800">
                  Distribution of books by categories
                </span>
            <div className="flex-1 w-full min-h-0 ">
          
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={booksStatData?.number_of_categories}
                  cx="50%"          // Centro
                  cy="50%"    
                  dataKey = "total"
                  nameKey = "_id"       
                  innerRadius={50}  // Se metti 0 è una torta piena, se metti es. 50 diventa una ciambella 
                  outerRadius={100}  // Grandezza della torta
                  paddingAngle={4}  // Spazio tra una fetta e l'altra (stile moderno)
                    
                >
                {booksStatData?.number_of_categories?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <Legend></Legend>
                  <Tooltip></Tooltip>
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          </div>
            {/*SECONDO GRAFICO*/}
            <div className = "h-86 col-span-2 flex flex-col justify-center items-center border border-black rounded-2xl mt-3">
              <span className="font-bold text-2xl text-gray-800">
                Distribution of books by genre
              </span>
            <div className="flex-1 w-full min-h-0 ">
              
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={booksStatData?.number_of_genres}
                  cx="50%"          // Centro
                  cy="50%" 
                  dataKey = "total"
                  nameKey = "_id"         
                  innerRadius={50}  // Se metti 0 è una torta piena, se metti es. 50 diventa una ciambella 
                  outerRadius={100}  // Grandezza della torta
                  paddingAngle={4}  // Spazio tra una fetta e l'altra (stile moderno)
                    
                >
                {booksStatData?.number_of_genres?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={GENRESCOLORS[index % COLORS.length]} />
                  ))}
                  <Legend></Legend>
                 <Tooltip></Tooltip>
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        </div>

        {/*Informazioni Personali */}
        <div className="flex flex-row w-full mt-16">
          <span>
            Instagram
          </span>
        </div>
              
    </div>
    </div> 

    
  )
}
export default Profile;
