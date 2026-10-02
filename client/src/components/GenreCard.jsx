import { useState } from "react"
import { useEffect } from "react"
import axiosClient from "../api/axiosConfig"

import {SquarePen} from "lucide-react"

const GenreCard = ({genre,image, booksByGenre}) => {


    const [books,setBooks] = useState([])


 

    console.log("nel child", booksByGenre)

    return (
       

<div className="group relative w-md h-62 cursor-pointer">
  
  
  <div className="absolute inset-0 bg-gray-500 border border-slate-700 rounded-xl z-0
                transition-color ease-in duration-400 transform
                    group-hover:bg-gray-100" />

 
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


