require("express-async-errors");
require("dotenv/config"); //configurações de var de ambiente .env

//const migrationsRun = require("./database/sqlite/migrations");
const express = require('express');
const cors = require("cors");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");
const routes = require("./routes"); //end-points da api
const uploadConfiguration = require("./config/upload");

//migrationsRun();

const app = express();
app.use(express.json());//ativa o middleware que analisa o body das requests JSON e o torna acessível por request.body
app.use(cookieParser());

//app.use(cors()); //ativa o middleware cors
app.use(cors({
  origin: ["http://localhost:3333","http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true, //para utilizar o cookie
}));

app.use("/files", express.static(uploadConfiguration.UPLOADS_FOLDER)); //requests de /files serão redirecionados para a pasta definida em config

app.use(routes); //add as rotas definidas ao servidor express

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
  
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //inicia o servidor na porta