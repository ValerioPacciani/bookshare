import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Bookcard from "../components/Bookcard";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../api/axiosConfig";
import NewBookModal from "../components/NewBookModal";
import { Plus,ListChevronsUpDown,LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom"
import BookCompactView from "../components/BookCompactView";

const Home = () => {
  const [books, setBooks] = useState([]); //la lista di libri posseduta dall utente, inizia come array vuoto
  const [loading, setLoading] = useState(true); //lo stato della pagina, setta a false quando ho finito di montare i componenti
  const [showmodal, setmodal] = useState(false);
  const [visTypeGrid , setVisGridType] = useState(true) //ho solo due viste, se false è lista se true è grid, non serve complicare
  //funzione di aggiornamento dei libri, prende newbook da newbookmodal
  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setmodal(false); // Chiude il modale solo a invio riuscito
  };

  useEffect(() => {
    //questa è il fetch dei libri dell utente, devo farlo via async, perchè axios lo richiede, quindi sono costretto a creare l arrowfunction fetchRESP e chiamrla subido dopo
    const fetchResp = async () => {
      const resp = await axiosClient.get("/api/books");
     //console.log("risposta dal server:", resp.data)
      setBooks(resp.data);
      setLoading(false);
    };
    fetchResp();
  }, []);
  console.log(books)
  return (
    <div className=" min-h-screen">
      <Navbar></Navbar>
      <div className="flex flex-row bg-pink-100 relative min-h-screen">
        <Sidebar />

        <div className="flex-1 p-4 relative">
          <div className = "flex flex-row mb-3 gap-0.5">
            <button onClick = {() => setVisGridType(true)}className="flex gap-2 border-slate-500 bg-slate-200 border p-2 rounded-md hover:bg-slate-400  hover:border-slate-600"> <LayoutGrid/>Griglia </button>
            <button onClick = {() => setVisGridType(false)}className="flex gap-2 border-slate-500 bg-slate-200 border p-2 rounded-md hover:bg-slate-400  hover:border-slate-600"> <ListChevronsUpDown></ListChevronsUpDown> Elenco </button>
          </div>

          {visTypeGrid ? 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {//_id and not id because there is the database id
              books.map((b) => (
                <Link to={`/books/${b._id}`} key={b._id}>
                  <Bookcard
                    key={b.id}
                    title={b.title}
                    author={b.author}
                    coverImage={b.coverImage}
                  />
                </Link>
              ))}
          </div>
          : 
          <div className="flex flex-col"> 
          {books.map((b) => (
                <Link to={`/books/${b._id}`} key={b._id}>
                  <BookCompactView
                    title={b.title}
                    author={b.author}
                    isOnShare= {b.isOnShare}
                    isbn = {b.isbn}
                  />
                </Link>
                )) }
              </div>}
          {/* Bottone fisso in basso a destra */}
          <div className="fixed bottom-6 right-6 group z-50">
            <button
              onClick={() => setmodal(true)}
              className="bg-gray-300 hover:bg-green-400 rounded-full p-3 shadow-lg"
            >
              <Plus />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              New Book
            </span>
          </div>

        </div>

        {showmodal && <NewBookModal onBookAdded={handleBookAdded} onclose={() => setmodal(false)} />}
      </div>
    </div>
  );
};

export default Home;
