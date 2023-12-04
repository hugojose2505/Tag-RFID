import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8082/orders')
      .then(response => {
        setOrders(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalIsOpen(false);
  };

  return (
    <div className="my-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Ordens de Serviço</h2>
      <ul className="flex gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ">
        {orders.map(order => (
          <li key={order.id_order}>
            <button
              onClick={() => openModal(order)}
              className="p-4 bg-white border border-gray-300 rounded-md shadow-md   hover:bg-gray-100"
            >
              {order.description}
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes da Ordem de Serviço"
        className="bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Detalhes da Ordem de Serviço</h2>
          {selectedOrder && (
            <div>
              <p className='font-bold'>ID da Ordem: {selectedOrder.id_order}</p>
              <p>Descrição: {selectedOrder.description}</p>
              <p className='font-bold'>Usuários Associados: {selectedOrder.users.map((user) => user.user.name).join(', ')}</p>
            </div>
          )}
          <button onClick={closeModal} className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center">
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderView;
