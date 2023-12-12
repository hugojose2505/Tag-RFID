// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";


const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isPageActive = (path) => {
    return location.pathname.trim() === (path);
  };

  return (
    <nav className="p-0 fixed w-full flex flex-col lg:flex-row gap-4">
    <div className="container mx-auto flex items-center justify-between w-full">
      <button
        className="lg:hidden text-black focus:outline-none "
        onClick={toggleMenu}
      >
        <CiMenuBurger size={30 }/>
      </button>

      <div
        className={`lg:flex lg:space-x-4 flex-col lg:flex-row gap-8 ${
          isMenuOpen ? "flex" : "hidden"
        } top-16 left-0 right-0 p-5`}
      >
          <Link
            to="/tag-form"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4  rounded font-bold ${
              isPageActive("/tag-form")
                ? "border-gray-950 m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Cadastrar Tag
          </Link>

          <Link
            to="/cadastrarOS"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/cadastrarOS")
                ? "border-gray-950  m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Criar OS
          </Link>
          <Link
            to="/associarOS"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/associarOS")
                ? "border-gray-950  m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Associar OS
          </Link>

          <Link
            to="/registrar"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/registrar")
                ? "border-gray-950  m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Registrar
          </Link>

          <Link to="/">
            <img src={logo} alt="Logo" className="h-20 m-auto" />
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/tag-view"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/tag-view")
                  ? "border-gray-950  m-auto pb-3 "
                  : "m-auto pb-3"
              }`}
            >
              Visualizar Tags
            </Link>

            <Link
              to="/visualizar"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/visualizar")
                  ? "border-gray-950  m-auto pb-3 "
                  : "m-auto pb-3"
              }`}
            >
              Visualizar Registros
            </Link>

            <Link
              to={"/viewOS"}
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/viewOS")
                  ? "border-gray-950  m-auto pb-3 "
                  : "m-auto pb-3"
              }`}
            >
              Visualizar Ordens de Serviço
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
