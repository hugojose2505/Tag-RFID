// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-background p-4 fixed top-0 w-full ">
      <div className="container mx-auto flex items-center justify-center w-full z-10">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
        <div className="flex space-x-4">
        
          <Link
            to="/tag-form"
            className="text-black border-b-2 border-transparent hover:border-blue-500 px-4 py-2 rounded font-bold"
          >
            Cadastrar Tag
          </Link>
          <Link
            to="/tag-view"
            className="text-black border-b-2 border-transparent hover:border-blue-500 px-4 py-2 rounded font-bold"
          >
            Visualizar Tags
          </Link>
          <Link
            to="/registrar"
            className="text-black border-b-2 border-transparent hover:border-blue-500 px-4 py-2 rounded font-bold"
          >
            Registrar
          </Link>
          <Link
            to="/visualizar"
            className="text-black border-b-2 border-transparent hover:border-blue-500 px-4 py-2 rounded font-bold"
          >
            Visualizar Registros
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
