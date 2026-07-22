const BookCompactView = (props) => {
    //mi aspetto i documenti del libro
  return (
    <div className=" min-h-12 flex flex-row p-1 gap-4 items-center border border-gray-500 hover:bg-gray-400 rounded-md" >
        
        <div className="xs:w-16 sm:w-20 md:w-32 lg:w-60 truncate">
           <span title={props.title}>{props.title} </span>
        </div>
        <div className=" xs:w-16 sm:w-20 md:w-32 lg:w-60 truncate">
        <span title = {props.author}> {props.author}</span>
        </div>
        <div className=" xs:w-16 sm:w-20 md:w-32 lg:w-60 truncate">
        <span title = {props.isbn}> {props.isbn ? props.isbn : "///////////////////"} </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
            <span>On Share:</span>
            <span>{props.isOnShare ? 
            (<span className="w-3 h-3 rounded-full bg-green-500 inline-block"> </span>) : 
            (<span className="w-3 h-3 rounded-full bg-red-500 inline-block"> </span>)}
            </span>
        </div>
    </div>
  );
};

export default BookCompactView;
