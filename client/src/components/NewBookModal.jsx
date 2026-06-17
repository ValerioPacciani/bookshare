import { useState } from "react";
import { X, CirclePlus } from "lucide-react"
import axiosClient from "../api/axiosConfig";
import { Navigate } from "react-router-dom";

//TODO ISBN E CATEGORIE
const NewBookModal = ({ onclose }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [file, setFile] = useState(null); //img

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //creo l'oggetto da inviare al backend
        const fData = new FormData()
        fData.append("title", title);
        fData.append("author", author);
        fData.append("coverImage", file); 
        console.log("dati pronti: " +title + author + file)
        //invio al backand
       try {
        const resp = await axiosClient.post('/api/books', fData);

        console.log(resp);
        Navigate("/")

    }   catch (error) {
            console.error(error.response.data.message);
    }

    }
    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative gap-2" >
                <button className="rounded-2xl  absolute top-1 right-1" onClick={onclose}>
                    <X className="hover:text-red-600" />
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <p className="font-bold mb-2" >Add a new book</p>
                        </div>
                        <div className="w-full">
                            <p className="text-center">Title</p>
                            <input className="border-2 border-gray-600 rounded-sm w-full" value={title} onChange={handleTitle}></input>
                        </div>
                        <div className="w-full">
                            <p className="text-center">Author</p>
                            <input className="border-2 border-gray-600 rounded-sm w-full" value={author} onChange={handleAuthor}></input>
                        </div>
                        <div className=" mt-3">
                            {/* nascondo il vero input, per applicargli della grafica */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFile}
                                className="hidden"
                                id="coverInput"
                            />
                            <label
                                htmlFor="coverInput"
                                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50"
                            >
                                {file ? file.name : "Click for add a Cover Image"}
                            </label>
                        </div>
                        <button type="submit" className="rounded-full mt-3">
                            <CirclePlus className="w-8 h-8 hover:text-green-500" />
                        </button>

                    </div>
                </form>
            </div>
        </div >

    )



};

export default NewBookModal