// src/components/Navbar.js
import React, { useState,useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 50; 

      setIsScrolled(scrollPosition > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`p-0  fixed w-full flex flex-col lg:flex-row ml-0 max-sm:ml-0 ${
        isScrolled ? "bg-white border border-gray-200 max-sm:hidden" : "" // Change "your-color" to your desired color class
      }`}
    >
      <div className="container mx-auto flex items-center justify-between w-full">
        <button
          className="max-sm:flex lg:hidden text-black focus:outline-none mt-2 mr-0 "
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            // Icon for Close Menu
            <CiMenuBurger size={30} />
          ) : (
            // Icon for Open Menu
            <CiMenuBurger
              size={30}
              className="max-sm:flex lg:hidden text-black focus:outline-none mt-2 mr-0 "
            />
          )}
        </button>

      <div
        className={`lg:flex lg:space-x-4 flex-col lg:flex-row gap-8 max-sm:p-8 max-sm:bg-white ${
          isMenuOpen ? "flex fixed max-sm:bg-white" : "hidden"
        } top-16 left-0 right-0 p-5`}
      >
          <Link
            to="/tag-form"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
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
                ? "border-black  m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Criar OS
          </Link>
          <Link
            to="/associarOS"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/associarOS")
                ? "border-black  m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Associar OS
          </Link>

          <Link
            to="/registrar"
            className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/registrar")
                ? "border-black  m-auto pb-3 "
                : "m-auto pb-3"
            }`}
          >
            Registrar
          </Link>

          <Link to="/">
            <img src={logo} alt="Logo" className="h-20 m-auto max-sm:hidden" />
          </Link>

          <div className="flex max-sm:flex-col space-x-4">
            <Link
              to="/tag-view"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/tag-view")
                  ? "border-black  m-auto pb-3 "
                  : "m-auto pb-3"
              }`}
            >
              Visualizar Tags
            </Link>

            <Link
              to="/visualizar"
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/visualizar")
                  ? "border-black  m-auto pb-3 "
                  : "m-auto pb-3"
              }`}
            >
              Visualizar Registros
            </Link>

            <Link
              to={"/viewOS"}
              className={`text-black border-b-2 border-transparent hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/viewOS")
                  ? "border-black  m-auto pb-3 "
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
