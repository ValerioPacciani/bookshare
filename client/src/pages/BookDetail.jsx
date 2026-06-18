import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosConfig";
import CatField from "../components/CatField";
import { Trash2, SquarePen, BookUp } from "lucide-react";

const BookDetail = () => {
  const [book, setBook] = useState();
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams(); // use param returns an object {id : 31} sop i need to destructure it, {id} so it returns 42

  async function handleShare() {
    try {
      const resShare = await axiosClient.put("/api/books/" + id, {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        categories: book.categories,
        coverImage: book.coverImage,
        isOnShare: true,
      });
      setRefresh((prev) => !prev); //in this case i am changing the value of refresh every time it happen this fuction this is for triggering the Useeffect for fetchiing the data, so i can always have the new datas
      console.log(resShare);
    } catch (error) {
      console.log(error);
    }
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchId(id);
  }, [refresh]); //id is important here, so the useEffect will be lunchede every time id param changes

  console.log("bookdata", book);
  console.log("categoriesData : ", categories);

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
          <div className="grid grid-cols-3 bg-gray-100">
            <button className="flex-1 flex items-center justify-center gap-1.5 text-sm border rounded-md py-2 hover:bg-gray-50">
              <SquarePen></SquarePen>Change
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm bg-blue-50 text-blue-700 rounded-md py-2 hover:bg-blue-100"
            >
              <BookUp></BookUp>Share
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-sm bg-red-50 text-red-700 rounded-md py-2 hover:bg-red-100">
              <Trash2></Trash2>Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
