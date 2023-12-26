import React, { useState, useEffect } from "react";
import axios from "axios";
import useWebSocket from "react-use-websocket";

const EnterLeft = () => {
  const [id_user, setIdUser] = useState("");
  const [tag, setTag] = useState("");
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("");
  const [isCardRead, setIsCardRead] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [titleRegister, setTitleRegister] = useState("");

  const socketUrl = "ws://localhost:8082/";
  const { lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setIdUser(data.id_user);
      setTag(data.tag);
      if (data.tag !== tag) {
        setIsCardRead(true);
        setShowTag(true);
        setTimeout(() => {
          setShowTag(false);
          setIsCardRead(false);
        }, 10000);
      }
    }
  }, [lastMessage, tag, id_user]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        
        const response = await axios.put("http://localhost:8082/register/", {
          tag,
        });
        
        setTitleRegister(response.data.message);
        setUser(response.data.data.id_user);
      
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const sendRequest2 = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/tags/`);
        const userWithTag = response.data.find((user) => user.id === response.data.data.id_user);
        if (userWithTag) {
          setUserName(userWithTag.name);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isCardRead) {
      sendRequest();
      sendRequest2();
    }
    
  }, [isCardRead, tag,id_user, userName]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Leitura do Cartão</h1>
      <div className="bg-gray-200 p-4 rounded-md">
        {isCardRead && showTag &&  (
          <div className="border p-4 my-4 rounded-md">
            <p className="text-xl font-bold mb-2">{titleRegister}</p>
            <p>ID do Usuário: {user}</p>
            <p>ID do Cartão: {user.user}</p>
            <p>Tag: {tag}</p>
            <p>Nome do Usuário: {userName}</p>
            <p>Data da Leitura: {new Date().toLocaleDateString()}</p>
            <p>Hora da Leitura: {new Date().toLocaleTimeString()}</p>
         
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterLeft;
