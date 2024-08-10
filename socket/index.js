const { Server } = require("socket.io");

const io = new Server(8000, {
    cors: {
        origin: process.env.ALLOWED_ORIGIN_1 || "*",
    },
});

let users = [];

const addUser = (userData, socketId) => {
    !users.some((user) => user._id === userData._id) &&
        users.push({ ...userData, socketId });
};

const getUser = (userId) => {
    return users.find((user) => user._id === userId);
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("addUser", (userData) => {
        addUser(userData, socket.id);
        console.log(users);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", (data) => {
        const user = getUser(data.recieverDataId || data.recieverId);
        io.to(user?.socketId).emit("getMessage", data);
    });

    //disconnect
    socket.on("userDisconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

console.log(`Socket is running on port 8000`);
