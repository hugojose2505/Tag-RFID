// ReadingsPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const RegView = () => {
  const [readings, setReadings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReading, setSelectedReading] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8082/register/")
      .then((response) => {
        setReadings(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter leituras:", error);
      });
  }, []);
  
  const openModal = (reading) => {
    setSelectedReading(reading);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedReading(null);
    setModalIsOpen(false);
  };

  

  return (
    <div className=" m-auto mt-32 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 items-center justify-center text-center">
        Registro de Entrada e saida
      </h1>
      <ul className="flex flex-wrap gap-2 mb-4 ml-4">
        {readings.map((reading) => (
          <li
            key={reading.id_register}
            className="border rounded-lg p-4 mb-4 cursor-pointer bg-white hover:bg-gray-200"
            onClick={() => openModal(reading)}
          >
            <p className="mb-2">
              <span className="font-bold">Nome:</span> {reading.user.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Entrada:</span> {reading.created_at}
            </p>
            <p className="mb-2">
              <span className="font-bold">Saída:</span> {reading.exit}
            </p>
            <p className="mb-2">
              <span className="font-bold">Tag:</span> {reading.user.tag}
            </p>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className=" bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedReading && (
          <div className="">
            <p>
              <span className="font-bold">ID do Usuário:</span>{" "}
              {selectedReading.id_user}
            </p>
            <p>
              <span className="font-bold">Nome:</span>{" "}
              {selectedReading.user.name}
            </p>
            <p>
              <span className="font-bold">CPF:</span> {selectedReading.user.cpf}
            </p>
            <p>
              <span className="font-bold">Data da Entrada:</span>{" "}
              {selectedReading.created_at}
            </p>
            <p>
              <span className="font-bold">Data da Saida</span>{" "}
              {selectedReading.exit}
            </p>
            <p>
              <span className="font-bold">ID do Registro:</span>{" "}
              {selectedReading.id_register}
            </p>
            {/* Adicione outros campos conforme necessário */}
            <button
              onClick={closeModal}
              className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
            >
              Fechar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RegView;
