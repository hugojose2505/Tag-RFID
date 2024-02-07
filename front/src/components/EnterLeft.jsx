import React, { useState, useEffect } from "react";
import axios from "axios";
import useWebSocket from "react-use-websocket";

const EnterLeft = () => {
  const [id_user, setIdUser] = useState("");
  const [tag, setTag] = useState("");
  const [userName, setUserName] = useState("");
  const [userCpf, setUserCpf] = useState("");
  const [isCardRead, setIsCardRead] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [titleRegister, setTitleRegister] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
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
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/tags/${tag}`);
        setUserName(response.data.name);
        setUserCpf(response.data.cpf);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const sendRequest = async () => {
      try {
        const response = await axios.put("http://localhost:8082/register/", {
          tag,
          orderId: selectedOrder.id_order,
        });
        setTitleRegister(response.data.message);
        setSelectedOrder(null);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const sendRequest2 = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/ordersByTag/${tag}`);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (isCardRead && tag !== "") {
      sendRequest2();
      fetchUserData();
    }
    if (selectedOrder && tag !== "") {
      sendRequest();
    }
    if (selectedOrder) {
      handleOrderSelect(selectedOrder.orderId);
    }
  }, [isCardRead, id_user, tag, selectedOrder]);

  const handleOrderSelect = (orderId) => {
    const selected = orders.find((order) => order.id_order === orderId);
    setSelectedOrder(selected);
  };

  return (

    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md">
    <h1 className="text-3xl font-bold mb-6 text-center text-black">Leitura do Cartão</h1>
    <div className="bg-gray-200 p-6 rounded-md">
      {isCardRead && showTag && tag &&  (
        <div className="border p-6 my-4 rounded-md bg-white">
          <p className="text-xl font-bold mb-4 text-indigo-700">{titleRegister}</p>
          <p className="mb-2">
            <span className="font-semibold">Tag:</span> {tag}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Nome:</span> {userName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">CPF:</span> {userCpf}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Data da Leitura:</span> {new Date().toLocaleDateString()}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Hora da Leitura:</span> {new Date().toLocaleTimeString()}
          </p>
  
          <div className="mt-6 items-center justify-center ">
            <label className="block mb-2 text-gray-700">Selecionar OS:</label>
            <select
              value={selectedOrder ? selectedOrder.id_order : ""}
              onChange={(e) => {
                const orderId = e.target.value;
                const selected = orders.find((order) => order.id_order === orderId);
                setSelectedOrder(selected);
              }}
              className="w-full p-3 border rounded-md bg-gray-100"
            >
              <option value="" className="text-gray-600">Selecione OS</option>
              {orders.map((order) => (
                <option key={order.id_order} value={order.id_order} className="text-indigo-700">
                  {order.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default EnterLeft;
