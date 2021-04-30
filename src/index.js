require('dotenv').config({  
    path: process.env.NODE_ENV=== "DEVELOPMENT" ? ".env.local" : ".env"
});
  
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const rootRoutes = require('./routes/routes');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/api/', rootRoutes);
app.use('/api/user', userRoutes);
app.listen(process.env.PORT || 8080)

const DATABASE_URL = process.env.APP_DATABASE_URL;

mongoose.connect(
  DATABASE_URL, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.log("Erro de conexão com o Mongoose. " + err.message);
});
