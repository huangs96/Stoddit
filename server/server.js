const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const registerRoutes = require('./routes/register.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');


const app = express();

app.use(cors());

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "stoddit-test session",
    secret: "COOKIE_SECRET",
    //keys: ['key1', 'key2'],
    httpOnly: true
  })
);

app.get('/', (req, res) => 
  res.send('working')
);

//Register Page Route
app.use('/register', registerRoutes);

//Login Page Route
app.use('/login', authRoutes);

//User Page Details
app.use('/users', userRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port 5000'));