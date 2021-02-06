require('dotenv').config({  
    path: process.env.NODE_ENV=== "DEVELOPMENT" ? ".env.local" : ".env"
});
  
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(routes);
app.listen(process.env.PORT || 8080)

const DATABASE_URL = process.env.APP_DATABASE_URL;

const db_url = DATABASE_URL;

mongoose.connect(
  db_url, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.log("Erro de conexão com o Mongoose. " + err.message);
});

mongoose.connection.once('open', () => {
  console.log("Conectado ao MongoDB");
});
