import React, { useState, useEffect } from "react";
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
    return location.pathname === path;
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
      className={`p-0  fixed w-full flex flex-col lg:flex-row ml- max-sm:ml-0  ${
        isScrolled ? "bg-white border border-gray-200 max-sm:hidden" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between w-full">
        <button
          className="max-sm:flex lg:hidden text-black focus:outline-none mt-2 mr-0 "
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <CiMenuBurger size={30} />
          ) : (
            <CiMenuBurger
              size={30}
              className="max-sm:flex  lg:hidden text-black focus:outline-none mt-2 mr-0 "
            />
          )}
        </button>

        <div
          className={`lg:flex lg:space-x-4 text-center flex-col lg:flex-row gap-8 max-sm:p-8 max-lg:bg-white  ${
            isMenuOpen ? "flex fixed max-sm:bg-white" : "hidden"
          } top-16 left-0 right-0 p-5`}
        >
          <Link
            to="/tag-form"
            className={`text-black border-b-2  hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/tag-form")
                ? "border-black m-auto pb-3 "
                : "m-auto pb-3 border-transparent"
            }`}
          >
            Cadastrar Tag
          </Link>

          <Link
            to="/cadastrarOS"
            className={`text-black border-b-2  hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/cadastrarOS")
                ? "border-black  m-auto pb-3 "
                : "m-auto pb-3 border-transparent"
            }`}
          >
            Criar OS
          </Link>
          <Link
            to="/associarOS"
            className={`text-black border-b-2  hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/associarOS")
                ? "border-black  m-auto pb-3 "
                : "m-auto pb-3 border-transparent"
            }`}
          >
            Associar OS
          </Link>

          <Link
            to="/registrar"
            className={`text-black border-b-2  hover:border-gray-300 px-4 py-2 rounded font-bold ${
              isPageActive("/registrar")
                ? "border-black  m-auto pb-3 "
                : "m-auto pb-3 border-transparent"
            }`}
          >
            Registrar
          </Link>

          <Link to="/">
            <img src={logo} alt="Logo" className="h-20 m-auto max-lg:hidden" />
          </Link>

         
            <Link
              to="/tag-view"
              className={`text-black border-b-2  hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/tag-view")
                  ? "border-black  m-auto pb-3 "
                  : "m-auto pb-3 border-transparent"
              }`}
            >
              Visualizar Tags
            </Link>

            <Link
              to="/visualizar"
              className={`text-black border-b-2  hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/visualizar")
                  ? "border-black  m-auto pb-3 "
                  : "m-auto pb-3 border-transparent"
              }`}
            >
              Visualizar Registros
            </Link>

            <Link
              to={"/viewOS"}
              className={`text-black border-b-2  hover:border-gray-300 px-4 py-2 rounded font-bold ${
                isPageActive("/viewOS")
                  ? "border-black  m-auto pb-3 "
                  : "m-auto pb-3 border-transparent"
              }`}
            >
              Visualizar OS
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
