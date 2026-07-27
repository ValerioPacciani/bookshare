//this component is used only as a  container for bottom bar pages (when i need it)

import { User, X } from "lucide-react";
import Bookcard from "./Bookcard";
import { Link } from "react-router-dom";
const BottomBar = (props) =>  {

//console.log("BottomBar OnRequestLoan-> ", props.onRequestLoan)

const sharedBooks = props.sharedBooks;
const activeUser = props.activeUser;
const onRequestLoan = props.onRequestLoan;




const isActive = props.isActive;



if (!isActive) return null;

return (  
<div className={` " z-2000 w-full w-max-7xl h-auto min-h-65 absolute bottom-0 right-0 left-0"transition-all duration-300 ease-in-out transform ${
        isActive 
          ? "translate-y-0 opacity-100" 
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{zIndex: 2000}}>
    <div className="flex flex-col  bg-gray-200">

      <span className="m-1.5 p-1">{activeUser.display_name} has the following books in shares:</span>
        <div className="flex flex-row gap-1">
          
     
          <div className="flex gap-3">
            {sharedBooks.map((book) => (
              <Bookcard className="mx-2" onRequestLoan = {onRequestLoan} key={book._id} id={book._id}  size={"small"} mode={"request"} title={book.title} author={book.author} isbn={book.isbn} coverImage={book?.coverImage}>
              </Bookcard>
            ))}
          </div>

        </div>
        <div className="flex">
          
          <Link to = {`user/${activeUser._id}`} >
          <button className="bg-blue-300 border border-gray-500 rounded-md m-2 p-2 hover:bg-blue-500 hover:border-black">Go to {activeUser.display_name}'s profile</button>
          </Link>
        </div>

        <div className="absolute top-0 right-0 p-1">
          <button className="cursor-pointer" onClick={props.onClose}> <X></X> </button>
        </div>
      </div>
    </div>
)
}

export default BottomBar