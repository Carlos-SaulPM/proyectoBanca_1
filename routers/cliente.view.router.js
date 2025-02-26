const express = require("express");
const router = express.Router();

const { clienteViewController } = require("../controllers");

router.get("/", clienteViewController.obtenerClientes)
router.post("/clientes/modificar", clienteViewController.modificarCliente);
router.get("/clientes/modificar/:id", clienteViewController.modificarClienteView);
router.get("/clientes/eliminar/:id", clienteViewController.eliminarCliente);


module.exports = router;