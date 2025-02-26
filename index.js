//require("express-async-errors");
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const path = require("path")
const { clienteRouter, clienteViewRouter } = require("./routers")
//Servicios

//Configuraciones y constantes
const port = process.env.PORT;

//Inicio de app
const app = express();
//mongoDBConfig.verificarConexionAMOngoDB();
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));


//Middlewares
app.use(express.json());
app.set("view engine", "ejs");

app.use("/api", clienteRouter);

app.use("/", clienteViewRouter);



app.listen(port, () => {
 console.log(`http://localhost:${port}`)
})