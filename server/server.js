const express = require('express');
const userRoutes = require('./users/routes');



const app = express();

app.get('/', (req, res) => 
  res.send('working')
);

app.use('/home/user', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port 4000'));