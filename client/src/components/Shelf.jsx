//component that is like a directory but for books
const Shelf  = ({type}) => {
    //type: ["type",[books]]
 return(
    <div className="w-45 h-30">
        <span>{type[0]}</span>
    </div>

 );

};

export default Shelf