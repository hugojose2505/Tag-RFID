// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/tag-form" className="text-white">Cadastrar Tag</Link>
          <Link to="/tag-view" className="text-white">Visualizar Tags</Link>
          <Link to ="/registrar" className="text-white">Registrar</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
