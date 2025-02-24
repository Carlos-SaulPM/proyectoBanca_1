//require("express-async-errors");
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

const {clienteRouter} = require("./routers")
//Servicios

//Configuraciones y constantes
const port = process.env.PORT;

//Inicio de app
const app = express();
//mongoDBConfig.verificarConexionAMOngoDB();
app.use(morgan("tiny"));

//Middlewares
app.use(express.json());

app.use("/api", clienteRouter);

app.get("/", (req,res) => {
 res.status(200).json({ mensaje: "Hola Mundo" });
});


app.listen(port, () => {
 console.log(`http://localhost:${port}`)
})