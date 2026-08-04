import { useState } from "react"
import { useEffect } from "react"
import axiosClient from "../api/axiosConfig"

import {SquarePen} from "lucide-react"

const GenreCard = ({genre,image, booksByGenre}) => {


    const [books,setBooks] = useState([])


 //console.log("image,url" ,image[genre])
    //fetch immagini 

    console.log("nel child", booksByGenre)

    return (
       /* <div className="group relative w-md h-62 cursor-pointer">
         <div className="absolute inset-0 w-md h-62 bg-amber-100 border border-slate-700 rounded-xl overflow-hidden z-0">
            
            <div className="  flex flex-col z-10 pl-5 pt-4 gap-2 font-extrabold text-3xl absolute top-0 left-0 text-white">
                <span>{genre}</span>
                <span className="text-gray-300">{booksByGenre.length}</span>
            </div>

            <img className=" z-20 absolute inset-0
                w-full h-full object-cover rounded-xl border border-slate-700 
                transition-all duration-300 ease-out transform
                group-hover:-translate-y-10 
                group-hover:scale-105 
                group-hover:-rotate-2 
                group-hover:shadow-2xl
            " src={image[genre]}
            >
            </img>
       </div>
       </div>
    ) */


<div className="group relative w-md h-62 cursor-pointer">
  
  
  <div className="absolute inset-0 bg-amber-100 border border-slate-700 rounded-xl z-0" />

 
  <div className="absolute top-0 left-0 pl-5 pt-4 flex flex-col z-20 font-extrabold text-2xl text-white
                    transition-all duration-300 ease-out transform
                    
                    group-hover:-translate-y-10 
                    group-hover:scale-105 
                    group-hover:-rotate-2 
                    group-hover:shadow-2xl
                    group-hover:text-3xl
                    ">
    <span>{genre}</span>
    <span className="text-white">{booksByGenre.length}</span>
  </div>

  {/* 3. IMMAGINE / FOGLIO CHE ESCI FUORI (Senza overflow-hidden!) 
      - Usiamo translate-y per farla salire verso l'alto
      - Usiamo rotate per darle un effetto dinamico da cartella aperta
  */}
  <img 
    src={image[genre]} 
    alt={genre}
    className="absolute inset-0 w-full h-full object-cover rounded-xl border border-slate-700 z-10
              
               transition-all duration-300 ease-out transform
               
               group-hover:-translate-y-10 
               group-hover:scale-105 
               group-hover:-rotate-2 
               group-hover:shadow-2xl"
  />

</div>
    )

}
//[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]  group-hover:[clip-path:polygon(-10%_10%,90%_10%,100%_100%,0_100%)]


export default GenreCard


