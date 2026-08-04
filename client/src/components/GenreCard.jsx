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
       <div className=" relative w-md h-62 bg-amber-100">
            <img className="z-10 absolute inset-0" src={image[genre]}>
            </img>
            <div className=" flex flex-col z-20 pl-5 pt-4 gap-2 font-extrabold text-3xl absolute top-0 left-0 text-white">
                <span>{genre}</span>
                <span className="">{booksByGenre.length}</span>
            </div>
       </div>
    )




}


export default GenreCard


