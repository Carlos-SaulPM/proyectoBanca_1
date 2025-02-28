const express = require("express");
const router = express.Router();

const { clienteViewController } = require("../controllers");

router.get("/", clienteViewController.obtenerClientes);
router.get("/clientes/eliminar/:id", clienteViewController.eliminarCliente);


module.exports = router;