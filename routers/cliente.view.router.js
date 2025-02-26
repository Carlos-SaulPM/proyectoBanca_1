const express = require("express");
const router = express.Router();

const { clienteViewController } = require("../controllers");

router.get("/", clienteViewController.obtenerClientes)
router.get("/modificar", clienteViewController.modificarCliente);


module.exports = router;