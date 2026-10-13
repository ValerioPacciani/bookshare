import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosConfig";
import CatField from "../components/CatField";
import { Trash2, SquarePen, BookUp, CirclePlus } from "lucide-react";
import ModifyBookModal from "../components/ModifyBookModal";

const BookDetail = () => {
  const [book, setBook] = useState();
  const [categories, setCategories] = useState([]);
  const [ bookTypes,setBookTypes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams(); // use param returns an object {id : 31} sop i need to destructure it, {id} so it returns 42 //l?id Del libro
  


  const PercentageBar = ({data}) => {
    return (
      <div className="h-full bg-gray-600  rounded-3xl m-1 p-1 group relative"> 
        <div className="bg-green-600 h-full rounded-3xl" style={{width: data + '%' }}>

        </div>
        <div className="absolute bottom-full opacity-0 bg-slate-800 group-hover:opacity-100 border border-white rounded-2xl p-2">
          <span className="text-white">Read percentage of your book</span>
        </div>
      </div>
    )
  }

  const handleAddNewGenre = async() => {
    console.log("clickato")

  }


  async function handleDelete() {
    try {
      const resbook = await axiosClient.delete("/api/books/" + id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  const fetchId = async (id) => {
    if (id) {
      try {
        const resbook = await axiosClient.get("/api/books/" + id);
        setBook(resbook.data);
        setCategories(resbook.data.categories);
        //setRefresh((prev) => !prev) //ciclo infinto
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchConst = async() => {
    try{
        const constResp = await axiosClient.get("/api/books/costants")
        setBookTypes(constResp.data.book_types);
      } catch (e) {
        console.log(e);
      }
    }
  //solo al mount del componente, le costanti non cambiano
  useEffect(() => {
    fetchConst()
  },[])
  useEffect(() => {
      fetchId(id);
  }, [refresh]); //refresh is important here, so the useEffect will be lunchede every time id param changes

  //console.log("bookdata", book);
  //console.log("categoriesData : ", categories);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar></Navbar>
      <div className="flex flex-row">
        <div className={`h-full min-h-full min-w-64 max-w-64 p-1 ${book?.read_percentage === 100 ? "bg-green-700" : "bg-amber-300" }`}>
          <img src={book?.coverImage}>
          </img>
          <div className="h-9">
            <PercentageBar data = {book?.read_percentage}></PercentageBar>
          </div>
        </div>
        <div className="flex-2 grid grid-rows-5 ">
          <div className="bg-gray-100 grid place-items-center">
            <p className="text-2xl font-bold ">{book?.title}</p>
          </div>
           <div className="bg-gray-100 grid place-items-center">
            <p className="text-sm font-light ">{book?.book_type}</p>
          </div>
          <div className="bg-gray-50 grid place-items-center">
            {book?.author}
          </div>
          <div className="flex items-center justify-center">
            {book?.isOnShare ? (
              <p> this book is on Share</p>
            ) : (
              <p>this book is not on share</p>
            )}
          </div>
          <div className="bg-gray-100 flex flex-row justify-center items-center gap-1">
            {
              //TODO Creare un elemento carino per le categorie
              categories?.map((cat) => (
                <CatField text={cat}></CatField>
              ))
            }
          <div className="ml-4 inline-flex items-center justify-center relative group">
           
            <CirclePlus size={32} onClick={handleAddNewGenre} className="text-green-600 hover:text-green-400 cursor-pointer"></CirclePlus>
             <div className="p-2 pointer-events-none opacity-0 group-hover:opacity-100 font-light text-gray-700">
              <span>Add a new genre</span>
              </div>
            
          </div>
          </div>
          <div className="bg-gray-50 grid place-items-center">
            <span>isbn : {book?.isbn}</span> 
          </div>
          <div className="grid grid-cols-2 bg-gray-100">
            <button onClick = {() => setShowModal(true)}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm  rounded-md py-2 hover:bg-gray-300 border border-gray-400 cursor-pointer">
              <SquarePen></SquarePen>Change
            </button>

            <button onClick = {handleDelete} className="flex-1 flex items-center  border border-red-400 justify-center gap-1.5 text-sm bg-red-50 text-red-700 rounded-md py-2 hover:bg-red-300 cursor-pointer">
              <Trash2></Trash2>Delete
            </button>
          </div>
        </div>
      </div>
      {showModal && <ModifyBookModal onClose = {() => setShowModal(false)} onDataSended= {() => {fetchId(id); setShowModal(false)}} cover = {book.coverImage} bookId={id} type = {book.book_type} title = {book.title} author = {book.author} isbn = {book.isbn} onshare = {book.isOnShare} readpercentage={book.read_percentage} possible_types={bookTypes}></ModifyBookModal>}
    </div> 
  );
};

export default BookDetail;
