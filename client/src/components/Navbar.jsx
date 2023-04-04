import React from "react"
import {Link} from "react-router-dom";
import aura from "../assets/aura.svg"

const Navbar = () => {
    return (
        <>

        <nav className="w-full flex justify-between intems-center bg-[#f8fafc] sm:px-8 px-4 py-4 border-b bor-b-[#e6ebf4]">

            <Link to="/">
                <img src={aura} className="w-28 object-contain"/>
            </Link>

            <Link to="/create-post" 
            className="font-inter font-medium text-white px-4 py-2 rounded-md bg-[#B80E66] hover:bg-[#cf1575] focus:ring-4 focus:ring-[#ffecf6]  dark:bg-[#B80E66] dark:hover:bg-[#cf1575] dark:focus:ring-[#cf1575]">
            Create
            </Link>
            
        </nav>


        </>
    )
}

export default Navbar