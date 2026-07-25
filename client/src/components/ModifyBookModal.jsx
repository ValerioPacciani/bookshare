import { useState } from "react";
import { X } from "lucide-react";
import axiosClient from "../api/axiosConfig";

const ModifyBookModal = ({onClose,onDataSended,bookId,type,cover,title,author,isbn,onshare}) => {
    const [newImage,setNewImage] = useState(cover);
    const [newTitle,setNewTitle] = useState(title);
    const [newAuthor,setNewAuthor] = useState(author);
    const [newIsbn,setNewIsbn] = useState(isbn);
    const [newOnshare,setNewOnshare] = useState(onshare);
    const [newType,setNewType] = useState(type);


    const handleNewImage = (e) => {
        setNewImage(e.target.files[0]);
    }
       const handleTypeChange = (e) => {
        setNewType(e.target.value);
    }

       const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    }

       const handleAuthorChange = (e) => {
        setNewAuthor(e.target.value);
    }

       const handleIsbnChange = (e) => {
        setNewIsbn(e.target.value);
    }
       const handleOnshareChange = (e) => {
        console.log("nello stato prima ",newOnshare)
        setNewOnshare(e.target.checked);
        console.log("nello stato dopo ",newOnshare)
        
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const fData = new FormData()
        fData.append("title", newTitle);
        fData.append("author", newAuthor);
        fData.append("isbn",newIsbn);
        fData.append("isOnShare",newOnshare);
        fData.append("coverImage", newImage); //questa deve esser
        //TODO type
     try {
        const resp = await axiosClient.put('/api/books/'+ bookId ,fData);
        if(resp) { 
        onClose();
        onDataSended(); //funzione di callback, rilancia la fetch per aggiornare i dati nel padre
        }
    }   catch (error) {
            console.error(error.message);
            onClose() //ritorno alla home dopo aver inviato il nuovo libro
    }
    }



    return (
        <div className= "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="relative w-full max-w-lg max-h-[90vh] z-50 bg-slate-200 rounded-xl border-2">
        <div className="absolute top-0 right-0 p-3  ">
            <X onClick={onClose} className="cursor-pointer"> </X>
        </div>
        <div className="flex items-start justify-center gap-6 ">
            <div className="relative mt-8">
                <label className="relative cursor-pointer group">
                 <input className="absolute bottom-0.5 top-0 right-0.5 left-0.5 w-full" 
                 type="file"
                  accept="image/*"
                  onChange={handleNewImage}
                  className="hidden">
                </input>
                
                
                <img src={cover} className="m-2 max-w-full max-h-full min-w-32 min-h-40  transition-all duration-200 group-hover:blur-sm">
                </img>
                </label>
               
            </div>
        <form onSubmit = {handleSubmit} className="flex flex-col gap-3 items-center justify-center p-10 mt-4 mb-5 min-w-3xs">

            <div className="flex flex-col justify-center items-center">
                <label className=" text-lg font-light">Type</label>
                <input
                    onChange={handleTypeChange}
                    name ="type"
                    type = "text"
                    defaultValue = {type}
                    className="
                    w-full 
                    px-4 py-2
                    text-sm text-gray-900 
                    border border-gray-300 
                    rounded-lg 
                    shadow-sm 
                     placeholder:text-gray-400 
                    focus:outline-none 
                     focus:border-grey-300
                    focus:ring-2 
                     focus:ring-grey-300 
                    transition-all duration-20"
                >
                </input>
            </div>

            <div className="flex flex-col justify-center items-center">
                <label className=" text-lg font-light">Title</label>
                <input
                    onChange={handleTitleChange}
                    name ="title"
                    type = "text"
                    defaultValue = {title}
                    className="
                    w-full 
                    px-4 py-2
                    text-sm text-gray-900 
                    border border-gray-300 
                    rounded-lg 
                    shadow-sm 
                     placeholder:text-gray-400 
                    focus:outline-none 
                     focus:border-grey-300
                    focus:ring-2 
                     focus:ring-grey-300 
                    transition-all duration-20"
                >
                </input>
            </div>
            <div className="flex flex-col justify-center items-center">
               <label className=" text-lg font-light">Author</label>
                <input
                    onChange={handleAuthorChange}
                    name="author"
                    type = "text"
                    defaultValue = {author}
                     className="
                    w-full 
                    px-4 py-2
                    text-sm text-gray-900 
                    border border-gray-300 
                    rounded-lg 
                    shadow-sm 
                     placeholder:text-gray-400 
                    focus:outline-none 
                     focus:border-grey-300
                    focus:ring-2 
                     focus:ring-grey-300 
                    transition-all duration-20"
                >
                
                </input>
                
            </div>
            <div className="flex flex-col justify-center items-center">
                <label className=" text-lg font-light">ISBN</label>
                <input
                onChange={handleIsbnChange}
                name="isbn"
                type = "text"
                defaultValue = {isbn}
                 className="
                    w-full 
                    px-4 py-2
                    text-sm text-gray-900 
                    border border-gray-300 
                    rounded-lg 
                    shadow-sm 
                     placeholder:text-gray-400 
                    focus:outline-none 
                     focus:border-grey-300
                    focus:ring-2 
                     focus:ring-grey-300 
                    transition-all duration-20"
                >
                </input>
            </div>
            <div className="flex flex-col justify-center items-center">
                <label className=" text-lg font-light">On Share</label>
                <input
                onChange={handleOnshareChange}
                name ="onShare"
                type="checkbox"
                checked={newOnshare}
                >
                </input>
                </div>
            <button className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-2 mt-5 p-1 border rounded-lg font-light cursor-pointer bg-green-200 text-green-700 shadow-md hover:bg-green-500 hover:text-black "type="submit">
            Change
            </button>
        </form>
        </div>
    </div>
    </div>
    )
} 

export default ModifyBookModal
