import { useParams } from "react-router-dom" 
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../api/axiosConfig";

const BookDetail =() => {
    const [book,setBook] = useState()

    const {id} = useParams(); // use param returns an object {id : 31} sop i need to destructure it, {id} so it returns 42

    const  fetchId = async (id) => {
        
        if (id) {
        try{
            const resbook = await axiosClient.get("/api/books/" + id);
            setBook(resbook.data);
        } catch (error) {
            console.log(error);
        }
        }
    }

    useEffect(() => {
        
        fetchId(id);

    },[id]); //id is important here, so the useEffect will be lunchede every time id param changes

    console.log(book);

  
    return(
        <div className ="min-h-screen bg-gray-100">
            <Navbar></Navbar>
            <div className="flex flex-row">
                <div className="h-full min-h-full min-w-64 max-w-64 p-1 bg-amber-500">
                   <img src={book?.coverImage}>
                   </img>
                </div>
                <div className="flex-2 grid grid-rows-5 ">
                    <div className="bg-gray-100 grid place-items-center">
                        {book?.title}
                    </div>
                    <div className="bg-gray-50 grid place-items-center">
                        {book?.author}
                    </div>
                    <div className="bg-gray-100">
                        categories
                    </div>
                    <div className="bg-gray-50 grid place-items-center">
                        <p>{book?.isbn}</p>
                    </div>
                    <div className="grid grid-cols-3 bg-gray-100">
                        <button>
                            modify
                        </button>
                        <button>
                            prestito
                        </button>
                        <button>
                            delete
                        </button>
                    </div>
                </div>
        </div>
        </div>
    )

    
}


export default BookDetail