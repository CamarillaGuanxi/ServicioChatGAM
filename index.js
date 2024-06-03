const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

let chatgroups = [];

let chatClase = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatgroups);
  });
  socket.on("getAllClases", () => {
    socket.emit("claseList", chatClase);
  });
  socket.on("createNewClase", (currentGroupName, id) => {
    chatgroups.unshift({
      id: id,
      currentGroupName,
      messages: [],
    });
    socket.emit("claseList", chatClase);
  });
  socket.on("createNewGroup", (currentGroupName, id) => {
    chatgroups.unshift({
      id: id,
      currentGroupName,
      messages: [],
    });
    socket.emit("groupList", chatgroups);
  });

  socket.on("findGroup", (currentGroupName, id) => {
    var filteredGroup = chatgroups.filter((item) => item.id === id);
    if (filteredGroup.length == 0) {
      chatgroups.unshift({
        id: id,
        currentGroupName,
        messages: [],
      });
    }
    filteredGroup = chatgroups.filter((item) => item.id === id);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });

  socket.on("findClase", (currentGroupName, id) => {
    var filteredGroup = chatClase.filter((item) => item.id === id);
    if (filteredGroup.length == 0) {
      chatClase.unshift({
        id: id,
        currentGroupName,
        messages: [],
      });
    }
    filteredGroup = chatClase.filter((item) => item.id === id);
    socket.emit("foundClase", filteredGroup[0].messages);
  });
  socket.on("newClasemessage", (data) => {

    const { currentChatMesage, groupIdentifier, currentUser, timeData, color } = data;
    var filteredGroup = chatClase.filter((item) => item.id === groupIdentifier);
    if (filteredGroup.length == 0) {
      chatClase.unshift({
        id: groupIdentifier,
        currentGroupName,
        messages: [],
      });


    }
    filteredGroup = chatClase.filter((item) => item.id === groupIdentifier);

    const newMessage = {
      id: createUniqueId(),
      text: currentChatMesage,
      currentUser,
      time: `${timeData.hr}:${timeData.mins}`,
      color
    };
    // Emitir el nuevo mensaje al grupo correspondiente
    socket.to(groupIdentifier).emit("groupClaseMessage", newMessage);


    filteredGroup[0].messages.push(newMessage);

    // Emitir la lista de mensajes actualizada a todos los clientes
    socketIO.emit("claseList", chatClase);
  });

  app.get("/api", (req, res) => {
    res.json(chatgroups);
  });

  socket.on("newChatMessage", (data) => {

    const { currentChatMesage, groupIdentifier, currentUser, timeData, color, currentGroupName } = data;
    var filteredGroup = chatgroups.filter((item) => item.id === groupIdentifier);
    if (filteredGroup.length == 0) {
      chatgroups.unshift({
        id: groupIdentifier,
        currentGroupName,
        messages: [],
      });


    }
    filteredGroup = chatgroups.filter((item) => item.id === groupIdentifier);

    const newMessage = {
      id: createUniqueId(),
      text: currentChatMesage,
      currentUser,
      time: `${timeData.hr}:${timeData.mins}`,
      color
    };
    console.log(newMessage)
    // Emitir el nuevo mensaje al grupo correspondiente
    socket.to(groupIdentifier).emit("groupChatMessage", newMessage);

    filteredGroup[0].messages.push(newMessage);

    // Emitir la lista de mensajes actualizada a todos los clientes
    socketIO.emit("groupList", chatgroups);
    if (currentUser == "Lider") {
      filteredGroup[0].messages = filteredGroup[0].messages.filter(message => message.id !== newMessage.id || message.text !== newMessage.text);

    }

  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

app.get('/ping', (req, res) => {
  res.send('Pong');
});