import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Bookcard from "../components/Bookcard";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../api/axiosConfig";
import NewBookModal from "../components/NewBookModal";
import { Plus,ListChevronsUpDown,LayoutGrid, ShelvingUnit } from "lucide-react";
import { Link } from "react-router-dom"
import BookCompactView from "../components/BookCompactView";
import Shelf from "../components/Shelf";


const Home = () => {
  const [books, setBooks] = useState([]); //la lista di libri posseduta dall utente, inizia come array vuoto
  const [loading, setLoading] = useState(true); //lo stato della pagina, setta a false quando ho finito di montare i componenti
  const [showmodal, setmodal] = useState(false);
  const [viewType , setViewType] = useState("grid") 
  const [bookTypes,setBookTypes] = useState([]);
  const [bookGenres,setBookGenres] = useState([]);
  

  console.log("books:" ,books)

  //funzione di switch per il rendering dei componenti a seconda della vista scelta
  const renderView = (viewType) => {
    switch(viewType){
      case "grid": 
        return (
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
        )
        case "list" :
        return (
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
              </div>
        )
        case "typeshelves":
          //creo l oggetto con chiave = tupo e valore = array di libri, prendo il valore storato nell oggetto, e lo trasformo in un array di libri
          const shelvesobj= books.reduce((shelves,item) => {
            
            const keyType = item.book_type; //uso come chiave della cartella type
              if(!shelves[keyType]) { //se non esiste con la chiave
                shelves[keyType] = []; //allora lo creo, vuoto
              }
              shelves[keyType].push(item); //aggiungo il libro a cui sto iterando all array coretto
              return shelves;
            
             
            },{}) //{} è il valore iniziale dell oggetto che sto creando, che è una object, che avrà Type : Array
           console.log("shelves obj = ",shelvesobj)
           const shelvesarray= Object.entries(shelvesobj) //trasformo l'oggetto in una matrice, cosi posso applicargli il Map nel frontend
           console.log("array " ,shelvesarray);
          return(
            
            <div>
              <div className="flex-flex-row gap-1">
                {shelvesarray.map((type) => ( //ora ho un oggetto del tipo [["type",[book1,book2 etc]],["type2"[book1,book2,book3]]
                  <Shelf key={type[0]} type={type}></Shelf>
                ))}


              </div>
            </div>
          )
    }
  }










  //funzione di aggiornamento dei libri, prende newbook da newbookmodal
  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setmodal(false); // Chiude il modale solo a invio riuscito
  };

  useEffect(() => {
    //questa è il fetch dei libri dell utente, devo farlo via async, perchè axios lo richiede, quindi sono costretto a creare l arrowfunction fetchRESP e chiamrla subido dopo
    const fetchResp = async () => {
      const resp = await axiosClient.get("/api/books");
      const constantsResp = await axiosClient.get("/api/books/costants");
      console.log("costants data = " ,constantsResp.data)
      setBookTypes(constantsResp.data.book_types);
      setBookGenres(constantsResp.data.genres);
      
     //console.log("risposta dal server:", resp.data)
      setBooks(resp.data);
      setLoading(false);
    };
    fetchResp();
  }, []);
  //console.log(books)
  //console.log(bookTypes);
  //console.log(bookGenres);
  return (
    <div className=" min-h-screen">
      <Navbar></Navbar>
      <div className="flex flex-row bg-pink-100 relative min-h-screen">
        <Sidebar />
       
        <div className="flex-1 p-4 relative">
        <div className="flex flex-row items-center justify-between"> 
          <div className = "flex flex-row mb-3 gap-0.5">
            <button onClick = {() => setViewType("grid")}className="flex gap-2 border-slate-500 bg-slate-200 border p-2 rounded-md hover:bg-slate-400  hover:border-slate-600 cursor-pointer"> <LayoutGrid/>Griglia </button>
            <button onClick = {() => setViewType("list")}className="flex gap-2 border-slate-500 bg-slate-200 border p-2 rounded-md hover:bg-slate-400  hover:border-slate-600 cursor-pointer"> <ListChevronsUpDown></ListChevronsUpDown> Elenco </button>
          </div>
            <button onClick = {() => setViewType("typeshelves")} title ="pass to the shelves view, it uses types or genres to load the books" className="p-2 mr-20 flex gap-2 border-slate-500 bg-slate-200 border rounded-md hover:bg-slate-400  hover:border-slate-600 cursor-pointer"> <ShelvingUnit /> Shelf view</button>
          </div>
          {renderView(viewType)}
          
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
        {showmodal && <NewBookModal possible_types = {bookTypes} possible_genres = {bookGenres} onBookAdded={handleBookAdded} onclose={() => setmodal(false)} />}
      </div>
    </div>
  );
};

export default Home;
