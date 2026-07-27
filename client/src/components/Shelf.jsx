//component that is like a directory but for books
const Shelf  = ({type}) => {
    //type: ["type",[books]]

    //sto usando delle immagini locali, salvate nella cache, sonowebp e fisse, velocita di caricamento
 return(
    <div className="flex gap-1 w-90%  h-62 bg-amber-700 ">
        <div className="flex flex-col">
        


       
        <img className="w-62 h-62 object-cover rounded-lg shadow-sm"  src={`/images/${type[0]}.webp`}>

        </img>

         </div>
         <span>{type[0]}</span>
    </div>

 );

};

export default Shelf