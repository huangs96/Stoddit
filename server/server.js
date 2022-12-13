const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const registerRoutes = require('./routes/register.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
// const socket = require('socket-io');

const app = express();

app.use(
  cookieParser()
);

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => 
  res.send('working')
);


/* ------ Auth Routes ------ */
//register
app.use('/register', registerRoutes);

//login
app.use('/login', authRoutes);

/* ------ Chat Routes ------ */
// app.use('/chat', chatRoutes);

/* ------ Setting Routes ------ */
//User
app.use('/users', userRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port 5000'));