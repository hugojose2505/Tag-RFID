const WebSocketServer = require("websocket").server;

const handleWebSocket = (server) => {
  const wsServer = new WebSocketServer({ httpServer: server });

  let currentTag = "";
  let tagTimeout;

  wsServer.on("request", (request) => {
    const client = request.accept(null, request.origin);
    client.on("message", (message) => {
      if (message.type === "utf8") {
        const data = message.utf8Data.split(",");
        currentTag = data[0];
        
        console.log(`Tag RFID recebida: ${currentTag}`);
        client.sendUTF(JSON.stringify({ tag: currentTag }));

        // Defina um timeout para limpar a tag após 5 segundos (5000 milissegundos)
        clearTimeout(tagTimeout);
        tagTimeout = setTimeout(() => {
          currentTag = "";
          console.log("Tag RFID limpa");
          client.sendUTF(JSON.stringify({ tag: "" }));
        }, 5000);
      }
    });

    const interval = setInterval(() => {
      client.sendUTF(JSON.stringify({ tag: currentTag }));
    }, 3000);

    client.on("close", () => {
      console.log("Conexão fechada");
      clearInterval(interval);
      clearTimeout(tagTimeout); // Limpar o timeout quando a conexão é fechada
    });
  });
};

module.exports = { handleWebSocket };
