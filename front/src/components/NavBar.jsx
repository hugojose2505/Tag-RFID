// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useLocation } from 'react-router-dom';


const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isPageActive = (path) => location.pathname === path;

  return (
    <nav className="p-1 fixed w-full flex gap-4 ">
      <div className="container mx-auto flex items-center justify-center w-full">
        <button
          className="lg:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Fechar" : "Menu"}
        </button>
        <div
          className={`sm:flex sm:space-x-4" gap-8 ${
            isMenuOpen ? "flex" : "hidden"
          } top-16 left-0 right-0 p-8`}
        >
          <Link
            to="/tag-form"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive('/tag-form') ? 'border-gray-800' : ''
            }`}
          >
            Cadastrar Tag
          </Link>
          <Link
            to="/tag-view"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${isPageActive('/tag-view') ? 'border-gray-800' : ''}`}
          >
            Visualizar Tags
          </Link>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-20 " />
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/registrar"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${isPageActive('/registrar') ? 'border-gray-800' : ''}`}
            >
              Registrar
            </Link>
            <Link
              to="/visualizar"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${isPageActive('/visualizar') ? 'border-gray-800' : ''}`}
            >
              Visualizar Registros
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
