const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const userRoutes = require('./routes/user.routes');


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

app.use('/users', userRoutes);
// app.use('/login');


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port 5000'));