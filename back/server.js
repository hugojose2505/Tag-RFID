const express = require("express");
const http = require("http");
const cors = require("cors");
const { handleWebSocket } = require("./websocket/websocket");
const tagRoutes = require("./routes/routes");
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    methods: "*",
    exposedHeaders: "Authorization",
  })
);
app.use(express.json());
app.use("/", tagRoutes); 

const port = 8082;
server.listen(port, () => {
  console.log(`Server está executando na porta ${port}`);
});

handleWebSocket(server);
