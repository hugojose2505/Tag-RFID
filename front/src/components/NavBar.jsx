// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isPageActive = (path) => {
    return location.pathname.includes(path);
  };
  return (
    <nav className="p-0 fixed w-full flex gap-4 ">
      <div className="container mx-auto flex items-center justify-center w-full">
        <button
          className="lg:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Fechar" : "Menu"}
        </button>
        <div
          className={`sm:flex sm:space-x-4" gap-8  ${
            isMenuOpen ? "flex " : "hidden"
          } top-16 left-0 right-0 p-5  `}
        >
          <Link
            to="/tag-form"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4  rounded font-bold ${
              isPageActive("/tag-form")
                ? "border-black m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Cadastrar Tag
          </Link>

          <Link
            to="/cadastrarOS"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/cadastrarOS")
                ? "border-black m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Criar OS
          </Link>
          <Link
            to="/associarOS"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/associarOS")
                ? "border-black m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Associar OS
          </Link>

          <Link
            to="/registrar"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/registrar")
                ? "border-black m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Registrar
          </Link>

          <Link to="/">
            <img src={logo} alt="Logo" className="h-20 " />
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/tag-view"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/tag-view")
                  ? "border-black m-auto pb-3 "
                  : "m-auto pb-3"
              }`}
            >
              Visualizar Tags
            </Link>

            <Link
              to="/visualizar"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/visualizar")
                  ? "border-black m-auto pb-3 "
                  : "m-auto pb-3"
              }`}
            >
              Visualizar Registros
            </Link>

            <Link
              to={"/viewOS"}
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/viewOS")
                  ? "border-black m-auto pb-3 "
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
