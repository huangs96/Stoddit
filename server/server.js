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
})

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => 
  res.send("working")
);

/* ------ Socket Server ------ */
//Run when connected
io.on("connection", (socket) => {
  console.log(`newsocketconnection: ${socket.id}`);

  socket.emit("message", "welcome to Stoddit");
  //broadcast when user connects
  socket.broadcast.emit("message", "A user has joined");
  //runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  // listen for chatMessage
  socket.on('chatMessage', (message) => {
    console.log(message);
    // io.emit('message', message);
  })
});


/* ------ Auth Routes ------ */
//register
app.use("/register", registerRoutes);
//login
app.use("/login", authRoutes);


/* ------ Chat Routes ------ */
app.use("/chat", chatRoutes);


/* ------ Setting Routes ------ */
//User
app.use("/users", userRoutes);




const port = process.env.PORT || 5000;

server.listen(port, () => console.log("Server running on port 5000"));