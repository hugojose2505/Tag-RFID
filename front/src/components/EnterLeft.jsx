import React, { useState, useEffect } from "react";
import axios from "axios";
import useWebSocket from "react-use-websocket";

const EnterLeft = () => {
  const [id_user, setIdUser] = useState("");
  const [tag, setTag] = useState("");
  const [isCardRead, setIsCardRead] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [action, setAction] = useState("");

  const socketUrl = "ws://localhost:8082/";
  const { lastMessage } = useWebSocket(socketUrl);

  const determineAction = (data) => {
    // Se o horário estiver presente, considera como saída, caso contrário, considera como entrada
    return data.exit ? "Saida" : "Entrada";
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      setIdUser(data.id_user);
      setTag(data.tag);

      // A leitura do cartão ocorreu apenas se o valor de "tag" for diferente
      // do valor anterior.
      if (data.tag !== tag) {
        setIsCardRead(true);
        setShowTag(true);

        // Define um temporizador para esconder a tag após 10 segundos
        setTimeout(() => {
          setShowTag(false);
          setIsCardRead(false);
        }, 10000);
        const inferredAction = determineAction(data);
        setAction(inferredAction);
      }
    }
  }, [lastMessage, tag]);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await axios.put("http://localhost:8082/register/", { tag });
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isCardRead) {
      sendRequest();
    }
  }, [isCardRead, tag]);

  return (
    <div>
    {/* Nova parte para exibir a ação */}
    {isCardRead && showTag && (
      <div>
        <p>Leitura do cartão: {action}</p>
        <p>ID do Usuário: {id_user}</p>
        <p>Tag: {tag}</p>
      </div>
    )}
  </div>
  );
};

export default EnterLeft;
