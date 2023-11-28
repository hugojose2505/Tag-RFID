import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';
import Modal from 'react-modal';
import "../index.css";

const TagForm = () => {
  const [currentTag, setCurrentTag] = useState('Loading...');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const socketUrl = 'ws://localhost:8082/';
  const { lastMessage} = useWebSocket(socketUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setCurrentTag(data.tag);
    }
  }, [lastMessage]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSavedMessage(''); // Clear saved message when closing the modal
  };

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
  };

  const handleSave = async () => {
    try {
      // Fazer uma chamada para o endpoint "/associate-tag" no backend usando Axios
      await axios.post('http://localhost:8082/associate-tag/', {
        tag: currentTag,
        name: name,
        cpf: cpf,
      });

      // Exibir mensagem de sucesso para o usuário
      setSavedMessage('Tag criada e associada com sucesso!');
      openModal();
    } catch (error) {
      // Se houver um erro, exibir a mensagem de erro ou lidar com ele conforme necessário
      console.error('Error processing data:', error);
      setSavedMessage('Erro ao Salvar a Tag!');
      openModal();
    }
  };

  return (
      <div className="my-8 container mx-5 p-8 bg-slate-300 border border-gray-300 rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Cadastro de Tag</h1>
        <p id="currentTag" className="text-xl mb-4 font-bold">RFID Tag: {currentTag}</p>
  
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={handleCpfChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save Tag
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Tag Saved"
          className="bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
          overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <p>{savedMessage}</p>
          <button onClick={closeModal} className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center">Close</button>
        </Modal>
  
        
      </div>
    );
  };

export default TagForm;
