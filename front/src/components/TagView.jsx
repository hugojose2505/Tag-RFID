import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TagView = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8082/tags/')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

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
        {tags.map(tag => (
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
        className=" bg-white p-6 rounded-lg shadow-lg mx-auto my-32 max-w-screen-md"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Informações da Tag</h2>
          {selectedTag && (
            <div>
              <p className='font-bold'>Tag: {selectedTag.tag}</p>
              <p >Nome: {selectedTag.name}</p>
              <p>CPF: {selectedTag.cpf}</p>
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

export default TagView;
