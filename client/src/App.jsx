import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home, CreatePost} from "./pages/index.js";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App