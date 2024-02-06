import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const OrderView = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteConfirmationModalIsOpen, setDeleteConfirmationModalIsOpen] =
    useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8082/orders")
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
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

  const openDeleteConfirmationModal = () => {
    setDeleteConfirmationModalIsOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModalIsOpen(false);
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(
        `http://localhost:8082/orders/${selectedOrder.id_order}`
      );
      const updatedOrders = orders.filter(
        (order) => order.id_order !== selectedOrder.id_order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setSelectedOrder(null);
      setModalIsOpen(false);
      closeDeleteConfirmationModal();
    }
  };

  return (
    <div className="m-auto mt-32 flex ml-auto flex-col max-sm:ml-0 items-center justify-center p-2">
      <h2 className="text-2xl font-bold mb-4 ">Ordens de Serviço</h2>
      <ul className="flex flex-wrap  gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ">
        {orders.map((order) => (
          <li key={order.id_order}>
            <button
              onClick={() => openModal(order)}
              className="p-6 bg-white border border-gray-300 rounded-lg shadow-md   hover:bg-gray-100"
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
          <h2 className="text-2xl font-bold mb-4">
            Detalhes da Ordem de Serviço
          </h2>
          {selectedOrder && (
            <div>
              <p className="font-bold">ID da Ordem: {selectedOrder.id_order}</p>
              <p>Descrição: {selectedOrder.description}</p>

            
                <ul>
                  {selectedOrder.users.map((user) => (
                    <li key={user.name}>
                      <p className="font-bold">Usuário Associado: {user.name}</p>
                      {/* Adicione outros detalhes do usuário conforme necessário */}
                    </li>
                  ))}
                </ul>
            </div>
          )}
          <div className="flex justify-center mr-5 gap-4 mt-8">
            <button
              onClick={openDeleteConfirmationModal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
            >
              Finalizar OS
            </button>
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            >
              Fechar
            </button>
          </div>
        </div>
        <Modal
          isOpen={deleteConfirmationModalIsOpen}
          onRequestClose={closeDeleteConfirmationModal}
          contentLabel="Confirmar Exclusão"
          className="bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
          overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-4">
              Tem certeza que deseja finalizar esta Ordem de Serviço?
            </p>
            <div className="flex justify-end">
              <button
                onClick={deleteOrder}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={closeDeleteConfirmationModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      </Modal>
    </div>
  );
};

export default OrderView;
