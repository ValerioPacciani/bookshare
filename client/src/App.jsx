import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Requests from './pages/Requests'
import Map from './pages/Map'
import BookDetail  from './pages/BookDetail'


//REMBER TODO quando creo una chiamata di post se ho un immagine devo farlo sempre con multipart/form-data altimenti multer mi da errore nel backend

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<Map />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


