const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const registerRoutes = require("./routes/register.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const tickerRoutes = require("./routes/ticker.routes");
const userRoutes = require("./routes/user.routes");
const socketHelper = require('./helpers/socketHelpers');
const http = require("http");
const { Server } = require("socket.io");
const LiveUserContainer = require("./classes/usersClass");

// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//   credentials: {
//     accessKey: accessKey,
//     secretAccessKey: secretAccessKey
//   },
//   region: bucketRegion
// });

const app = express();

app.use(
  cookieParser()
);
  
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
  

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => 
res.send("working")
);

// new server for socket

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
/* ------ Socket Server ------ */
let users = new LiveUserContainer;

//Run when connected
io.on("connection", (socket) => {

  console.log(`newsocketconnection: ${socket.id}`);
  socket.on('liveUsers', (userID) => {
    users.addUser(userID, socket.id);
    io.emit('getUsers', users);
    // io.emit('getUserMessage', `${userID} has joined!`);
  });
  socket.on('chatMessage', messageData => {
    io.emit(messageData);
  });
  socket.on('joinLiveChatroom', liveChatroomData => {
    io.emit('getLiveChatroomData', liveChatroomData.chatroomData);
    console.log(users);
  });
  socket.on('logout', () => {
    // console.log('logout1', socket);
    // console.log('logout2', users);
    users.removeUser(socket.id);
    io.emit('getUsers', users);
    console.log('logout1', users);
  });
  //runs when client disconnects
  socket.on("disconnect", () => {
    users.removeUser(socket.id);
    io.emit('getUsers', users);
    // io.emit('getUsers', 'User has left the chat.');
  });

});
/* --------------------------------- */


/* ------ Auth Routes ------ */
app.use("/register", registerRoutes);
app.use("/login", authRoutes);
/* --------------------------------- */

/* ------ Chat Routes ------ */
app.use("/chat", chatRoutes(io, users));
app.use("/tickers", tickerRoutes(io));
/* --------------------------------- */

/* ------ Setting Routes ------ */
app.use("/users", userRoutes);
/* --------------------------------- */
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));