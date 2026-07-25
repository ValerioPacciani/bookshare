import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosConfig";
import CatField from "../components/CatField";
import { Trash2, SquarePen, BookUp } from "lucide-react";
import ModifyBookModal from "../components/ModifyBookModal";

const BookDetail = () => {
  const [book, setBook] = useState();
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams(); // use param returns an object {id : 31} sop i need to destructure it, {id} so it returns 42 //l?id Del libro
  //TODO: tasto modifica e tasto, togli dalla condivisione
  

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

  useEffect(() => {
    fetchId(id);
  }, [refresh]); //refresh is important here, so the useEffect will be lunchede every time id param changes

  //console.log("bookdata", book);
  //console.log("categoriesData : ", categories);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar></Navbar>
      <div className="flex flex-row">
        <div className="h-full min-h-full min-w-64 max-w-64 p-1 bg-amber-500">
          <img src={book?.coverImage}></img>
        </div>
        <div className="flex-2 grid grid-rows-5 ">
          <div className="bg-gray-100 grid place-items-center">
            <p className="text-2xl font-bold ">{book?.title}</p>
          </div>
          <div className="bg-gray-50 grid place-items-center">
            {book?.author}
          </div>
          <div>
            {book?.isOnShare ? (
              <p> Questo libro è in condivisione </p>
            ) : (
              <p>questo libro non è in condivisione</p>
            )}
          </div>
          <div className="bg-gray-100 flex flex-row justify-center gap-1">
            {
              //TODO Creare un elemento carino per le categorie
              categories?.map((cat) => (
                <CatField text={cat}></CatField>
              ))
            }
          </div>
          <div className="bg-gray-50 grid place-items-center">
            <p>{book?.isbn}</p>
          </div>
          <div className="grid grid-cols-2 bg-gray-100">
            <button onClick = {() => setShowModal(true)}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm  rounded-md py-2 hover:bg-gray-300 border border-gray-400">
              <SquarePen></SquarePen>Change
            </button>

            <button onClick = {handleDelete} className="flex-1 flex items-center  border border-red-400 justify-center gap-1.5 text-sm bg-red-50 text-red-700 rounded-md py-2 hover:bg-red-300">
              <Trash2></Trash2>Delete
            </button>
          </div>
        </div>
      </div>
      {showModal && <ModifyBookModal onClose = {() => setShowModal(false)} onDataSended= {() => {fetchId(id); setShowModal(false)}} cover = {book.coverImage} bookId={id} type = {"tipo"} title = {book.title} author = {book.author} isbn = {book.isbn} onshare = {book.isOnShare}></ModifyBookModal>}
    </div> 
  );
};

export default BookDetail;
