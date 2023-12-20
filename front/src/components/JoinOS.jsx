import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function JoinOS() {
  const [orderId, setOrderId] = useState('');
  const [userId, setUserId] = useState('');
  const [orders, setOrders] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSavedMessage('');
  };

  useEffect(() => {
    fetchOrders();
    fetchUserIds();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8082/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response.data);
    }
  };

  const fetchUserIds = async () => {
    try {
      const response = await axios.get('http://localhost:8082/tags/');
      setUserIds(response.data);
    } catch (error) {
      console.error('Error fetching user IDs:', error.response.data);
    }
  };

  const handleAssociate = async () => {
    try {
      const response = await axios.post('http://localhost:8082/joinOS/', {
        orderId,
        userId,
      });
      console.log(response.data);
     
      setSavedMessage('Ordem associada com sucesso!');
      openModal();
      fetchOrders();
      setUserId('');
    } catch (error) {
      console.error('Error associating order:', error.response.data);
      setSavedMessage('Erro ao associar ordem!');
      openModal();
    }
  };

  return (
    <div className="m-auto ml-4 mr-4  p-8 bg-slate-300 border border-gray-300 rounded-lg mt-52 max-sm:ml-0 max-sm:mr-0 ">
        <h1 className="text-3xl font-bold mb-4">Associar OS a um Usuário</h1>
        <div className="mt-8">
        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
          Selecionar Ordem:
        </label>
        <select
          id="orderId"
          className="mt-1 p-2 border rounded-md"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        >
          <option value="" disabled>Selecione uma opção</option>
          {orders.map((order) => (
            <option key={order.id_order} value={order.id_order}>
              {order.description} (ID: {order.id_order})
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          Selecionar Usuário:
        </label>
        <select
          id="userId"
          className="mt-1 p-2 border rounded-md"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="" disabled>Selecionar funcionario</option>
          {userIds.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} (Tag: {user.tag}, CPF: {user.cpf})
            </option>
          ))}
        </select>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4" onClick={handleAssociate}>
        Associar Ordem de Serviço
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Tag Saved"
        className="bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <p className='text-1xl font-bold'>{savedMessage}</p>
        <button onClick={closeModal} className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center">
          Close
        </button>
      </Modal>
    </div>
  );
}

export default JoinOS;
