import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Bookcard from "../components/Bookcard";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../api/axiosConfig";

const Home = () => {
  const [books, setBooks] = useState([]); //la lista di libri posseduta dall utente, inizia come array vuoto
  const [loading, setLoading] = useState(true); //lo stato della pagina, setta a false quando ho finito di montare i componenti

  useEffect(() => {
    //questa è il fetch dei libri dell utente, devo farlo via async, perchè axios lo richiede, quindi sono costretto a creare l arrowfunction fetchRESP e chiamrla subido dopo
    const fetchResp = async () => {
      const resp = await axiosClient.get("/api/books");
      console.log("risposta dal server:", resp.data)
      setBooks(resp.data);
      setLoading(false);
    };
    fetchResp();
  }, []);

  return (
    <div className=" min-h-screen">
      <Navbar></Navbar>
      <div className="flex flex-row">
        <Sidebar></Sidebar>
        {books.map((b) => (
          <Bookcard
            title={b.title}
            author={b.author}
            coverImage={b.coverImage}
          ></Bookcard>
        ))}
      </div>
    </div>
  );
};

export default Home;
