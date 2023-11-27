import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';
import "../index.css";

const TagForm = () => {
  const [currentTag, setCurrentTag] = useState('Loading...');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const socketUrl = 'ws://localhost:8082/';
  const { lastMessage} = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setCurrentTag(data.tag);
    }
  }, [lastMessage]);

  const handleNameChange = (e) => {
    setName(e.target.value);
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
      setSavedMessage('Tag associated and saved in the database!');
    } catch (error) {
      // Se houver um erro, exibir a mensagem de erro ou lidar com ele conforme necessário
      console.error('Error processing data:', error);
      setSavedMessage('Error saving tag in the database.');
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
  
        {/* Span para mostrar a mensagem de sucesso ou erro */}
        {savedMessage && <span className=" p-2 text-green-600">{savedMessage}</span>}
      </div>
    );
  };

export default TagForm;
