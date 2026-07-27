import Bookcard from "./Bookcard";
import { Link } from "react-router-dom";
//component that is like a directory but for books
const Shelf  = ({type}) => {
    //type: ["type",[books]]

    //sto usando delle immagini locali, salvate nella cache, sonowebp e fisse, velocita di caricamento
    const bookArr = type[1];
 return(
    <div className=" relative flex gap-1 w-90%  h-62 items-start bg-slate-200 rounded-lg border border-black-400 ">
        <div className="shrink-0">
        <img className="w-62 h-61 object-cover rounded-lg shadow-sm"  src={`/images/${type[0]}.webp`}>
        </img>
         </div>
         <div className="flex flex-col min-w-0 min-h-0 h-full w-full">
         <div className=" bg-pink-100 text-xl font-bold rounded-2xl p-1 my-1 mr-1 border border-gray-400">
         <span className="ml-1">{type[0]}</span>
         <span className="ml-5  font-light">{bookArr.length}</span>
         </div>
         <div className="flex overflow-x-auto overflow-y-hidden w-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/60 hover:scrollbar-thumb-white">
         {bookArr.map((b) => (
            <Link to={`/books/${b._id}`} key={b._id}>
            <Bookcard  title = {b.title} author = {b.author} coverImage={b.coverImage} size={"small"}></Bookcard>
            </Link>
         ))}
         </div>
         </div>
    </div>

 );

};

export default Shelf