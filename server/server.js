const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const registerRoutes = require("./routes/register.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const socketHelper = require('./helpers/socketHelpers');
const socketClass = require('./classes/socketClass');
const http = require("http");
const { Server } = require("socket.io");


const app = express();

app.use(
  cookieParser()
  );
  
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
  
  // new server for socket
  
  const server = http.createServer(app);
  console.log('sockethelper', socketClass.start(http.createServer(app)));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
// console.log('io', io);

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => 
  res.send("working")
);

/* ------ Socket Server ------ */
let users = [];

//Run when connected
io.on("connection", (socket) => {
  
  console.log('users', users);

  console.log(`newsocketconnection: ${socket.id}`);
  
  socket.on('liveUsers', (userID) => {
    console.log('users1', users);
    socketHelper.addUser(users, userID, socket.id);
    console.log('users2', users);
    io.emit('getUsers', users);
    // io.emit('getUserMessage', `${userID} has joined!`);
  });

  socket.on('chatMessage', messageData => {
    io.emit(messageData);
  });

  socket.on('conversationSocket', conversationData => {
    console.log('convodata', conversationData);
    // socket.join(conversationData);
    chatroom = conversationData;
    io.emit(conversationData);
  });

  //need to see how we can avoid different chats receiving different messages

  //runs when client disconnects
  socket.on("disconnect", () => {
    socketHelper.removeUser(users, socket.id);
    io.emit('getUsers', users);
    io.emit('getUsers', 'User has left the chat.');
  });
});
/* --------------------------------- */


/* ------ Auth Routes ------ */
//register
app.use("/register", registerRoutes);
//login
app.use("/login", authRoutes);
/* --------------------------------- */

/* ------ Chat Routes ------ */
app.use("/chat", chatRoutes(io));
/* --------------------------------- */

/* ------ Setting Routes ------ */
//User
app.use("/users", userRoutes);
/* --------------------------------- */

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));