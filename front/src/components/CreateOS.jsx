import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const CreateOrder = () => {
  const [orderDescription, setOrderDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorModalOpen(false); 
    setOrderId(null);
  };

  const handleCreateOrder = async () => {
    if (!orderDescription.trim()) {
        setSavedMessage('Por favor, forneça uma descrição para criar a Ordem de Serviço.');
        setErrorModalOpen(true);
        return;
      }
  
    try {
      const response = await axios.post('http://localhost:8082/createOS/', {
        description: orderDescription,
      });

      const createdOrderId = response.data.data.id_order;
      console.log('Created order ID:', createdOrderId);
      setOrderId(createdOrderId);

      setSavedMessage(`OS criada com sucesso! ID: ${createdOrderId}`);
      openModal();
    } catch (error) {
      console.error('Error:', error.response.data);
      setSavedMessage('Erro ao criar OS!');
      openModal();
    }
  };

  return (
    <div className=" m-auto ml-4 mr-4  p-8 bg-slate-300 border border-gray-300 rounded-md mt-52">
      <h1 className="text-3xl font-bold mb-4">Criar Ordem de Serviço</h1>

      <div className="mb-4">
        <label htmlFor="orderDescription" className="block text-sm font-medium text-gray-700">
          Descrição da Ordem de Serviço:
        </label>
        <input
          type="text"
          id="orderDescription"
          className="mt-1 p-2 border rounded-md"
          value={orderDescription}
          onChange={(e) => setOrderDescription(e.target.value)}
        />
      </div>
      <button className=" bg-blue-500 text-white py-2 px-4 rounded" onClick={handleCreateOrder}>
        Criar Ordem de Serviço
      </button>

      <Modal
        isOpen={isModalOpen || errorModalOpen}
        onRequestClose={closeModal}
        contentLabel="Tag Saved"
        className="bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <p className='font-bold'>{savedMessage}</p>
        <button onClick={closeModal} className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center">
          Fechar
        </button>
      </Modal>
    </div>
  );
};

export default CreateOrder;
