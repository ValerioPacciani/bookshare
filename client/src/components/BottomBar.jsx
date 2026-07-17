//this component is used only as a  container for bottom bar pages (when i need it)

import Bookcard from "./Bookcard";
const BottomBar = (props) =>  {

//console.log("BottomBar OnRequestLoan-> ", props.onRequestLoan)

const sharedBooks = props.sharedBooks;
const activeUser = props.activeUser;
const onRequestLoan = props.onRequestLoan;


const isActive = props.isActive;
if (!isActive) return null;

return (  <div className={` "z-2000 w-full w-max-7xl h-auto min-h-65 absolute bottom-0 right-0 left-0"transition-all duration-300 ease-in-out transform ${
        isActive 
          ? "translate-y-0 opacity-100" 
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{zIndex: 2000}}>

        <div className="grid grid-cols-4 gap-2 bg-gray-200">
            <div>
              
            </div>
          
          <div className="col-span-3 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
            {sharedBooks.map((book) => (
              <Bookcard className="mx-2" onRequestLoan = {onRequestLoan} key={book._id} id={book._id}  size={"small"} mode={"request"} title={book.title} author={book.author} isbn={book.isbn} coverImage={book?.coverImage}>
              </Bookcard>
            ))}
          </div>

        </div>
    </div>
)
}

export default BottomBar