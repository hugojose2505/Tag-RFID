import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const TagView = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteConfirmationModalIsOpen, setDeleteConfirmationModalIsOpen] =
    useState(false);

  // Função para abrir o modal de confirmação
  const openDeleteConfirmationModal = () => {
    setDeleteConfirmationModalIsOpen(true);
  };

  // Função para fechar o modal de confirmação
  const closeDeleteConfirmationModal = () => {
    setDeleteConfirmationModalIsOpen(false);
  };

  // Função para confirmar a exclusão
  const confirmDelete = () => {
    deleteTag();
    closeDeleteConfirmationModal();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/tags/")
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);

  const deleteTag = () => {
    if (!selectedTag) {
      return;
    }

    axios.delete(`http://localhost:8082/tags/${selectedTag.id}`).then((response) => {
        // Atualize a lista de tags após a exclusão
        setTags(tags.filter((tag) => tag.id !== selectedTag.id));
        closeModal();
      })
      .catch((error) => {
        console.error("Erro ao deletar a tag:", error);
      });
  };

  const openModal = (tag) => {
    setSelectedTag(tag);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTag(null);
    setModalIsOpen(false);
  };

  return (
    <div className="my-4 flex flex-col ">
      <h2 className="text-2xl font-bold mb-4">Tags Cadastradas</h2>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.tag} className="flex">
            <button
              onClick={() => openModal(tag)}
              className=" hover:bg-gray-100 hover:text-black text-black font-bold py-2 px-4 bg-white border border-gray-300 rounded-md shadow-md"
            >
              {tag.tag}
            </button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Informações da Tag"
        className="bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Informações da Tag</h2>
          {selectedTag && (
            <div>
              <p className="font-bold">Tag: {selectedTag.tag}</p>
              <p>Nome: {selectedTag.name}</p>
              <p>CPF: {selectedTag.cpf}</p>

              {/* Botões de deletar e fechar com modal de confirmação */}
              <div className="flex mt-4">
                <button
                  onClick={() => openDeleteConfirmationModal()}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Deletar Tag
                </button>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 hover.bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal de confirmação */}
        <Modal
          isOpen={deleteConfirmationModalIsOpen}
          onRequestClose={closeDeleteConfirmationModal}
          contentLabel="Confirmar Exclusão"
          className=" sm:p-8 bg-white p-7 rounded-lg justify-center items-center shadow-lg m-auto my-64 max-w-screen-md"
        >
          <p className="text-xl font-semibold mb-4 text-center">
            Tem certeza que deseja deletar esta tag?
          </p>
          <div className="flex justify-center">
            <button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
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
        </Modal>
      </Modal>
    </div>
  );
};

export default TagView;
