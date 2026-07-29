import { X } from "lucide-react"

const GenresCointainer = ({genres,sendDelete}) => {

return (
    <div className="flex flex-wrap items-center justify-around gap-1">
        {genres.map((genre) => 


        <div key = {genre} className="relative bg-gray-400 py-1 px-2 border rounded-xl shadow-xl">
            <div onClick = {() => sendDelete(genre)} className="absolute top-0.5 right-0.5 text-gray-600 cursor-pointer hover:text-red-500"><X size={"12"}></X></div>
            <span>{genre}</span>


        </div>

        )}
    
 
    </div>


  

)



}


export default GenresCointainer