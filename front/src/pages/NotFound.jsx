import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const history = useNavigate();
  const backPage = () => {
    history(-1);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background bg-cover bg-no-repeat">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          Oops! Página não encontrada.
        </p>
        <p className="text-gray-500">
          A página que você está procurando pode ter sido removida ou não está
          disponível.
        </p>
        <div className="mt-6">
          <button
            onClick={backPage}
            className="border border-gray-300 bg-slate-50 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
