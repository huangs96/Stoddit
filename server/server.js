const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const registerRoutes = require("./routes/register.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => 
  res.send("working")
);

let users = [];

const addUser = (userID, socketID) => {
  if (users.length > 0) {
    if (users.some(user => user.userID === userID)) {
      console.log('exists---');
      return;
    } else {
      users.push({userID, socketID});
    }
  } else {
    users.push({userID, socketID});
  };
};

const removeUser = (socketID) => {
  users = users.filter((user) => user.socketID !== socketID);
};

const getUser = (participants) => {
  // console.log('participants---', participants);
  const userData = users.find(user => participants.some(participant => participant.account_id === user.userID));
  return userData;
};

/* ------ Socket Server ------ */
//Run when connected
io.on("connection", (socket) => {
  console.log(`newsocketconnection: ${socket.id}`);
  
  socket.on('liveUsers', (userID) => {
    addUser(userID, socket.id);
    io.emit('getUsers', users);
    io.emit('getUserMessage', `${userID} has joined!`);
  });

  //runs when client disconnects
  socket.on("disconnect", () => {
    removeUser(socket.id);
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
app.use("/chat", chatRoutes(io, getUser));
/* --------------------------------- */

/* ------ Setting Routes ------ */
//User
app.use("/users", userRoutes);
/* --------------------------------- */

const port = process.env.PORT || 5000;

server.listen(port, () => console.log("Server running on port 5000"));