import { useState } from "react"
import { useEffect } from "react"
import axiosClient from "../api/axiosConfig"

const GenreCard = ({genre,image}) => {

console.log("image,url" ,image[genre])
    //fetch immagini 
    return (
        <div className="flex w-80  flex-wrap bg-amber-200 h-64">
            <img src={image[genre]}>
            
            </img>
            {genre}
        </div>
    )




}


export default GenreCard


